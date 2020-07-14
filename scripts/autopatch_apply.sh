#!/bin/sh

cd BCDice
git rebase --continue
git diff master > ../patch.diff
git checkout master
git branch -D bcdice-js-auto-patch
