class Kconv
  UTF8 = 6
end

class Object
  def freeze
    self
  end
end

class FileTest
  def self.directory?
    true
  end
end

class File
  def self.read()
    ''
  end
end
