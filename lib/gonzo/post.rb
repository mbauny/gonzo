require 'date'
require 'yaml'

class Post
  attr_reader :title
  attr_reader :title_anchor
  attr_reader :date
  attr_reader :tags
  attr_reader :file_name
  attr_reader :file_path

  def initialize file_path
    yaml = YAML.load_file file_path
    @title = yaml['title']
    @title_anchor = @title.downcase.gsub! ' ', '-'
    @date = yaml['date']
    @tags = yaml['tags']
    @file_path = file_path
    @file_name = (File.basename file_path).sub '.md', '.html'
  end

  def year
    @date.year
  end
end
