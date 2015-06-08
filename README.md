# AppBuildCompare - clean

This is a repo intended for comparing different strategies for a build phase on
a given app. Master branch is othe boilerplate for building strategies on top of
it

Each branch represents a differnt strategy and it should contain only pkgs
relevant for that strategy in particular. It should not change the boilerplate
app running as a test

Current strategies:
- npm using scripts through package.json scripts 
- gulp
- grunt
- buildScripts (WIP)
