require 'gonzo/db'
require 'gonzo/index'

class Writer
  def initialize db, out_dir
    @db = db
    @out_dir = out_dir
  end

  def writeIndexFile dir, text
    full_dir = File.join @out_dir, dir
    Dir.mkdir full_dir if !File.exists? full_dir
    file = File.join full_dir, 'README.md'
    File.write file, text
  end

  def write
    postsIndex = Index.new 'Posts'
    @db.years.reverse.each do |year|
      yearSection = Section.new year
      (@db.postsPerYear year)
      .reverse
      .each { |post| yearSection << post }
      postsIndex << yearSection
    end
    writeIndexFile 'posts', postsIndex.to_s

    tagsIndex = Index.new 'Tags'
    @db.tags.each do |tag|
      tagSection = Section.new tag
      (@db.postsPerTag tag)
      .reverse
      .each { |post| tagSection << post }
      tagsIndex << tagSection
    end
    writeIndexFile 'tags', (tagsIndex.to_s :long)
  end
end
