require 'gonzo/db'
require 'gonzo/index'

class Writer
  def initialize db, out_dir
    @db = db
    @out_dir = out_dir
  end

  def writeIndexFile dir, text
    full_dir = File.join @out_dir, dir
    Dir.mkdir full_dir if !File.exists? full_dir
    file = File.join full_dir, 'README.md'
    File.write file, text
  end

  def write
    writeIndexFile('posts', @db.postsIndex.to_s)
    writeIndexFile('tags', @db.tagsIndex.to_s)
  end
end
