<!-- # Runtime -->
# ランタイム

<!--
Documentation for all runtime functions (Web APIs + `Deno` global) can be found
on
[`doc.deno.land`](https://doc.deno.land/https/github.com/denoland/deno/releases/latest/download/lib.deno.d.ts).
-->
すべてのランタイムの機能(Web APIs + `Deno` global)のドキュメントは [`doc.deno.land`](https://doc.deno.land/https/github.com/denoland/deno/releases/latest/download/lib.deno.d.ts) にあります。

## Web Platform APIs

<!--
For APIs where a web standard already exists, like `fetch` for HTTP requests,
Deno uses these rather than inventing a new proprietary API.
-->
HTTPリクエストの `fetch` などのすでに存在しているwebスタンダードAPIについて、Denoは新しい独自のAPIを作るのではなくこれらを利用しています。

<!--
For more details, view the chapter on
[Web Platform APIs](./runtime/web_platform_apis.md).
-->
詳細は [Web Platform APIs](./runtime/web_platform_apis.md) チャプターを参照してください。

<!-- ## `Deno` global -->
## `Deno` グローバル

<!--
All APIs that are not web standard are contained in the global `Deno` namespace.
It has the APIs for reading from files, opening TCP sockets, and executing
subprocesses, etc.
-->
Web標準でないすべてのAPIはグローバルである `Deno` 名前空間に含まれています。
これらにはファイルの読み込み、TCPソケットの開放、サブプロセスの実行などのAPIが含まれています。

<!--
The TypeScript definitions for the Deno namespaces can be found in the
[`lib.deno.ns.d.ts`](https://github.com/denoland/deno/blob/$CLI_VERSION/cli/dts/lib.deno.ns.d.ts)
file.
-->
Deno名前空間のTypeScriptの定義は [`lib.deno.ns.d.ts`](https://github.com/denoland/deno/blob/$CLI_VERSION/cli/dts/lib.deno.ns.d.ts) ファイルにあります。

<!--
The documentation for all of the Deno specific APIs can be found on
[doc.deno.land](https://doc.deno.land/https/raw.githubusercontent.com/denoland/deno/master/cli/dts/lib.deno.ns.d.ts).
-->
Deno特有のAPIのドキュメントは [doc.deno.land](https://doc.deno.land/https/raw.githubusercontent.com/denoland/deno/master/cli/dts/lib.deno.ns.d.ts) にあります。
