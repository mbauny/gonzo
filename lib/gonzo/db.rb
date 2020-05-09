require 'gonzo/index'
require 'gonzo/post'
require 'gonzo/section'

class Db
  attr_reader :postsIndex
  attr_reader :tagsIndex

  def initialize src_dir
    @src_dir = src_dir
    
    yearSections = Hash.new { |h, year| h[year] = Section.new year }
    tagsSections = Hash.new { |h, tag| h[tag] = Section.new(tag, :long) }
    
    # Looking for post files...
    # TODO: Clean this loop
    Dir.glob("#{@src_dir}/posts/*.md").each do |file_path|
      next if file_path.end_with? 'README.md'
      
      post = Post.new file_path
      yearSections[post.year] << post
      post.tags.each { |tag| tagsSections[tag] << post }
    end
    
    @postsIndex = Index.new 'Posts'
    yearSections.each { |k, section| @postsIndex << section }

    @tagsIndex = Index.new 'Tags'
    tagsSections.each { |k, section| @tagsIndex << section }
  end
end
