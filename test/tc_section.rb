require "test/unit"
require_relative '../lib/gonzo/index'

class TestSection < Test::Unit::TestCase
  def test_to_s_empty
    section = Section.new 'Section'
    assert_equal( "## Section\n\n", section.to_s )
    assert_equal( "## Section\n\n", (section.to_s :long) )
  end

  def test_to_s
    section = Section.new 'Section'
    section << POST1 << POST2

    entries = [
      "## Section\n",
      (POST1.to_s :long),
      (POST2.to_s :long)
    ].join "\n"
    assert_equal( entries, (section.to_s :long) )

    shortEntries = [
      "## Section\n",
      POST1.to_s,
      POST2.to_s
    ].join "\n"
    assert_equal( shortEntries, section.to_s )
  end
end
