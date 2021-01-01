module I18n
  def self.t(key = nil, *, throw: false, raise: false, locale: nil, **options)
    # locale ||= config.locale
    # raise Disabled.new('t') if locale == false
    # enforce_available_locales!(locale)

    # backend = config.backend

    # result = catch(:exception) do
    #   if key.is_a?(Array)
    #     key.map { |k| backend.translate(locale, k, options) }
    #   else
    #     backend.translate(locale, key, options)
    #   end
    # end

    # if result.is_a?(MissingTranslation)
    #   handle_exception((throw && :throw || raise && :raise), result, locale, key, options)
    # else
    #   result
    # end
    {
      name: 'ToDo',
      type: '1D6',
      items: ['A', 'B', 'C', 'D', 'E'],
    }
  end

  def self.load_path
    return []
  end

  def self.default_locale=(locale)
  end

  def self.fallbacks()
    I18n::Locale::Fallbacks.new()
  end

  module Backend
    module Simple
    end
    module Fallbacks
    end
  end

  module Locale
    class Fallbacks < Hash
      def defaults=(a)
      end
    end
  end
end

class Dir
  def self.[]
    []
  end
end

module ObjectFreezeStub
  def freeze
    self
  end
end
Object.send(:prepend, ObjectFreezeStub)

module Opal
  def self.__dir__
    `__dirname`
  end
end

`Opal.top.$__dir__ = () => __dirname`

nil
