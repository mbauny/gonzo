#!/usr/bin/env ruby
$LOAD_PATH << './lib'
require 'gonzo/db'
require 'gonzo/index'
require 'gonzo/html'

class Gonzo
  def run dir
    db = Db.new dir
    html_factory = Html.new './assets/template.html', './assets/style.css'
    html_factory.write db
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
