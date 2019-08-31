# frozen_string_literal: true

# Object#freezeのスタブ
module ObjectFreezeStub
  def freeze
    self
  end
end
Object.send(:prepend, ObjectFreezeStub)

# FileTestクラスのスタブ
class FileTest
  def self.directory?
    true
  end
end

# Fileモジュールのスタブ
module FileStub
  def self.read
    ''
  end
end
File.send(:prepend, FileStub)

class Kconv
  UTF8 = 6
end
