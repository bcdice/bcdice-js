# frozen_string_literal: true

require 'strscan'

# Stub
class Dir
  class << self
    def []
      []
    end
  end
end

# Opal Fix
module StringScannerPatch
  # rubocop:disable Lint/UnusedMethodArgument
  def scan_until(pattern)
    # rubocop:enable Lint/UnusedMethodArgument

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

        pos = pos + result[0].length - 1;
        self.matched  = self.string.substr(self.pos, pos - self.pos);
        self.prev_pos = self.pos;
        self.pos      = pos;
        self.working  = working.substr(result[0].length - 1);

        return self.matched;
      }
    }
  end
end
StringScanner.prepend StringScannerPatch

`Opal.top.$__dir__ = () => '/'`

nil
