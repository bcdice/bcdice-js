# frozen_string_literal: true

# デバッグログを保持するモジュール
module Logger
  attr_reader :logs

  def self.initialize
    clear
  end

  def self.clear
    @logs = []
  end

  def self.add_log(*args)
    @logs <<= args if $isDebug
  end

  def self.setDebug(b)
    $isDebug = b
  end
end

def debug(*args)
  Logger.add_log(args)
end
