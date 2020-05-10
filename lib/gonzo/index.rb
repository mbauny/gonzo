class Index
  attr_reader :sections

  def initialize title
    @title = title
    @sections = []
  end

  def << section
    @sections << section
  end

  def to_s
    lines = ["# #{@title}\n"]
    lines << @sections.map { |section| "#{section.to_s}\n" }
    lines.join "\n"
  end
end
