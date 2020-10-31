require 'gonzo/section'

class TextSection < Section
  def initialize title
    super title
    @lines = ["## #{@title}\n"]
  end

  def << line
    @lines << line
  end

  def to_s
    @lines.join "\n"
  end
end
