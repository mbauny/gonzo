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
    @entries << (PostEntry.new( post, '%b %d' ) )
  end
end

class TagSection < PostSection
  def initialize title
    super title
  end

  def << post
    @entries << (PostEntry.new( post, '%b %d, %Y', '../posts') )
  end
end

class LatestSection < PostSection
  @@MAX_SIZE = 5
  @@TITLE = ':new: Latest posts'
  def initialize
    super @@TITLE
  end

  def full?
    @entries.length >= @@MAX_SIZE
  end

  def << post
    @entries << (PostEntry.new( post, '%b %d, %Y', './posts' ) )
  end
end
