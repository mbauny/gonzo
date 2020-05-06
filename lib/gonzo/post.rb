require 'date'

class Post
  TAGS = ["JavaScript", "TypeScript", "Qt", "C++", "Jest", "VSCode"]

  attr_reader :title
  attr_reader :date
  attr_reader :year
  attr_reader :file_path
  attr_reader :tags

  def initialize(file_path)
    @file_path = file_path
    @title = 'my title'
    @date = DateTime.now
    @year = @date.year
    @tags = [TAGS.sample, TAGS.sample]
  end
end
