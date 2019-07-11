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
    .map { |file| file.match(/([^\/]+)\.rb$/) }
    .select { |m| m }
    .map { |m| m[1] }
    .select { |gameType| !gameType.match(/^(_.*|DiceBotLoader(List)?|test)$/) }
end

task default: :build

task :copy do
  FileUtils.mkdir_p($patchedDir)
  sh "cp -r #{$bcdiceDir}/* #{$patchedDir}"
end

task patch: [:copy] do
  Dir.glob("#{$patchesDir}/*.diff") { |file|
    sh "patch -p1 < ../#{file}", { chdir: $patchedDir }, {}
  }
end

task build: [
  :extract_games,
  :build_opal,
  :build_core,
  :build_dicebot,
] do
end

task extract_games: [:patch] do
  require("./#{$bcdiceDir}/diceBot/DiceBot")

  games = getGameTypes.map { |gameType|
    puts "extracting diceBot/#{gameType}"

    require("./#{$bcdiceDir}/diceBot/#{gameType}.rb")
    diceBot = Object.const_get(gameType).new

    {
      gameType: gameType,
      gameName: diceBot.gameName,
      prefixes: diceBot.prefixes.flatten,
      help: diceBot.getHelpMessage,
    }
  }

  json = JSON.pretty_generate({
    games: games
  })

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

  builder.write("#{$outputDir}/cgiDiceBot.js")
end

task build_dicebot: [:patch] do
  getGameTypes.each { |gameType|
    puts "building diceBot/#{gameType}"
    builder = Builder.new
    builder.build("./#{$patchedDir}/diceBot/#{gameType}.rb")
    builder.write("#{$outputDir}/diceBot/#{gameType}.js")
  }
end
