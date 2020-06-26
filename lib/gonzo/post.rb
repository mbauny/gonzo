require 'date'

class Post
  attr_reader :title
  attr_reader :title_anchor
  attr_reader :date
  attr_reader :tags
  attr_reader :file_name
  attr_reader :file_path

  def initialize file_path
    @date = Date.today
    @tags = []
    @file_path = file_path
    @file_name = File.basename file_path

    content = File.read file_path
    content.match(/^# (.*)\n/) {|match| @title = match[1] }
    content.match(/\[\/\/\]: # \(date (.*)\)/)  { |match| @date = Date.parse match[1] }
    content.match(/\[\/\/\]: # \(tags (.*)\)/)  { |match| @tags = match[1].split(',').map(&:strip) }

    anchor = @title.downcase
    anchor.gsub! ' ', '-'
    anchor.gsub! /[\'\(\):]/, ''
    @title_anchor = anchor
  end

  def year
    @date.year
  end
end
