require 'gonzo/section'
require 'gonzo/post_entry'

class PostSection < Section
  attr_reader :entries

  def initialize title
    @title = title
    @entries = []
  end

  def empty?
    @entries.empty?
  end

  def to_s
    lines = ["## #{@title}\n"]
    lines << @entries.map { |entry| entry.to_s }
    lines.join "\n"
  end
end

class YearSection < PostSection
  def initialize title
    super title
  end

  def << post
    @entries << (PostsPagePostEntry.new post)
  end
end

class TagSection < PostSection
  def initialize title
    super title
  end

  def << post
    @entries << (TagsPagePostEntry.new post)
  end
end

class LatestSection < PostSection
  @@MAX_SIZE = 5
  @@TITLE = 'Latest posts'
  def initialize
    super @@TITLE
  end

  def full?
    @entries.length >= @@MAX_SIZE
  end

  def << post
    @entries << (MainPagePostEntry.new post)
  end
end
