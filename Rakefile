# frozen_string_literal: true

require 'opal'
require 'json'
require 'yaml'
require 'tomlrb'

task default: :build
task build: %i[
  racc
  build_opal
  build_core
  build_game_system
  build_i18n
  build_i18n_json
  build_i18n_list
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
    'patched/lib',
    'ruby/emurators',
    *$LOAD_PATH
  )

  builder
end

def decleation(source)
  File.write "lib/#{source}.d.ts", 'export default undefined;'
end

def build(source, prerequired: [])
  puts source
  builder = create_builder
  builder.prerequired = prerequired if prerequired

  builder.build source

  opal_path = Pathname.new('bcdice/opal').relative_path_from(File.dirname(source))

  File.write "lib/#{source}.js", "require('./#{opal_path}');\n\n#{builder}"
  File.write "lib/#{source}.js.map", builder.source_map
  decleation(source)
end

directory 'patched'
task copy: 'patched' do
  cp_r Dir.glob('BCDice/*'), 'patched/'
end

task patch: [:copy] do
  sh 'patch -p1 < ../patch.diff', { chdir: 'patched' }, {}
  $LOAD_PATH.prepend "#{__dir__}/patched/lib"
end

task racc: [:copy] do
  sh 'bundle exec rake racc', { chdir: 'patched' }, {}
end

directory 'lib/bcdice'
task build_opal: [:patch, 'lib/bcdice'] do
  puts 'bcdice/opal'
  builder = create_builder
  builder.build('opal')
  builder.build('opal-parser')
  builder.build('native')
  builder.build('./ruby/patch.rb')
  File.write 'lib/bcdice/opal.js',
             builder.to_s
  File.write 'lib/bcdice/opal.js.map', builder.source_map
  decleation('bcdice/opal')
end

directory 'lib/bcdice'
task build_core: [:patch, 'lib/bcdice'] do
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

  File.read('patched/lib/bcdice/game_system.rb').scan(/require "([^"]+)"/).each do |m|
    source = m[0]
    build(source, prerequired: ['i18n'])
    index_js += "require('../../#{source}');\n"
  end

  puts 'bcdice/game_system'
  File.write 'lib/bcdice/game_system/index.js', index_js
  decleation('bcdice/game_system/index')
end

directory 'lib/bcdice/i18n'
task build_i18n: 'lib/bcdice/i18n' do
  i18n = {}
  Dir['patched/i18n/*.yml'].each do |path|
    i18n = i18n.merge(YAML.load_file(path)) do |_key, oldval, newval|
      oldval.merge(newval)
    end
  end

  File.write 'lib/bcdice/i18n/i18n.yml', YAML.dump(i18n)
  File.write 'lib/bcdice/i18n/i18n.json', JSON.dump(i18n)
end

directory 'lib/bcdice/i18n'
task build_i18n_json: 'lib/bcdice/i18n' do
  path_from = Pathname('patched/i18n')
  Dir['patched/i18n/**/*.yml'].each do |path|
    relative_path = Pathname(path).relative_path_from(path_from).to_s
    next unless 1 < relative_path.split('/').length

    i18n = YAML.load_file(path)
    file_name = File.basename(relative_path.gsub('/', '.'), '.*')
    locale = File.basename(relative_path, '.*')
    File.write "lib/bcdice/i18n/#{file_name}.json", JSON.dump(i18n)
    puts "bcdice/i18n/#{file_name}.json"
  end
end

directory 'lib/bcdice'
task build_i18n_list: 'lib/bcdice' do
  ids = []
  Dir['patched/i18n/**/'].each do |game_path|
    locales = []
    Dir["#{game_path}*.yml"].each do |path|
      locales.push(File.basename(path, '.*'))
    end
    name = File.split(game_path.gsub('patched/i18n', '')).last
    next unless 1 < name.length
    ids.push({ baseClassName: name, locales: locales })
  end
  File.write 'lib/bcdice/i18n_list.json', JSON.dump({ i18nList: ids })

  puts 'bcdice/i18n_list.json.d.ts'
  FileUtils.copy 'ts/bcdice/i18n_list.json.d.ts', 'lib/bcdice/i18n_list.json.d.ts'
end

directory 'lib/bcdice'
task build_test: 'lib/bcdice' do
  puts 'bcdice/test_data.json'
  tests = {}
  Dir['patched/test/**/*.toml'].each do |path|
    id = File.basename(path, '.toml')
    tests[id] = Tomlrb.load_file(path)
  end
  File.write 'lib/bcdice/test_data.json', JSON.dump(tests)
end

directory 'lib/bcdice'
task build_game_system_list: [:patch, 'lib/bcdice'] do
  puts 'bcdice/game_system_list.json'

  require 'bcdice'
  require 'bcdice/game_system'

  game_systems = BCDice.all_game_systems.map do |game_system_class|
    {
      id: game_system_class::ID,
      name: game_system_class::NAME,
      className: game_system_class.name.gsub(/^.*::/, ''),
      sortKey: game_system_class::SORT_KEY,
      locale: game_system_class.new('none').instance_variable_get('@locale')
    }
  end

  File.write 'lib/bcdice/game_system_list.json', JSON.dump({ gameSystems: game_systems })

  puts 'bcdice/game_system_list.json.d.ts'
  FileUtils.copy 'ts/bcdice/game_system_list.json.d.ts', 'lib/bcdice/game_system_list.json.d.ts'
end
