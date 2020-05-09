require "test/unit"
require_relative '../lib/gonzo/index'

class TestPost < Test::Unit::TestCase
  def test_new
    assert_equal('Blocking QObjects signals', POST1.title)
    assert_equal(['C++', 'Qt'], POST1.tags)
    assert_equal(2019, POST1.year)
  end

  def test_to_s
    assert_equal("- [Nov 05] #{POST1.title}", POST1.to_s)
    assert_equal("- [Nov 05, 2019] #{POST1.title}", (POST1.to_s :long))
  end
end
