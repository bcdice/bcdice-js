# frozen_string_literal: true

require 'opal'
require 'json'
require 'yaml'
require 'tomlrb'

# Generates Scope Over Lambda
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
Opal::Nodes::CallNode.prepend CallNodeLambdaFix

task default: :build
task build: %i[
  build_opal
  build_core
  build_game_system
  build_i18n
  build_test
  build_game_system_list
]

def create_builder
  builder = Opal::Builder.new

  builder.compiler_options = {
    method_missing: false
  }
  builder.stubs = {
    # 'i18n' => {},
  }

  builder.append_paths(
    'BCDice/lib',
    'ruby/emurators',
    *$LOAD_PATH
  )

  builder
end

def decleation(source)
  File.write "lib/#{source}.d.ts", 'export default undefined;'
end

def build(source)
  puts source
  builder = create_builder

  builder.build source

  opal_path = Pathname.new('bcdice/opal').relative_path_from(File.dirname(source))

  File.write "lib/#{source}.js", "require('./#{opal_path}');\n\n#{builder}"
  File.write "lib/#{source}.js.map", builder.source_map
  decleation(source)
end

directory 'lib/bcdice'
task build_opal: 'lib/bcdice' do
  puts 'bcdice/opal'
  builder = create_builder
  builder.build('opal')
  builder.build('opal-parser')
  builder.build('native')
  builder.build('./ruby/patch.rb')
  File.write 'lib/bcdice/opal.js',
             "Object.defineProperty(String.prototype, '$freeze', { value() { return this; } });\n#{builder}"
  File.write 'lib/bcdice/opal.js.map', builder.source_map
  decleation('bcdice/opal')
end

directory 'lib/bcdice'
task build_core: 'lib/bcdice' do
  [
    'bcdice/arithmetic_evaluator',
    'bcdice/base',
    'bcdice/common_command',
    'bcdice/preprocessor',
    'bcdice/randomizer',
    'bcdice/user_defined_dice_table',
    'bcdice/version'
  ].each { |source| build(source) }
end

directory 'lib/bcdice/game_system'
task build_game_system: 'lib/bcdice/game_system' do
  index_js = "require('../opal');\nrequire('../base');\n"

  File.read('BCDice/lib/bcdice/game_system.rb').scan(/require "([^"]+)"/).each do |m|
    source = m[0]
    build(source)
    index_js += "require('../../#{source}');\n"
  end

  puts 'bcdice/game_system'
  File.write 'lib/bcdice/game_system/index.js', index_js
  decleation('bcdice/game_system/index')
end

directory 'lib/bcdice'
task build_i18n: 'lib/bcdice' do
  i18n = {}
  Dir['BCDice/i18n/**/*.yml'].each do |path|
    i18n = i18n.merge(YAML.load_file(path)) do |_key, oldval, newval|
      oldval.merge(newval)
    end
  end

  File.write 'lib/bcdice/i18n.yml', YAML.dump(i18n)
  File.write 'lib/bcdice/i18n.json', JSON.dump(i18n)
end

directory 'lib/bcdice'
task build_test: 'lib/bcdice' do
  puts 'bcdice/test_data.json'
  tests = {}
  Dir['BCDice/test/**/*.toml'].each do |path|
    id = File.basename(path, '.toml')
    tests[id] = Tomlrb.load_file(path)
  end
  File.write 'lib/bcdice/test_data.json', JSON.dump(tests)
end

directory 'lib/bcdice'
task build_game_system_list: 'lib/bcdice' do
  puts 'bcdice/game_system_list.json'

  require './BCDice/lib/bcdice'
  require './BCDice/lib/bcdice/game_system'

  game_systems = BCDice.all_game_systems.map do |game_system_class|
    {
      id: game_system_class::ID,
      name: game_system_class::NAME,
      className: game_system_class.name.gsub(/^.*::/, ''),
      sortKey: game_system_class::SORT_KEY
    }
  end

  File.write 'lib/bcdice/game_system_list.json', JSON.dump({ gameSystems: game_systems })

  puts 'bcdice/game_system_list.json.d.ts'
  FileUtils.copy 'ts/bcdice/game_system_list.json.d.ts', 'lib/bcdice/game_system_list.json.d.ts'
end
