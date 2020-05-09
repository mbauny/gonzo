require 'gonzo/index'

class Db
  attr_reader :posts

  def initialize src_dir
    @src_dir = src_dir
    @posts = []
    @posts_per_year = {}
    @posts_per_tag = {}
  end

  def tags
    @posts_per_tag.keys.sort
  end

  def years
    @posts_per_year.keys.sort
  end

  def postsPerTag tag
    @posts_per_tag[tag].sort_by(&:date)
  end

  def postsPerYear year
    @posts_per_year[year].sort_by(&:date)
  end

  def append(hash, key, value)
    if !hash.key? key
      hash[key] = [value]
    else
      hash[key] << value
    end
  end
  
  def build
    # Looking for post files...
    Dir.glob("#{@src_dir}/posts/*.md").each do |file_path|
      next if file_path.end_with? 'README.md'

      post = Post.new file_path
      @posts << post

      append @posts_per_year, post.year, post

      post.tags.each do |tag|
        append @posts_per_tag, tag, post
      end
    end

    @posts.sort_by(&:date)
  end

  private :append
end
