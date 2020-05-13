class PostEntry
  attr_reader :post
  attr_reader :url

  def initialize post
    @post = post
    @fmt = '%b %d, %Y'
    @url = ''
  end

  def to_s
    if @url.empty?
      "- [#{post.date.strftime @fmt}] #{post.title}"
    else
      "- [#{post.date.strftime @fmt}] [#{post.title}](#{@url})"
    end
  end
end

class MainPagePostEntry < PostEntry
  def initialize post
    super post
    @fmt = '%b %d, %Y'
    @url = './posts/' + @post.file_name
  end
end

class PostsPagePostEntry < PostEntry
  def initialize post
    super post
    @fmt = '%b %d'
    @url = './' + @post.file_name
  end
end

class TagsPagePostEntry < PostEntry
  def initialize post
    super post
    @fmt = '%b %d, %Y'
    @url = '../posts/' + @post.file_name
  end
end
