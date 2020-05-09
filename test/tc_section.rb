require "test/unit"
require_relative '../lib/gonzo/post'
require_relative '../lib/gonzo/section'

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
      "- [Nov 05] #{@@POST1.title}",
      "- [Jan 22] #{@@POST2.title}"
    ].join "\n"
    assert_equal( entries, section.to_s )
  end

  def test_to_s_long
    section = Section.new 'Long Entries', :long
    section << @@POST1 << @@POST2

    entries = [
      "## Long Entries\n",
      "- [Nov 05, 2019] #{@@POST1.title}",
      "- [Jan 22, 2020] #{@@POST2.title}"
    ].join "\n"
    assert_equal( entries, section.to_s )
  end
end
