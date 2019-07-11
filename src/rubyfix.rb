module ObjectFreezeStub
  def freeze
    self
  end
end
Object.send(:prepend, ObjectFreezeStub)

class FileTest
  def self.directory?
    true
  end
end

module FileStub
  def self.read()
    ''
  end
end
File.send(:prepend, FileStub)

class Kconv
  UTF8 = 6
end
