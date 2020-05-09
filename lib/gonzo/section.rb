class Section
  attr_reader :title
  
  def initialize title, fmt = :short
    @title = title
    @fmt = fmt
    @posts = []
  end

  def << post
    @posts << post
  end

  def to_s
    lines = ["## #{@title}\n"]
    lines << @posts.map { |post| post.to_s @fmt }
    lines.join "\n"
  end
end
