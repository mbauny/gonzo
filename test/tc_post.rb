require_relative "test_helpers"
require 'gonzo/post'

class TestPost < Test::Unit::TestCase
  @@POST1 = Post.new './test/samples/posts/blocking-qobjects-signals.md'

  def test_new
    assert_equal('Blocking QObjects signals', @@POST1.title)
    assert_equal(['C++', 'Qt'], @@POST1.tags)
    assert_equal(2019, @@POST1.year)
  end

  def test_to_s
    title = @@POST1.title
    shortDate = @@POST1.date.strftime "%b %d"
    longDate = @@POST1.date.strftime "%b %d, %Y"

    assert_equal( "- [Nov 05] #{title}", "- [#{shortDate}] #{title}" )
    assert_equal( "- [Nov 05, 2019] #{title}", "- [#{longDate}] #{title}" )
  end
end
