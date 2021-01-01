require 'opal'

def createBuilder()
  builder = Opal::Builder.new

  builder.compiler_options = {
    method_missing: false,
  }
  builder.stubs = {
    'i18n' => {},
    'i18n/backend/fallbacks' => {},
  }

  builder.append_paths('BCDice/lib')

  builder
end

def decleation(source)
  File.write "lib/#{source}.d.ts", 'export default undefined;'
end

def compile(source)
  puts source
  builder = createBuilder()

  builder.build_require source;

  opal_path = Pathname.new('bcdice/opal').relative_path_from(File.dirname(source))

  File.write "lib/#{source}.js", "require('./#{opal_path}');\n\n#{builder.to_s}"
  File.write "lib/#{source}.js.map", builder.source_map
  decleation(source)
end

directory 'lib/bcdice'
task :compile_core => 'lib/bcdice' do
  builder = createBuilder()

  builder.build('opal')
  builder.build('opal-parser')
  builder.build('./src/RubyFix.rb')

  # builder.build_require('bcdice/common_command')
  # builder.build_require('bcdice/base')
  # builder.build_require('bcdice/preprocessor')
  # builder.build_require('bcdice/randomizer')
  # builder.build_require('bcdice/version')

  File.write 'lib/bcdice/opal.js', "require('source-map-support/register');\nObject.defineProperty(String.prototype, '$freeze', { value() { return this; } });\n#{builder.to_s}"
  File.write 'lib/bcdice/opal.js.map', builder.source_map
  decleation('bcdice/opal')

  [
    'bcdice/base',
    'bcdice/common_command',
    'bcdice/preprocessor',
    'bcdice/randomizer',
    'bcdice/version',
  ].each {|source| compile(source) }
end

directory 'lib/bcdice/game_system'
task :compile_game_system => 'lib/bcdice/game_system' do
  index_js = "require('../opal');\nrequire('../base'); Opal.require('bcdice/base');\n"

  File.read('BCDice/lib/bcdice/game_system.rb').scan(/require "([^"]+)"/).each do |m|
    source = m[0]
    compile(source)
    index_js += "require('../../#{source}'); Opal.require('#{source}');\n"
  end

  File.write 'lib/bcdice/game_system/index.js', index_js
  decleation('bcdice/game_system/index')
end

task :compile => [:compile_core, :compile_game_system]
