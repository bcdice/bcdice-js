require 'strscan'

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

module StringScannerPatch
  def scan_until(pattern)
    %x{
      var self = this;


      pattern = self.$anchor(pattern);

      var pos     = self.pos,
          working = self.working,
          result;

      while (true) {
        var   isEmpty = working.length === 0;
        result   = pattern.exec(working);
        pos     += 1;
        working  = working.substr(1);

        if (result == null) {
          if (isEmpty) {
            return self.matched = nil;
          }

          continue;
        }

        self.matched  = self.string.substr(self.pos, pos - self.pos - 1 + result[0].length);
        self.prev_pos = pos - 1;
        self.pos      = pos;
        self.working  = working.substr(result[0].length - 1);

        return self.matched;
      }
    }
  end
end
StringScanner.send(:prepend, StringScannerPatch)

`Opal.top.$__dir__ = () => __dirname`

nil
