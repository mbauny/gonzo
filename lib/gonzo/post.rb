require 'date'
require 'yaml'

class Post
  attr_reader :title
  attr_reader :date
  attr_reader :tags

  def initialize file_path
    yaml = YAML.load_file file_path
    @title = yaml['title']
    @date = yaml['date']
    @tags = yaml['tags']
  end

  def year
    @date.year
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
