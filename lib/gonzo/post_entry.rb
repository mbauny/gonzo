class PostEntry
  attr_reader :post
  attr_reader :url

  def initialize post, fmt, base_url = '.'
    @post = post
    @fmt = fmt
    @url = (File.join base_url, post.file_name)
  end

  def to_s
    "- [#{post.date.strftime @fmt}] [#{post.title}](#{@url})"
  end
end
