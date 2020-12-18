<!-- # Web Platform APIs -->
# Web プラットフォーム APIs

<!--
Deno aims to use web platform APIs (like `fetch`) instead of inventing a new
proprietary API where it makes sense. These APIs generally follow the
specifications and should match the implementation in Chrome and Firefox. In
some cases it makes sense to deviate from the spec slightly, because of the
different security model Deno has.
-->
Deno 独自の新しいAPIを開発するのではなくwebプラットフォームAPI(`fetch` など)を使うことを目標にしています。これらのAPIは一般的に仕様に沿っており Chrome や Firefox の実装と一致しているはずです。場合によっては Deno のセキュリティモデルと異なるため仕様から逸脱するほうが良い場合もあります。

<!-- Here is a list of web platform APIs Deno implements: -->
Deno が実装しているwebプラットフォームAPIのリストです:

## `fetch` API

<!-- ### Overview -->
### 概要

<!--
The `fetch` API can be used to make HTTP requests. It is implemented as
specified in the [WHATWG `fetch` spec](https://fetch.spec.whatwg.org/).
-->
`fetch` APIはHTTPリクエストをするために使われます。これは [WHATWG `fetch` spec](https://fetch.spec.whatwg.org/) での仕様の実装です。

<!--
You can find documentation about this API on
[MDN](https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API).
-->
このAPIについてのドキュメントは [MDN](https://developer.mozilla.org/ja/docs/Web/API/Fetch_API) にあります

<!-- ### Spec deviations -->
### 仕様比較

<!--
- The Deno user agent does not have a cookie jar. As such, the `set-cookie`
  header on a response is not processed, or filtered from the visible response
  headers.
- Deno does not follow the same-origin policy, because the Deno user agent
  currently does not have the concept of origins, and it does not have a cookie
  jar. This means Deno does not need to protect against leaking authenticated
  data cross origin. Because of this Deno does not implement the following
  sections of the WHATWG `fetch` specification:
  - Section `3.1. 'Origin' header`.
  - Section `3.2. CORS protocol`.
  - Section `3.5. CORB`.
  - Section `3.6. 'Cross-Origin-Resource-Policy' header`.
  - `Atomic HTTP redirect handling`.
  - The `opaqueredirect` response type.
- A `fetch` with a `redirect` mode of `manual` will return a `basic` response
  rather than an `opaqueredirect` response.
-->

- Deno ユーザーエージェントは cookie jar がありません。そのためレスポンスの `set-cookie` ヘッダーは処理されず、レスポンスヘッダーから不可視です。
- Deno ユーザーエージェントは現在 origin の概念がなく、cookie jar がないため、Denoは same-origin ポリシーに従いません。これはDenoが cross origin で認証されたデータが漏洩しないように保護する必要がないことを意味します。このため、Deno はWHATWG `fetch` 仕様の以下のセクションを実装していません:
  - Section `3.1. 'Origin' header`。
  - Section `3.2. CORS protocol`。
  - Section `3.5. CORB`。
  - Section `3.6. 'Cross-Origin-Resource-Policy' header`。
  - `Atomic HTTP redirect handling`。
  - The `opaqueredirect` response type。
- `manual` の `redirect` モードをもつ `fetch` は `opaqueredirect` レスポンスではなく `basic` レスポンスを返します。

## `CustomEvent`, `EventTarget` and `EventListener`

<!-- ### Overview -->
### 概要

<!--
The DOM Event API can be used to dispatch and listen to events happening in an
application. It is implemented as specified in the
[WHATWG DOM spec](https://dom.spec.whatwg.org/#events).
-->
DOM イベント API はアプリケーションで発生したイベントのディスパッチとリッスンに使用されます。これは [WHATWG DOM spec](https://dom.spec.whatwg.org/#events) での仕様の実装です。

<!--
You can find documentation about this API on
[MDN](https://developer.mozilla.org/en-US/docs/Web/API/EventTarget).
-->
このAPIについてのドキュメントは [MDN](https://developer.mozilla.org/ja/docs/Web/API/EventTarget) にあります。

<!-- ### Spec deviations -->
### 仕様比較

<!--
- Events do not bubble, because Deno does not have a DOM hierarchy, so there is
  no tree for Events to bubble/capture through.
-->
- Deno は DOM 階層を持っていないためイベントはバブルしません。だから、バブル/取得するためのイベントのツリーはありませ。

## Web Worker API

<!-- ### Overview -->
### 概要

<!--
The WebWorker API can be used to executing code in a separate thread. It is
implemented as specified in the
[WHATWG HTML spec](https://html.spec.whatwg.org/multipage/workers.html#workers).
-->
WebWorker API は分離したスレッドのコードの実行に使用されます。これは [WHATWG HTML spec](https://html.spec.whatwg.org/multipage/workers.html#workers) での仕様の実装です。

<!--
You can find documentation about this API on
[MDN](https://developer.mozilla.org/en-US/docs/Web/API/Worker).
-->
このAPIについてのドキュメントは [MDN](https://developer.mozilla.org/ja/docs/Web/API/Worker) にあります。

<!-- ### Spec deviations -->
### 仕様比較

<!--
- Currently creating workers from blob URLs is not supported.
- Currently posted data is serialized to JSON instead of structured cloning.
- Currently object ownership cannot be transferred between workers.
-->
- 現在、blob URL からのワーカーの作成はサポートされていません。
- 現在、ポストされたデータは構造化複製の代わりにJSONにシリアライズされます。
- 現在、オブジェクトの所有権はワーカー間で譲渡することができません。

<!-- ## Other APIs -->
## その他のAPI

<!--
- [Blob](https://developer.mozilla.org/en-US/docs/Web/API/Blob)
- [Console](https://developer.mozilla.org/en-US/docs/Web/API/Console)
- [FormData](https://developer.mozilla.org/en-US/docs/Web/API/FormData)
- [Performance](https://developer.mozilla.org/en-US/docs/Web/API/Performance)
- [setTimeout, setInterval, clearInterval](https://developer.mozilla.org/en-US/docs/Web/API/setTimeout)
- [Streams API](https://developer.mozilla.org/en-US/docs/Web/API/Streams_API)
- [URL](https://developer.mozilla.org/en-US/docs/Web/API/URL)
- [URLSearchParams](https://developer.mozilla.org/en-US/docs/Web/API/URLSearchParams)
- [WebSocket](https://developer.mozilla.org/en-US/docs/Web/API/WebSocket)
-->
- [Blob](https://developer.mozilla.org/ja/docs/Web/API/Blob)
- [Console](https://developer.mozilla.org/ja/docs/Web/API/Console)
- [FormData](https://developer.mozilla.org/ja/docs/Web/API/FormData)
- [Performance](https://developer.mozilla.org/ja/docs/Web/API/Performance)
- [setTimeout, setInterval, clearInterval](https://developer.mozilla.org/en-US/docs/Web/API/setTimeout)
- [Streams API](https://developer.mozilla.org/ja/docs/Web/API/Streams_API)
- [URL](https://developer.mozilla.org/ja/docs/Web/API/URL)
- [URLSearchParams](https://developer.mozilla.org/ja/docs/Web/API/URLSearchParams)
- [WebSocket](https://developer.mozilla.org/ja/docs/Web/API/WebSocket)

---

<!-- ## Typings -->
## 型

<!--
The TypeScript definitions for the implemented web APIs can be found in the
[`lib.deno.shared_globals.d.ts`](https://github.com/denoland/deno/blob/$CLI_VERSION/cli/dts/lib.deno.shared_globals.d.ts)
and
[`lib.deno.window.d.ts`](https://github.com/denoland/deno/blob/$CLI_VERSION/cli/dts/lib.deno.window.d.ts)
files.
-->
実装された API の TypeScript 定義は [`lib.deno.shared_globals.d.ts`](https://github.com/denoland/deno/blob/$CLI_VERSION/cli/dts/lib.deno.shared_globals.d.ts) と [`lib.deno.window.d.ts`](https://github.com/denoland/deno/blob/$CLI_VERSION/cli/dts/lib.deno.window.d.ts) ファイルにあります。

<!--
Definitions that are specific to workers can be found in the
[`lib.deno.worker.d.ts`](https://github.com/denoland/deno/blob/$CLI_VERSION/cli/dts/lib.deno.worker.d.ts)
file.
-->
ワーカーに特有の定義は [`lib.deno.worker.d.ts`](https://github.com/denoland/deno/blob/$CLI_VERSION/cli/dts/lib.deno.worker.d.ts) ファイルにあります。
