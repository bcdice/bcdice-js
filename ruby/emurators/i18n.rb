# frozen_string_literal: true

# Simple emulator
module I18n
  class << self
    @@load_path = []
    @@table = nil
    def load_path
      @@load_path
    end

    def default_locale=(locale)
      @@default_locale = locale
    end

    def fallbacks
      I18n::Locale::Fallbacks.new
    end

    def load_translations
      return unless @@table.nil?

      %x{
        var get = require('lodash/get');
        var toPairs = require('lodash/toPairs');
        var flatten = require('lodash/flatten');

        function toOpal(value) {
          if (Array.isArray(value)) return value.map(toOpal);
          if (typeof value == 'object') {
            var pairs = toPairs(value).map(([key, v]) => [key, toOpal(v)]);
            return Opal.hash.apply(Opal, flatten(pairs));
          }
          return value;
        }

        var i18n = require('./i18n.json');
      }

      @@table = `toOpal(i18n)`
    end

    def translate(key, locale: nil, **options)
      load_translations

      path = key.split('.').map(&:to_sym)
      table = @@table
      default_locale = @@default_locale

      result = table.dig(locale, *path) || table.dig(default_locale, *path)
      begin
        result = format(result, **options) if result.is_a?(String)
      rescue ArgumentError, KeyError
        # Ignore
      end

      result || options[:default]
    end
    alias t translate
  end

  module Locale
    # Stub
    class Fallbacks < Hash
      def defaults=(value); end
    end
  end

  module Backend
    # Stub
    module Simple
    end
  end

  # Stub
  module Thread
    class << self
      def current
        {
          i18n_fallbacks: nil
        }
      end
    end
  end
end
