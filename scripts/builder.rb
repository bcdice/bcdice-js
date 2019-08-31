# frozen_string_literal: true

require 'opal'

# Lambdaにスコープを作るパッチ
module CallNodeLambdaFix
  def compile_block_pass
    return unless iter

    if meth == :lambda
      parent_scope = compiler.scope
      node = AST::Node.new(:lambda_scope, [iter], {})
      compiler.scope = Opal::Nodes::ScopeNode.new(node, @level, compiler)
      push ', ', expr(iter)
      compiler.scope = parent_scope
    else
      push ', ', expr(iter)
    end
  end
end
Opal::Nodes::CallNode.send(:prepend, CallNodeLambdaFix)

# 正規表現パターンを修正するパッチ
module RegExpNodeFix
  def fix_regexp(value)
    if value.is_a?(String)
      value.gsub(/[^\\]?".*?[^\\]"/) do |m|
        m.gsub(/\\\\A/, '^').gsub(/\\\\z/, '$')
      end.gsub(/\\A/, '^').gsub(/\\z/, '$')
    elsif value.is_a?(Array)
      value.map { |v| fix_regexp(v) }
    elsif value.is_a?(Opal::Fragment)
      fragment(fix_regexp(value.code))
    end
  end

  def compile_dynamic_regexp
    compiled_expr = fix_regexp(expr(value))
    if flags.any?
      push 'new RegExp(', compiled_expr, ", '#{flags.join}')"
    else
      push 'new RegExp(', compiled_expr, ')'
    end
  end

  def compile_static_regexp
    value = self.value.children[0]
    case value
    when ''
      push('/(?:)/')
    when /\\?<\\w+\\>/
      message = "named captures are not supported in javascript: #{value.inspect}"
      push "self.$raise(new SyntaxError('#{message}'))"
    else
      push "#{Regexp.new(fix_regexp(value)).inspect}#{flags.join}"
    end
  end
end
Opal::Nodes::RegexpNode.send(:prepend, RegExpNodeFix)

# カスタムBuilder
class Builder < Opal::Builder
  def initialize
    super

    @compiler_options = {
      # arity_check: true,
      freezing: false,
      dynamic_require_severity: :ignore
    }

    stubs << 'kconv'
    append_paths("./#{$patchedDir}")
  end

  def write(dst)
    FileUtils.mkdir_p(File.dirname(dst))
    File.write(dst, to_s)
  end
end
