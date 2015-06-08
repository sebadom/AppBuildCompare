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

Current dummy app is basically a browserify pipe, loading a couple of scripts andsaved with the uglified output.

It checks linting with eslint and jscs to have a styling report (not with auto fix)
It is intended to be tested with Mocha and having a coberture check with Istanbul.

Pipeline goes like: lint -> style -> test -> bundle -> minified file

