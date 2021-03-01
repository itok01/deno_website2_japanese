<!-- ## Migrating to and from JavaScript -->
## JavaScript への移行と JavaScript からの移行

<!--
One of the advantages of Deno is that it treats TypeScript and JavaScript pretty
equally. This might mean that transitioning from JavaScript to TypeScript or
even from TypeScript to JavaScript is something you want to accomplish. There
are several features of Deno that can help with this.
-->
Deno の有利な点の一つは TypeScript と JavaScript をほぼ同等に扱うことです。これはJavaScript から TypeScript への移行や TypeScript から JavaScript への移行を達成したいということを意味するかもしれません。Deno にはこれらのためのいくつかの機能があります。

<!-- ### Type checking JavaScript -->
### JavaScript の型チェック

<!--
You might have some JavaScript that you would like to ensure is more type sound
but you don't want to go through a process of adding type annotations
everywhere.
-->
型を持っていたいがすべての場所に型をつけることをしたくない JavaScript があるかもしれません。

<!--
Deno supports using the TypeScript type checker to type check JavaScript. You
can mark any individual file by adding the check JavaScript pragma to the file:
-->
Deno TypeScript 型チェッカーに JavaScript を型チェックさせることをサポートします。ファイルに JavaScript プログマを追加することで、個々のファイルにマークすることができます:

```js
// @ts-check
```

<!--
This will cause the type checker to infer type information about the JavaScript
code and raise any issues as diagnostic issues.
-->
これにより型チェッカーは JavaScript コードの型情報を推定し、診断での問題をあげます。

<!--
These can be turned on for all JavaScript files in a program by providing a
configuration file with the check JS option enabled:
-->
これらは check JS オプションが有効にされた設定ファイルを提供することでプログラム内のすべての JavaScript ファイルに対して有効にすることができます。

```json
{
  "compilerOptions": {
    "checkJs": true
  }
}
```

<!-- And setting the `--config` option on the command line. -->
そして、`--config` オプションをコマンドラインでセットしてください。

<!-- ### Using JSDoc in JavaScript -->
### JavaScript での JSDoc の利用

<!--
If you are type checking JavaScript, or even importing JavaScript into
TypeScript you can use JSDoc in JavaScript to express more types information
than can just be inferred from the code itself. Deno supports this without any
additional configuration, you simply need to annotate the code in line with the
supported
[TypeScript JSDoc](https://www.typescriptlang.org/docs/handbook/jsdoc-supported-types.html).
For example to set the type of an array:
-->
JavaScript を型チェックしてたり、JavaScript を TypeScript にインポートしているとき、JavaScript 内で JSDoc を使うことで、コードから推測される型情報より多くの型情報を表現することができます。Deno は追加の設定無しで、これをサポートし、[TypeScript JSDoc](https://www.typescriptlang.org/docs/handbook/jsdoc-supported-types.html) でサポートされるアノテーションを追加するだけでいいです:

```js
/** @type {string[]} */
const a = [];
```

<!-- ### Skipping type checking -->
### 型チェックのスキップ

<!--
You might have TypeScript code that you are experimenting with, where the syntax
is valid but not fully type safe. You can always bypass type checking for a
whole program by passing the `--no-check`.
-->
構文は有効だけど完全に型安全ではない実験中の TypeScript コードがあるかもしれません。`--no-check` を渡すことでいつでもプログラム全てを型チェックをバイパスすることができます。

<!--
You can also skip whole files being type checked, including JavaScript if you
have check JS enabled, by using the no-check pragma:
-->
また、check JS を有効にしている場合には、チェックなしのプラグマを使用することで、JavaScript を含め、型チェックされているファイル全体をスキップすることもできます:

```js
// @ts-nocheck
```

<!-- ### Just renaming JS files to TS files -->
### JS ファイルを TS ファイルにリネーム

<!--
While this might work in some cases, it has some severe limits in Deno. This is
because Deno, by default, runs type checking in what is called _strict mode_.
This means a lot of unclear or ambiguous situations where are not caught in
non-strict mode will result in diagnostics being generated, and JavaScript is
nothing but unclear and ambiguous when it comes to types.
-->
うまく行くケースもあるかもしれませんが、Deno では厳しい成約があります。Deno はデフォルトで _strict mode_ と呼ばれる型チェックを実行しますからです。これは non-strict mode では起こらなかった多くの不明瞭な状況や曖昧な状況での診断が生成されます。JavaScript は型に関しては不明瞭で曖昧なものばかりです。