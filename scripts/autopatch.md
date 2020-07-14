# autopatch
パッチ更新補助スクリプト

## Requirements
* git
* diff

## Usage
1. `cd path/to/bcdice-js`
2. `git submodule update` (patch.diffが適用できるRevに)
3. `./scripts/autopatch_rebase.sh`
4. Conflictを解消、`git add`
5. `./scripts/autopatch_apply.sh`

## Notes
* ローカルのBCDiceリポジトリに未コミット差分がないこと。
* ローカルのBCDiceリポジトリ上でブランチ`bcdice-js-auto-patch`が使用されていないこと。
* 失敗したら上記ブランチを手動で削除する。
