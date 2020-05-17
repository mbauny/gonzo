require 'gonzo/db'

class Markdown
  def write db
    root_dir = db.src_dir
    posts_dir = File.join root_dir, 'posts'
    tags_dir = File.join root_dir, 'tags'

    write_index root_dir, db.mainIndex
    write_index posts_dir, db.postsIndex
    write_index tags_dir, db.tagsIndex
  end

  private
  def write_index dir, index
    Dir.mkdir dir if !File.exists? dir
    path = File.join dir, 'README.md'
    File.write path, index.to_s
  end
end
