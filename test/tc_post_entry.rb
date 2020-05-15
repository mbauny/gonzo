require_relative "test_helpers"
require 'gonzo/post'
require 'gonzo/post_entry'

class TestPostEntry < Test::Unit::TestCase
  @@POST = Post.new './test/samples/posts/blocking-qobjects-signals.md'

  def test_main_page
    entry = PostEntry.new(@@POST, '%b %d, %Y', './posts')

    assert_equal( @@POST, entry.post )
    assert_equal( './posts/' + @@POST.file_name + '#' + @@POST.title_anchor, entry.url )

    expected = "- [#{@@POST.date.strftime '%b %d, %Y'}] [#{@@POST.title}](#{entry.url})"
    assert_equal( expected, entry.to_s )
  end

  def test_posts_page
    entry = PostEntry.new(@@POST, '%b %d')

    assert_equal( @@POST, entry.post )
    assert_equal( './' + @@POST.file_name + '#' + @@POST.title_anchor, entry.url )

    expected = "- [#{@@POST.date.strftime '%b %d'}] [#{@@POST.title}](#{entry.url})"
    assert_equal( expected, entry.to_s )
  end

  def test_tags_page
    entry = PostEntry.new(@@POST, '%b %d, %Y', '../posts')

    assert_equal( @@POST, entry.post )
    assert_equal( '../posts/' + @@POST.file_name + '#' + @@POST.title_anchor, entry.url )

    expected = "- [#{@@POST.date.strftime '%b %d, %Y'}] [#{@@POST.title}](#{entry.url})"
    assert_equal( expected, entry.to_s )
  end
end
