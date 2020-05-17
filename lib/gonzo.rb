#!/usr/bin/env ruby
$LOAD_PATH << './lib'
require 'gonzo/db'
require 'gonzo/index'
require 'gonzo/markdown'

class Gonzo
  def run dir
    db = Db.new dir
    markdown_factory = Markdown.new
    markdown_factory.write db
  end
end

dir = ARGV.empty? ? Dir.pwd : ARGV[0]

if File.directory? dir
  app = Gonzo.new
  app.run dir
else
  puts "[GONZO] Error #{dir} is not a directory."
end
