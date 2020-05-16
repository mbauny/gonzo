require 'gonzo/db'
require 'github/markup'

class Html
  @@TITLE_MARKER = '#{TITLE}'
  @@CONTENT_MARKER = '#{CONTENT}'

  def initialize template_file_path, css_file_path
    @template = File.read template_file_path
    @css = File.read css_file_path
  end

  def write db
    root_dir = db.src_dir
    posts_dir = File.join root_dir, 'posts'
    tags_dir = File.join root_dir, 'tags'

    write_index root_dir, db.mainIndex
    write_index posts_dir, db.postsIndex
    write_index tags_dir, db.tagsIndex

    write_css root_dir
    write_css posts_dir
    write_css tags_dir
  end

  private
  def write_css dir
    css_path = File.join dir, 'style.css'
    File.write css_path, @css
  end

  def write_index dir, index
    markdown = index.to_s
    html_content = GitHub::Markup.render_s( GitHub::Markups::MARKUP_MARKDOWN, markdown ).strip!
    html_page = @template.dup
    html_page.sub! @@TITLE_MARKER, index.title
    html_page.sub! @@CONTENT_MARKER, html_content
    html_path = File.join dir, 'index.html'
    File.write html_path, html_page
  end
end
