#!/usr/bin/env ruby
$LOAD_PATH << './lib'

require 'gonzo/db'
require 'gonzo/writer'

dir = ARGV.empty? ? Dir.pwd : ARGV[0]
# TODO: use dir
dir = '/Users/mbauny/sources/gonzo/test/samples'

if File.directory? dir
  db = Db.new dir
  db.build

  writer = Writer.new db, dir
  writer.write
else
  puts "[GONZO] Error #{dir} is not a directory."
end
