require "test/unit"
require_relative '../lib/gonzo/index'

class TestSection < Test::Unit::TestCase
  @@POST1 = Post.new './test/samples/posts/blocking-qobjects-signals.md'
  @@POST2 = Post.new './test/samples/posts/debugging-jest-tests-on-windows-using-vscode.md'

  def test_to_s_empty
    section = Section.new 'Short Entries'
    assert_equal( "## Short Entries\n\n", section.to_s )

    section = Section.new 'Long Entries', :long
    assert_equal( "## Long Entries\n\n", section.to_s )
  end

  def test_to_s_short
    section = Section.new 'Short Entries'
    section << @@POST1 << @@POST2

    entries = [
      "## Short Entries\n",
      @@POST1.to_s,
      @@POST2.to_s
    ].join "\n"
    assert_equal( entries, section.to_s )
  end

  def test_to_s_long
    section = Section.new 'Long Entries', :long
    section << @@POST1 << @@POST2

    entries = [
      "## Long Entries\n",
      (@@POST1.to_s :long),
      (@@POST2.to_s :long)
    ].join "\n"
    assert_equal( entries, section.to_s )
  end
end
