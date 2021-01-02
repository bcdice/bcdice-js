
class Dir
  class << self
    def []
      []
    end
  end
end

module ObjectFreezeStub
  def freeze
    self
  end
end
Object.send(:prepend, ObjectFreezeStub)

`Opal.top.$__dir__ = () => __dirname`

nil
