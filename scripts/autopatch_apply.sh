#!/bin/bash

BRANCH="${1:-master}"

cd BCDice
git rebase --continue
git diff $BRANCH > ../patch.diff
git checkout $BRANCH
git branch -D bcdice-js-auto-patch

cd ..
./scripts/autopatch_strip.sh
