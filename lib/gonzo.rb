#!/usr/bin/env ruby
$LOAD_PATH << './lib'

require 'gonzo/db'
require 'gonzo/index'

class Gonzo
  def run dir
    db = Db.new dir
    writeIndexFile((File.join dir, 'posts'), db.postsIndex.to_s)
    writeIndexFile((File.join dir, 'tags'), db.tagsIndex.to_s)
  end

  def writeIndexFile dir, text
    Dir.mkdir dir if !File.exists? dir
    file = File.join dir, 'README.md'
    File.write file, text
  end
end

dir = ARGV.empty? ? Dir.pwd : ARGV[0]
# TODO: use dir
dir = '/Users/mbauny/sources/gonzo/test/samples'

if File.directory? dir
  app = Gonzo.new
  app.run dir
else
  puts "[GONZO] Error #{dir} is not a directory."
end
