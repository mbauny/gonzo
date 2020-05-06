require 'gonzo/db'
require 'gonzo/writer'

class Cli
  def run
    db = Db.new Dir.pwd
    db.build
    
    # TODO: Fix this line
    writer = Writer.new db, '/Users/mbauny/sources/gonzo/tests'
    writer.write
  end
end
