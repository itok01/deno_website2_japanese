# Read-eval-print-loop

<!--
`deno repl` starts an read-eval-print-loop, which lets you interactively build
up program state in the global context.
-->
`deno repl` グローバルコンテクスト内でのプログラムの状態を対話的に構築する入力・評価・出力ループを開始します。

<!-- ## Keyboard shortcuts -->
## キーボードショートカット

<!--
| Keystroke             | Action                                                                                           |
| --------------------- | ------------------------------------------------------------------------------------------------ |
| Ctrl-A, Home          | Move cursor to the beginning of line                                                             |
| Ctrl-B, Left          | Move cursor one character left                                                                   |
| Ctrl-C                | Interrupt and cancel the current edit                                                            |
| Ctrl-D                | If if line _is_ empty, signal end of line                                                        |
| Ctrl-D, Del           | If line is _not_ empty, delete character under cursor                                            |
| Ctrl-E, End           | Move cursor to end of line                                                                       |
| Ctrl-F, Right         | Move cursor one character right                                                                  |
| Ctrl-H, Backspace     | Delete character before cursor                                                                   |
| Ctrl-I, Tab           | Next completion                                                                                  |
| Ctrl-J, Ctrl-M, Enter | Finish the line entry                                                                            |
| Ctrl-K                | Delete from cursor to end of line                                                                |
| Ctrl-L                | Clear screen                                                                                     |
| Ctrl-N, Down          | Next match from history                                                                          |
| Ctrl-P, Up            | Previous match from history                                                                      |
| Ctrl-R                | Reverse Search history (Ctrl-S forward, Ctrl-G cancel)                                           |
| Ctrl-T                | Transpose previous character with current character                                              |
| Ctrl-U                | Delete from start of line to cursor                                                              |
| Ctrl-V                | Insert any special character without performing its associated action (#65)                      |
| Ctrl-W                | Delete word leading up to cursor (using white space as a word boundary)                          |
| Ctrl-X Ctrl-U         | Undo                                                                                             |
| Ctrl-Y                | Paste from Yank buffer                                                                           |
| Ctrl-Y                | Paste from Yank buffer (Meta-Y to paste next yank instead)                                       |
| Ctrl-Z                | Suspend (Unix only)                                                                              |
| Ctrl-_                | Undo                                                                                             |
| Meta-0, 1, ..., -     | Specify the digit to the argument. `–` starts a negative argument.                               |
| Meta-<                | Move to first entry in history                                                                   |
| Meta->                | Move to last entry in history                                                                    |
| Meta-B, Alt-Left      | Move cursor to previous word                                                                     |
| Meta-Backspace        | Kill from the start of the current word, or, if between words, to the start of the previous word |
| Meta-C                | Capitalize the current word                                                                      |
| Meta-D                | Delete forwards one word                                                                         |
| Meta-F, Alt-Right     | Move cursor to next word                                                                         |
| Meta-L                | Lower-case the next word                                                                         |
| Meta-T                | Transpose words                                                                                  |
| Meta-U                | Upper-case the next word                                                                         |
| Meta-Y                | See Ctrl-Y                                                                                       |
-->

| キーストローク        | 操作                                                                                             |
| --------------------- | ------------------------------------------------------------------------------------------------ |
| Ctrl-A, Home          | カーソルを行の最初に移動する                                                                     |
| Ctrl-B, Left          | カーソルを一文字左に移動する                                                                     |
| Ctrl-C                | 現在の編集を中断しキャンセルする                                                                 |
| Ctrl-D                | 行が _空の_ 場合、終了シグナルを送る                                                             |
| Ctrl-D, Del           | 行が _空でない_ 場合、カーソルの下の文字を削除する                                               |
| Ctrl-E, End           | 行の最後にカーソルを移動する                                                                     |
| Ctrl-F, Right         | カーソルを一文字右に移動する                                                                     |
| Ctrl-H, Backspace     | カーソルの前の文字を削除する                                                                     |
| Ctrl-I, Tab           | 次の補完する                                                                                     |
| Ctrl-J, Ctrl-M, Enter | 行の入力を終了する                                                                               |
| Ctrl-K                | カーソルから行の最後までを削除する                                                               |
| Ctrl-L                | 画面をクリアする                                                                                 |
| Ctrl-N, Down          | 履歴から次の一致                                                                                 |
| Ctrl-P, Up            | 履歴から前の一致                                                                                 |
| Ctrl-R                | 履歴を逆から検索する (Ctrl-S 次へ, Ctrl-G キャンセル)                                            |
| Ctrl-T                | 以前の文字を現在の文字に入れ替える                                                               |
| Ctrl-U                | 行の始めからカーソルまでを削除する                                                               |
| Ctrl-V                | 特別な文字をそれに関連した動作をせずに挿入する (#65)                                             |
| Ctrl-W                | カーソルまでの単語を削除する (空白を境界として利用)                                              |
| Ctrl-X Ctrl-U         | 取り消し                                                                                         |
| Ctrl-Y                | ヤンクバッファから貼り付ける                                                                     |
| Ctrl-Y                | ヤンクバッファから貼り付ける (Meta-Y で次のヤンクを代わりに貼り付ける)                           |
| Ctrl-Z                | サスペンド (Unix のみ)                                                                           |
| Ctrl-_                | 取り消し                                                                                         |
| Meta-0, 1, ..., -     | 引数の桁数を指定する。`-` は負の引数を開始する。                                                 |
| Meta-<                | 履歴の最初のエントリーに移動する                                                                 |
| Meta->                | 履歴の最後のエントリーに移動する                                                                 |
| Meta-B, Alt-Left      | カーソルを前の単語に移動する                                                                     |
| Meta-Backspace        | 現在の単語から前方の単語の先頭までを削除する                                                     |
| Meta-C                | 現在の単語を大文字にする                                                                         |
| Meta-D                | 前方の単語を削除する                                                                             |
| Meta-F, Alt-Right     | カーソルを次の単語に移動する                                                                     |
| Meta-L                | 次の単語を Lower-case にする                                                                     |
| Meta-T                | 単語を入れ替える                                                                                 |
| Meta-U                | 次の単語を Upper-case にする                                                                     |
| Meta-Y                | Ctrl-Y を見てください                                                                            |

<!-- ## Special variables -->
## 特別な変数

<!--
| Identifier | Description                          |
| ---------- | ------------------------------------ |
| _          | Yields the last evaluated expression |
| _error     | Yields the last thrown error         |
-->
| 識別子     | 説明                                 |
| ------     | ------------------------------------ |
| _          | 最後に評価された式を返します         |
| _error     | 最後に投げられたエラーを返します     |
