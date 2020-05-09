require 'date'
require 'yaml'

class Post
  attr_reader :title
  attr_reader :date
  attr_reader :tags
  attr_reader :file_name

  def initialize file_path
    yaml = YAML.load_file file_path
    @title = yaml['title']
    @date = yaml['date']
    @tags = yaml['tags']
    @file_name = File.basename file_path
  end

  def year
    @date.year
  end
end
