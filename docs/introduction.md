<!-- # Introduction -->
# イントロダクション

<!--
Deno is a JavaScript/TypeScript runtime with secure defaults and a great
developer experience.
-->
Denoはデフォルトで安全なJavaScript/TypeScriptのランタイムで素晴らしいデベロッパーエクスペリエンスを提供します。

<!--
It's built on V8, Rust, and Tokio.
-->
V8、Rust、Tokioを使って作られています。

<!-- ## Feature highlights -->
## 機能のハイライト

<!--
- Secure by default. No file, network, or environment access (unless explicitly
  enabled).
- Supports TypeScript out of the box.
- Ships a single executable (`deno`).
- Has built-in utilities like a dependency inspector (`deno info`) and a code
  formatter (`deno fmt`).
- Has
  [a set of reviewed (audited) standard
  modules](https://github.com/denoland/deno_std) that are guaranteed
  to work with Deno.
- Can bundle scripts into a single JavaScript file.
-->
- デフォルトで安全。ファイル、ネットワーク、環境へのアクセスなし(明示的に有効にしない限り)。
- 最初からTypeScriptをサポート。
- 1つの実行ファイル(`deno`)で実行可能。
- 依存関係インスペクター(`deno info`)やコードフォーマッター(`deno fmt`)などのビルトインユーティリティーを持っています。
- Denoで動作する[審査済み(監査済み)の標準モジュール](https://github.com/denoland/deno_std)を持っています。
- スクリプトを1つのJavaScriptファイルにバンドルすることが出来ます。

<!-- ## Philosophy -->
## 哲学

<!--
Deno aims to be a productive and secure scripting environment for the modern
programmer.
-->
Denoはモダンなプログラマーのための生産的で安全なスクリプトが実行できる環境を目指しています。

<!--
Deno will always be distributed as a single executable. Given a URL to a Deno
program, it is runnable with nothing more than
[the ~25 megabyte zipped executable](https://github.com/denoland/deno/releases).
Deno explicitly takes on the role of both runtime and package manager. It uses a
standard browser-compatible protocol for loading modules: URLs.
-->
Denoは常に1つの実行ファイルで配布されます。[~25メガバイトのzip圧縮された実行ファイル](https://github.com/denoland/deno/releases)だけでDenoは実行可能です。
Denoはランタイムとパッケージマネージャの両方の機能を持っています。モジュールの読み込みにはURLなどの標準ブラウザ互換プロトコルを利用します。

<!--
Among other things, Deno is a great replacement for utility scripts that may
have been historically written with Bash or Python.
-->
とりわけ、DenoはBashやPythonで書かれた過去のユーティリティースクリプトの優れた代替です。

<!-- ## Goals -->
## ゴール

<!--
- Ship as just a single executable (`deno`).
- Provide secure defaults.
  - Unless specifically allowed, scripts can't access files, the environment, or
    the network.
- Be browser-compatible.
  - The subset of Deno programs which are written completely in JavaScript and
    do not use the global `Deno` namespace (or feature test for it), ought to
    also be able to be run in a modern web browser without change.
- Provide built-in tooling to improve developer experience.
  - E.g. unit testing, code formatting, and linting.
- Keep V8 concepts out of user land.
- Serve HTTP efficiently.
-->
- 1つの実行ファイル(`deno`)で実行可能。
- 安全な初期設定の提供。
  - 明確に許可しない限りスクリプトはファイル、環境、ネットワークにアクセスできません。
- ブラウザ互換であること。
  - 完全に JavaScript で書かれていて、グローバル `Deno` 名前空間を使っていない Deno プラグラムのサブセット(もしくはそのための機能テスト)は、モダンなブラウザでも変更なしに実行できるようにする必要があります。
- デベロッパーエクスペリエンスを向上させるためのビルトインツールの提供。
  - 例えば、ユニットテスト、コードフォーマット、リント。
- V8のコンセプトをユーザーランドから排除。
- 効率的にHTTPを提供できること。

<!-- ## Comparison to Node.js -->
## Node.jsとの比較

<!--
- Deno does not use `npm`.
  - It uses modules referenced as URLs or file paths.
- Deno does not use `package.json` in its module resolution algorithm.
- All async actions in Deno return a promise. Thus Deno provides different APIs
  than Node.
- Deno requires explicit permissions for file, network, and environment access.
- Deno always dies on uncaught errors.
- Deno uses "ES Modules" and does not support `require()`. Third party modules
  are imported via URLs:
-->
- Denoは`npm`を使いません。
  - モジュールの参照にはURLやファイルパスを使います。
- Denoはモジュールの解決のために`package.json`を使いません。
- Denoのすべての非同期の動作はプロミスを返します。よって、DenoはNodeと違うAPIを提供します。
- Denoはファイル、ネットワーク、環境へのアクセスには明示的なパーミッションを要求します。
- Denoは捕獲できないエラーの場合かならず停止します。
- "ESモジュール"を使い`require()`をサポートしません。サードパーティモジュールはURLによってインポートされます: 

  ```javascript
  import * as log from "https://deno.land/std@$STD_VERSION/log/mod.ts";
  ```

<!-- ## Other key behaviors -->
## その他の重要な振る舞い

<!--
- Fetch and cache remote code upon first execution, and never update it until
  the code is run with the `--reload` flag. (So, this will still work on an
  airplane.)
- Modules/files loaded from remote URLs are intended to be immutable and
  cacheable.
-->
- リモートにあるコードは最初の実行のときに取得、キャッシュされ、`--reload`フラッグ付きで実行されるまでアップデートされません。(だから、飛行機の中でも動きます。)
- リモートのURLからロードされたモジュール/ファイルはイミュータブルでキャッシュ可能になるよう意図しています。
