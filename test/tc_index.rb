require "test/unit"
require_relative '../lib/gonzo/post'
require_relative '../lib/gonzo/section'
require_relative '../lib/gonzo/index'

class TestIndex < Test::Unit::TestCase
  @@POST1 = Post.new './test/samples/posts/blocking-qobjects-signals.md'
  @@POST2 = Post.new './test/samples/posts/debugging-jest-tests-on-windows-using-vscode.md'

  def test_to_s_empty
    index = Index.new 'Index'
    assert_equal( "# Index\n\n", index.to_s )
  end

  def test_to_s_short
    section1 = Section.new 'Section 1'
    section1 << @@POST1 << @@POST2
    section2 = Section.new 'Section 2'
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
    section1 = Section.new 'Section 1', :long
    section1 << @@POST1 << @@POST2
    section2 = Section.new 'Section 2', :long
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
