require "test/unit"
require_relative '../lib/gonzo/post'
require_relative '../lib/gonzo/post_entry'

class TestPostEntry < Test::Unit::TestCase
  @@POST = Post.new './test/samples/posts/blocking-qobjects-signals.md'

  def test_main_page
    entry = MainPagePostEntry.new @@POST

    assert_equal( @@POST, entry.post )
    assert_equal( './posts/' + @@POST.file_name, entry.url )

    expected = "- [#{@@POST.date.strftime '%b %d, %Y'}] [#{@@POST.title}](#{entry.url})"
    assert_equal( expected, entry.to_s )
  end

  def test_posts_page
    entry = PostsPagePostEntry.new @@POST

    assert_equal( @@POST, entry.post )
    assert_equal( './' + @@POST.file_name, entry.url )

    expected = "- [#{@@POST.date.strftime '%b %d'}] [#{@@POST.title}](#{entry.url})"
    assert_equal( expected, entry.to_s )
  end

  def test_tags_page
    entry = TagsPagePostEntry.new @@POST

    assert_equal( @@POST, entry.post )
    assert_equal( '../posts/' + @@POST.file_name, entry.url )

    expected = "- [#{@@POST.date.strftime '%b %d, %Y'}] [#{@@POST.title}](#{entry.url})"
    assert_equal( expected, entry.to_s )
  end
end
