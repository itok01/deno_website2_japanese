<!-- # Contributing -->
# コントリビューティング

<!-- - Read the [style guide](./contributing/style_guide.md). -->
- [スタイルガイド](./contributing/style_guide.md) を読んでください。

<!-- - Please don't make [the benchmarks](https://deno.land/benchmarks) worse. -->
- [ベンチマーク](https://deno-ja.vercel.app/benchmarks) を悪くしないでください。

<!-- - Ask for help in the [community chat room](https://discord.gg/deno). -->
- [コミュニティチャットルーム](https://discord.gg/deno) で助けを求めてください。

<!--
- If you are going to work on an issue, mention so in the issue comments
  _before_ you start working on the issue.
-->
- issue で協力したい場合は、協力する前に _前に_ issue でメンションしてください。

- If you are going to work on a new feature, create an issue and discuss with
  other contributors _before_ you start working on the feature.

<!--
- Please be professional in the forums. We follow
  [Rust's code of conduct](https://www.rust-lang.org/policies/code-of-conduct)
  (CoC). Have a problem? Email ry@tinyclouds.org.
-->
- フォーラムではプロフェッショナルでいてください。[Rust's code of conduct](https://www.rust-lang.org/policies/code-of-conduct) (CoC) に従っています。問題がある場合は、ry@tinyclouds.org にメールを送ってください。

<!-- ## Development -->
## 開発

<!-- 
Instructions on how to build from source can be found
[here](./contributing/building_from_source.md).
-->
ソースからのビルドのガイドは [こちら](./contributing/building_from_source.md) を見てください。

<!-- ## Submitting a Pull Request -->
## プルリクエストの提出

<!-- Before submitting, please make sure the following is done: -->
プルリクエストを提出する前に以下のことが終わっているか確かめてください:

<!--
1. Give the PR a descriptive title.

Examples of good PR title:

- fix(std/http): Fix race condition in server
- docs(console): Update docstrings
- feat(doc): Handle nested re-exports

Examples of bad PR title:

- fix #7123
- update docs
- fix bugs

2. Ensure there is a related issue and it is referenced in the PR text.
3. Ensure there are tests that cover the changes.
4. Ensure `cargo test` passes.
5. Ensure `./tools/format.js` passes without changing files.
6. Ensure `./tools/lint.js` passes.
-->
1. PRタイトルに説明を書き込んでください。
   
良いPRタイトルの例:

- fix(std/http): Fix race condition in server
- docs(console): Update docstrings
- feat(doc): Handle nested re-exports

悪いPRタイトルの例:

- fix #7123
- update docs
- fix bugs

2. 関係するissueがありPRテキストに参照されているかどうかを確かめてください。
3. 変更をカバーするテストが存在するかを確かめてください。
5. `./tools/format.js` をファイルの変更なくパスするかどうかを確かめてください。
6. `./tools/lint.js` をパスするかどうかを確かめてください。

<!-- ## Adding Ops (aka bindings) -->
## Ops(別名、バインディング)を追加

<!--
We are very concerned about making mistakes when adding new APIs. When adding an
Op to Deno, the counterpart interfaces on other platforms should be researched.
Please list how this functionality is done in Go, Node, Rust, and Python.
-->
新しいAPIを追加するときにミスをしないかとても心配しています。OpをDenoに追加するとき、他のプラットフォームでの対応するインターフェースを調べておく必要があります。この機能がGo、Node、Rust、Pythonでどのように行われているかリストアップしてください。

<!--
As an example, see how `Deno.rename()` was proposed and added in
[PR #671](https://github.com/denoland/deno/pull/671).
-->
例として、`Deno.rename()` がどのように提案され追加されたか [PR #671](https://github.com/denoland/deno/pull/671) で見てください。

<!-- ## Releases -->
## リリース

<!--
Summary of the changes from previous releases can be found
[here](https://github.com/denoland/deno/releases).
-->
前のリリースからの変更点のまとめは [こちら](https://github.com/denoland/deno/releases) で見つかります。

<!-- ## Documenting APIs -->
## APIのドキュメントの記述

<!--
It is important to document public APIs and we want to do that inline with the
code. This helps ensure that code and documentation are tightly coupled
together.
-->
公開APIのドキュメントを記述することは重要で、インラインでコードと主に記述してほしいです。コードとドキュメントが密に結合していることを確認することが出来ます。

### Utilize JSDoc

<!--
All publicly exposed APIs and types, both via the `deno` module as well as the
global/`window` namespace should have JSDoc documentation. This documentation is
parsed and available to the TypeScript compiler, and therefore easy to provide
further downstream. JSDoc blocks come just prior to the statement they apply to
and are denoted by a leading `/**` before terminating with a `*/`. For example:
-->
すべての公開されているAPIと型は `deno` モジュールと global/`window` 名前空間の療法でJSDocドキュメントが必要です。このドキュメントは解析されTypeScriptで利用可能で、提供が簡単になります。JSDocブロックは適応される文の直前に来ており `/**` で始まり `*/` で終わります。例えば:

<!--
```ts
/** A simple JSDoc comment */
export const FOO = "foo";
```
-->
```ts
/** シンプルなJSDocコメント */
export const FOO = "foo";
```

<!-- Find more at: https://jsdoc.app/ -->
詳しくは https://jsdoc.app/ を参照してください
