# frozen_string_literal: true

require 'rake'
require 'json'

require './scripts/builder.rb'

$srcDir = 'src'
$bcdiceDir = 'BCDice/src'
$patchesDir = 'patches'
$patchedDir = 'patched'
$outputDir = 'lib'

$LOAD_PATH.unshift("./#{$bcdiceDir}")

def getGameTypes
  Dir
    .glob("#{$patchedDir}/diceBot/*.rb")
    .map { |file| file.match(%r{([^/]+)\.rb$}) }
    .select { |m| m }
    .map { |m| m[1] }
    .reject { |gameType| gameType.match(/^(_.*|DiceBotLoader(List)?|test)$/) }
end

task default: :build

task :copy do
  FileUtils.mkdir_p($patchedDir)
  sh "cp -r #{$bcdiceDir}/* #{$patchedDir}"
end

task patch: [:copy] do
  sh 'patch -p2 < ../patch.diff', { chdir: $patchedDir }, {}
end

task build: %i[
  extract_info_list
  build_opal
  build_core
  build_dicebot
] do
end

task extract_info_list: [:patch] do
  require("./#{$bcdiceDir}/diceBot/DiceBot")

  print 'extracting DiceBot '
  infoList = getGameTypes.map do |gameType|
    require("./#{$bcdiceDir}/diceBot/#{gameType}.rb")
    diceBot = Object.const_get(gameType).new

    print '.'

    {
      gameType: gameType,
      gameName: diceBot.gameName,
      prefixes: diceBot.prefixes.flatten,
      info: diceBot.getHelpMessage
    }
  end
  print "\n"

  json = JSON.pretty_generate(
    infoList: infoList
  )

  FileUtils.mkdir_p($outputDir)
  File.write("#{$outputDir}/diceBot.json", json)
end

task :build_opal do
  puts 'building opal'

  builder = Builder.new

  builder.build('opal')
  builder.build("./#{$srcDir}/rubyfix.rb")

  builder.write("#{$outputDir}/opal.js")
end

task build_core: [:patch] do
  puts 'building cgiDiceBot'

  builder = Builder.new

  builder.build("./#{$patchedDir}/cgiDiceBot.rb")
  builder.build("./#{$srcDir}/DiceBotLoader.rb")
  builder.build("./#{$srcDir}/Logger.rb")

  builder.write("#{$outputDir}/cgiDiceBot.js")
end

task build_dicebot: [:patch] do
  print 'building DiceBot '
  getGameTypes.each do |gameType|
    builder = Builder.new
    builder.build("./#{$patchedDir}/diceBot/#{gameType}.rb")
    builder.write("#{$outputDir}/diceBot/#{gameType}.js")
    print '.'
  end
  print "\n"
end

# RuboCop
require 'rubocop/rake_task'
RuboCop::RakeTask.new
task default: :rubocop
