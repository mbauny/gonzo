class Section
  attr_reader :title
  
  def initialize title, fmt = :short
    @title = title
    @fmt = fmt
    @posts = []
  end

  def << post
    @posts << post
  end

  def to_s
    lines = ["## #{@title}\n"]
    lines << @posts.map { |post| entry post }
    lines.join "\n"
  end

  def url post
    ''
  end

  def entry post
    fmt_str =  ''
    case @fmt
    when :long
      fmt_str = "%b %d, %Y"
    else
      # :short
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

class YearSection < Section
  def initialize title
    super title, :short
  end

  def url post
    post.file_name
  end
end

class TagSection < Section
  def initialize title
    super title, :long
  end

  def url post
    '../posts/' + post.file_name
  end
end
