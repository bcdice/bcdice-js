#!/bin/bash

BRANCH="${1:-master}"

git submodule update -f
cd BCDice
git checkout -b bcdice-js-auto-patch
patch -p1 < ../patch.diff
git commit -am "bcdice-js-auto-patch"
git checkout $BRANCH
git pull --rebase
git checkout bcdice-js-auto-patch
git rebase $BRANCH
