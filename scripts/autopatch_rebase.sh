#!/bin/sh

git submodule update -f
cd BCDice
git checkout -b bcdice-js-auto-patch
patch -p1 < ../patch.diff
git commit -am "bcdice-js-auto-patch"
git checkout master
git pull --rebase
git checkout bcdice-js-auto-patch
git rebase master
