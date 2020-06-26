require 'gonzo/index'
require 'gonzo/post'
require 'gonzo/post_section'
require 'gonzo/text_section'

class Db
  attr_reader :src_dir
  attr_reader :mainIndex
  attr_reader :postsIndex
  attr_reader :tagsIndex

  def isReadMeFile file_path
    file_path.end_with? 'README.md'
  end

  def initialize src_dir
    @src_dir = src_dir

    yearSections = Hash.new { |h, year| h[year] = YearSection.new year }
    tagsSections = Hash.new { |h, tag| h[tag] = TagSection.new tag }

    # Looking for post files...
    Dir.glob("#{@src_dir}/posts/*.md").each do |file_path|
      next if isReadMeFile file_path

      post = Post.new file_path
      yearSections[post.year] << post
      post.tags.each { |tag| tagsSections[tag] << post }
    end

    @postsIndex = Index.new 'Posts'
    yearSections.each { |k, section| @postsIndex << section }

    @tagsIndex = Index.new 'Tags'
    tagsSections.each { |k, section| @tagsIndex << section }

    latestSection = LatestSection.new
    for section in postsIndex.sections
      break if latestSection.full?

      for entry in section.entries
        break if latestSection.full?
        latestSection << entry.post
      end
    end

    headingSection = TextSection.new ":house: Matthieu Bauny's page"
    headingSection << "Hi, welcome to my homepage.\n"
    headingSection << "I blog a little and my latest posts can be found bellow. You can also read a little more about me [here](./pages/about.md \"About\").\n"
    headingSection << 'Cheers :metal:'

    browseSection = TextSection.new ':date: Older posts'
    browseSection << '- [Browse by date](./posts#posts "Posts")' << '- [Browse by topic](./tags#tags "Tags")'

    @mainIndex = Index.new 'Meet the engineer'
    @mainIndex << headingSection << latestSection
    @mainIndex << browseSection
  end
end
