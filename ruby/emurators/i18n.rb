# frozen_string_literal: true

require 'json'

# Simple emulator
module I18n
  class << self
    @@load_path = []
    @@table = nil
    def load_path
      @@load_path
    end

    def default_locale
      @@default_locale
    end

    def default_locale=(locale)
      @@default_locale = locale
    end

    def fallbacks
      I18n::Locale::Fallbacks.new
    end

    def load_default_translation
      return unless @@table.nil?

      @@table = {}
      load_translation(`JSON.stringify(require('./i18n/i18n.json'))`)
    end

    def load_translation(json)
      load_default_translation

      table = JSON.parse(json, symbolize_names: true)
      @@table = @@table.merge(table) do |_key, oldval, newval|
        oldval.merge(newval)
      end
    end

    # only used to i18n dynamic import test
    def clear_translate_table
      @@table = nil
    end

    def translate(key, locale: nil, **options)
      load_default_translation

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
