require 'test/unit'
require_relative 'tc_post'
require_relative 'tc_section'
require_relative 'tc_index'

# Paths are relative to workspace root.
POST1 = Post.new './test/samples/posts/blocking-qobjects-signals.md'
POST2 = Post.new './test/samples/posts/debugging-jest-tests-on-windows-using-vscode.md'
