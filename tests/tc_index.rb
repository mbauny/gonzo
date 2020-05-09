require "test/unit"
require_relative '../lib/gonzo/index'

class TestIndex < Test::Unit::TestCase
  def test_to_s_empty
    index = Index.new 'Index'
    assert_equal( "# Index\n\n", index.to_s )
    assert_equal( "# Index\n\n", (index.to_s :long) )
  end

  def test_to_s    
    section1 = Section.new 'Section 1'
    section1 << POST1 << POST2
    section2 = Section.new 'Section 2'
    section2 << POST1 << POST2

    index = Index.new 'Index'
    index << section1 << section2

    entries = [
      "# Index\n",
      "#{section1.to_s :long}\n",
      "#{section2.to_s :long}\n",
    ].join "\n"
    assert_equal( entries, (index.to_s :long) )

    shortEntries = [
      "# Index\n",
      "#{section1.to_s}\n",
      "#{section2.to_s}\n",
    ].join "\n"
    assert_equal( shortEntries, index.to_s)
  end
end
