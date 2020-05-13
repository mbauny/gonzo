require_relative "test_helpers"
require 'gonzo/post'
require 'gonzo/post_section'
require 'gonzo/index'

class TestIndex < Test::Unit::TestCase
  @@POST1 = Post.new './test/samples/posts/blocking-qobjects-signals.md'
  @@POST2 = Post.new './test/samples/posts/debugging-jest-tests-on-windows-using-vscode.md'

  def test_to_s_empty
    index = Index.new 'Index'
    assert_equal( "# Index\n\n", index.to_s )
  end

  def test_to_s_short
    section1 = YearSection.new '2020'
    section1 << @@POST1 << @@POST2
    section2 = YearSection.new '2019'
    section2 << @@POST1 << @@POST2

    index = Index.new 'Index'
    index << section1 << section2

    entries = [
      "# Index\n",
      "#{section1.to_s}\n",
      "#{section2.to_s}\n",
    ].join "\n"
    assert_equal( entries, index.to_s )
  end

  def test_to_s_long
    section1 = TagSection.new 'C++'
    section1 << @@POST1 << @@POST2
    section2 = TagSection.new 'JavaScript'
    section2 << @@POST1 << @@POST2

    index = Index.new 'Index'
    index << section1 << section2

    shortEntries = [
      "# Index\n",
      "#{section1.to_s}\n",
      "#{section2.to_s}\n",
    ].join "\n"
    assert_equal( shortEntries, index.to_s )
  end
end
