require 'gonzo/section'

class PostSection < Section
  attr_reader :posts
  
  def initialize title, fmt = :short
    @title = title
    @fmt = fmt
    @posts = []
  end

  def << post
    @posts << post
  end

  def empty?
    @posts.empty?
  end

  def url post
    ''
  end

  def to_s
    lines = ["## #{@title}\n"]
    lines << @posts.map { |post| entry post }
    lines.join "\n"
  end

  def entry post
    fmt_str =  ''
    case @fmt
    when :long
      fmt_str = "%b %d, %Y"
    else
      fmt_str = "%b %d"
    end

    url = url post
    if url.empty?
      "- [#{post.date.strftime fmt_str}] #{post.title}"
    else
      "- [#{post.date.strftime fmt_str}] [#{post.title}](#{url})"
    end
  end
end

class YearSection < PostSection
  def initialize title
    super title, :short
  end

  def url post
    post.file_name
  end
end

class TagSection < PostSection
  def initialize title
    super title, :long
  end

  def url post
    '../posts/' + post.file_name
  end
end

class LatestSection < PostSection
  @@MAX_SIZE = 5
  @@TITLE = 'Latest posts'
  def initialize
    super @@TITLE
  end

  def full?
    @posts.length >= @@MAX_SIZE
  end

  def url post
    './posts/' + post.file_name
  end
end
