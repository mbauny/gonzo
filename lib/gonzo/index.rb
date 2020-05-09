require 'date'
require 'yaml'

class Post
  attr_reader :title
  attr_reader :date
  attr_reader :year
  # attr_reader :file_path
  attr_reader :tags

  def initialize file_path
    # @file_path = file_path
    yaml = YAML.load_file file_path
    @title = yaml['title']
    @date = yaml['date']
    @year = @date.year
    @tags = yaml['tags']
  end

  def to_s fmt = :short
    fmt_str =  ''
    case fmt
    when :long
      fmt_str = "%b %d, %Y"
    else
      # :short
      fmt_str = "%b %d"
    end
    "- [#{@date.strftime fmt_str}] #{@title}"
  end
end

class Section
  def initialize title
    @title = title
    @posts = []
  end

  def << post
    @posts << post
  end

  def to_s fmt = :short
    lines = ["## #{@title}\n"]
    lines << @posts.map { |post| post.to_s fmt }
    lines.join "\n"
  end
end

class Index
  def initialize title
    @title = title
    @sections = []
  end

  def << section
    @sections << section
  end

  def to_s fmt = :short
    lines = ["# #{@title}\n"]
    lines << @sections.map { |section|  "#{section.to_s fmt}\n" }
    lines.join "\n"
  end
end
