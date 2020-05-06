#!/usr/bin/env ruby
$LOAD_PATH << './lib'

require 'gonzo/cli'

puts "Gonzo says 'hi'"

cli = Cli.new
cli.run

# init
# cannot init if non empty
# cannot init if gonzo.rc is present
# gonzo.rc contains name, author, url?
