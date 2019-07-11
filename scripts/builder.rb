require 'opal'

module CallNodeLambdaFix
  def compile_block_pass
    if iter
      if meth == :lambda
        parent_scope = compiler.scope
        compiler.scope = Opal::Nodes::ScopeNode.new(AST::Node.new(:lambda_scope, [iter], {}), @level, compiler)
        push ', ', expr(iter)
        compiler.scope = parent_scope
      else
        push ', ', expr(iter)
      end
    end
  end
end

Opal::Nodes::CallNode.send(:prepend, CallNodeLambdaFix)

class Builder < Opal::Builder
  def initialize
    super

    @compiler_options = {
      # arity_check: true,
      freezing: false,
      dynamic_require_severity: :ignore,
    }

    stubs << 'kconv'
    append_paths("./#{$patchedDir}")
  end

  def write(dst)
    FileUtils.mkdir_p(File.dirname(dst))
    File.write(dst, self.to_s)
  end
end
