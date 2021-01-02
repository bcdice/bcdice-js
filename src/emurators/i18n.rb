module I18n
  class << self
    @@load_path = []
    def load_path
      @@load_path
    end

    @@default_locale
    def default_locale=(locale)
      @@default_locale = locale
    end

    def fallbacks
      I18n::Locale::Fallbacks.new
    end

    def load_translations
      return if (@@table != nil)
      %x{
        var get = require('lodash/get');
        var toPairs = require('lodash/toPairs');
        var flatten = require('lodash/flatten');
        function toHash(object) {
          var pairs = toPairs(object).map(([key, value]) => {
            if (typeof value === 'object') {
              return [key, toHash(value)];
            }
            return [key, value];
          });
          return Opal.hash.apply(Opal, flatten(pairs));
        }
        var i18n = require('./i18n.json');
      }

      @@table = `toHash(i18n)`
    end

    def translate(key, locale)
      load_translations

      path = key.split('.').map(&:to_sym)
      table = @@table
      default_locale = @@default_locale

      return table.dig(locale, *path) || table.dig(default_locale, *path) || Hash.new
    end
    alias :t :translate
  end

  module Locale
    class Fallbacks < Hash
      def defaults=(value)
      end
    end
  end

  module Backend
    module Simple
    end
  end
end
