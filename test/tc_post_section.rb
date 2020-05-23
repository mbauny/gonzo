require_relative "test_helpers"
require 'gonzo/post'
require 'gonzo/post_section'

class TestPostSection < Test::Unit::TestCase
  @@POST1 = Post.new './test/samples/posts/blocking-qobjects-signals.md'

  def test_year_section
    section = YearSection.new '2019'
    assert_equal( "## 2019\n\n", section.to_s )

    assert_equal( true, section.empty?)
    section << @@POST1
    assert_equal( false, section.empty?)
  end

  def test_tag_section
    section = YearSection.new 'C++'
    assert_equal( "## C++\n\n", section.to_s )

    assert_equal( true, section.empty?)
    section << @@POST1
    assert_equal( false, section.empty?)
  end

  def test_latest_section
    section = LatestSection.new
    assert_equal( "## :new: Latest posts\n\n", section.to_s )

    assert_equal( true, section.empty?)
    section << @@POST1
    assert_equal( false, section.empty?)

    assert_equal( false, section.full?)
    section << @@POST1 << @@POST1 << @@POST1 << @@POST1
    assert_equal( true, section.full?)
  end
end
