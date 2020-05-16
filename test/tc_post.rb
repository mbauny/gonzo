require_relative "test_helpers"
require 'gonzo/post'

class TestPost < Test::Unit::TestCase
  @@POST = Post.new './test/samples/posts/blocking-qobjects-signals.md'

  def test_new
    assert_equal( 'Blocking QObjects signals', @@POST.title )
    assert_equal( ['C++', 'Qt'], @@POST.tags )
    assert_equal( 2019, @@POST.year )
  end

  def test_to_s
    title = @@POST.title
    shortDate = @@POST.date.strftime "%b %d"
    longDate = @@POST.date.strftime "%b %d, %Y"

    assert_equal( "- [Nov 05] #{title}", "- [#{shortDate}] #{title}" )
    assert_equal( "- [Nov 05, 2019] #{title}", "- [#{longDate}] #{title}" )
  end
end
