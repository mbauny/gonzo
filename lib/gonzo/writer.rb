require 'gonzo/db'

class Writer
  def initialize db, out_dir
    @db = db
    @out_dir = out_dir
  end

  def writeIndexFile dir, lines
    full_dir = File.join @out_dir, dir
    Dir.mkdir full_dir if !File.exists? full_dir
    file = File.join full_dir, 'README.md'
    File.write file, (lines.join "\n")
  end

  def write
    # Global post index.
    posts_page = ["# Posts"]
    @db.years.each do |year|
      posts_page << "\n## #{year}\n"
      
      posts = @db.postsPerYear year
      posts.each do |post|
        posts_page << "- [#{post.date.strftime "%b %e"}]"
      end
    end
    
    writeIndexFile 'posts', posts_page
    
    # Global tag index.
    tags_page = ["# Tags"]
    @db.tags.each do |tag|
      tags_page << "\n## #{tag}\n"

      # Single tag index.
      tag_page = ["# #{tag}\n"]

      posts = (@db.postsPerTag tag).map { |post| "- [#{post.date.strftime "%b %e, %Y"}]" }
      tags_page << posts
      tag_page << posts

      writeIndexFile (File.join 'tags', tag), tag_page
    end
    
    writeIndexFile 'tags', tags_page
  end
end
