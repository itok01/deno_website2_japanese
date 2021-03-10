<!-- ## Overview of TypeScript in Deno -->
## Deno での TypeScript の概要

<!--
One of the benefits of Deno is that it treats TypeScript as a first class
language, just like JavaScript or Web Assembly, when running code in Deno. What
that means is you can run or import TypeScript without installing anything more
than the Deno CLI.
-->
Deno の魅力のひとつはコード実行時に TypeScript を JavaScript や Web Assembly のように第一級言語として扱うことです。これは Deno CLI 以外をインストールすることなく TypeScript を実行やインポートしたりすることができるとういうことです。

<!--
_But wait a minute, does Deno really run TypeScript?_ you might be asking
yourself. Well, depends on what you mean by run. One could argue that in a
browser you don't actually _run_ JavaScript either. The JavaScript engine in the
browser translates the JavaScript to a series of operation codes, which it then
executes in a sandbox. So it translates JavaScript to something close to
assembly. Even Web Assembly goes through a similar translation, in that Web
Assembly is architecture agnostic while it needs to be translated into the
machine specific operation codes needed for the particular platform architecture
it is running on. So when we say TypeScript is a first class language in Deno,
we mean that we try to make the user experience in authoring and running
TypeScript as easy and straightforward as JavaScript and Web Assembly.
-->
_でも、ちょっと待ってください、Deno は本当に TypeScript を実行しているのですか？_ と自問するかもしれません。実行が何を意味するかにもよりますが。ブラウザは実際にJavaScriptを _実行_ しているわけではないという議論もあるかもしれません。ブラウザ中の JavaScript エンジンは JavaScript を一連のオペレーションコードに変換し、サンドボックス内で実行します。つまりJavaScriptをアセンぷりに近いものに変換しています。Web Assembly でさえ同様の変換を経ています、Web Assembly はアーキテクチャに非依存ですが、動作する特定のプラットフォームアーキテクチャに必要なマシン固有のオペレーションコードに変換する必要があります。つまり、Deno で TypeScript が第一級言語であるということは、JavaScript や Web Assembly のように TypeScript のオーサリングや実行が簡単で直感的にできるようにしているということです。

<!--
Behind the scenes, we use a combination of technologies, in Rust and JavaScript,
to provide that experience.
-->
その裏では、そのような体験を提供するために、Rust と JavaScript の技術を組み合わせて使っています。

<!-- ### How does it work? -->
### どのように動きますか？

<!--
At a high level, Deno converts TypeScript (as well as TSX and JSX) into
JavaScript. It does this via a combination of the
[TypeScript compiler](https://github.com/microsoft/TypeScript), which we build
into Deno, and a Rust library called [swc](https://swc.rs/). When the code has
been type checked and transformed, it is stored in a cache, ready for the next
run without the need to convert it from its source to JavaScript again.
-->
高レベルでは、Deno は TypeScript (TSX や JSX も同様に) JavaScript に変換します。これは Deno に組み込まれている [TypeScript コンパイラ](https://github.com/microsoft/TypeScript) と、[swc](https://swc.rs/) と呼ばれる Rust ライブラリの組み合わせによって行われます。型チェックされ変換されると、コードはキャッシュに保存され、ソースから再び JavaScript に変換することなく次の実行に備えることができます。

<!-- You can see this cache location by running `deno info`: -->
キャッシュ場所は `deno info` を実行することで見ることができます:

```shell
> deno info
DENO_DIR location: "/path/to/cache/deno"
Remote modules cache: "/path/to/cache/deno/deps"
TypeScript compiler cache: "/path/to/cache/deno/gen"
```

<!--
If you were to look in that cache, you would see a directory structure that
mimics that source directory structure and individual `.js` and `.meta` files
(also potentially `.map` files). The `.js` file is the transformed source file
while the `.meta` file contains meta data we want to cache about the file, which
at the moment contains a _hash_ of the source module that helps us manage cache
invalidation. You might also see a `.buildinfo` file as well, which is a
TypeScript compiler incremental build information file, which we cache to help
speed up type checking.
-->
キャッシュを見ると、ソースディレクトリ構造を模倣したディレクトリ構造と個々の`.js` と `.meta` ファイル (潜在的に `.map` ファイルも) を見ることになります。`.js` ファイルは変換されたソースファイルであり、`.meta` ファイルはキャッシュしたいファイルのメタデータを含んでいて、これはキャッシュを個々に管理することを助けるソースモジュールの _ハッシュ_ が含まれています。`.buildinfo` ファイルも見ることがあるかもしれません。これはTypeScript コンパイラインクリメンタルビルド情報ファイルで、型チェックを高速化するためにキャッシュします。

<!-- ### Type Checking-->
### 型チェック

<!--
One of the main advantages of TypeScript is that you can make code more type
safe, so that what would be syntactically valid JavaScript becomes TypeScript
with warnings about being "unsafe".
-->
TypeScript の主な利点の一つはコードを寄り方安全にすることができることです。これにより、構造で気に有効な JavaScript が "安全でない" という警告をともなう TypeScript になります。

<!--
In Deno we handle TypeScript in two major ways. We can type check TypeScript,
the default, or you can opt into skipping that checking using the `--no-check`
flag. For example if you had a program you wanted to run, normally you would do
something like this:
-->
Deno では TypeScript を2つの主な方法で扱います。デフォルトでは TypeScript を型チェックすることができ、`--no-check` フラグを使用することで明示的にチェックをスキップすることができます。例えば、実行したいプログラムを持っているとき、通常はこのようにします:

```
deno run --allow-net my_server.ts
```

<!-- But if you wanted to skip the type checking, you would do something like this: -->
しかし、型チェックをスキップしたい場合、このようにします:

```
deno run --allow-net --no-check my_server.ts
```

<!--
Type checking can take a significant amount of time, especially if you are
working on a code base where you are making a lot of changes. We have tried to
optimise the type checking, but it still comes at a cost. If you just want to
hack at some code, or if you are working in an IDE which is type checking your
code as you author it, using `--no-check` can certainly speed up the process of
running TypeScript in Deno.
-->
型チェックにはかなり多くの時間がかかります。特に多くの変更をしたコードベースではかなり時間がかかります。私達は型チェックを最適化しようとしていますが、それでもコストがかかります。コードをハックしたいだけの場合や、コードを書く際に型チェックを行う IDE で作業している場合、`--no-check` を使うことで Deno で TypeScript の実行プロセスを確実に高速化することができます。

<!-- ### Determining the type of file -->
### ファイルの型の決定

<!--
Since Deno supports JavaScript, TypeScript, JSX, TSX modules, Deno has to make a
decision about how to treat each of these kinds of files. For local modules,
Deno makes this determination based fully on the extension. When the extension
is absent in a local file, it is assumed to be JavaScript.
-->
Deno は JavaScript、TypeScript、JSX、TSX モジュールをサポートしているため、それぞれのファイルをどのように扱うか Deno が判断する必要があります。ローカルモジュールの場合、Deno は拡張子を考慮して判断します。ローカルファイルに拡張子がない場合、JavaScript であると判断します。

<!--
For remote modules, the media type (mime-type) is used to determine the type of
the module, where the path of the module is used to help influence the file
type, when it is ambiguous what type of file it is.
-->
リモートモジュールの場合、メディアタイプ (mime-type) がモジュールの型を決定するために使われ、モジュールのパスはファイルの型がなにか曖昧な場合に、ファイル型に影響を与えるのに役立ちます。

<!--
For example, a `.d.ts` file and a `.ts` file have different semantics in
TypeScript as well as have different ways they need to be handled in Deno. While
we expect to convert a `.ts` file into JavaScript, a `.d.ts` file contains no
"runnable" code, and is simply describing types (often of "plain" JavaScript).
So when we fetch a remote module, the media type for a `.ts.` and `.d.ts` file
looks the same. So we look at the path, and if we see something that has a path
that ends with `.d.ts` we treat it as a type definition only file instead of
"runnable" TypeScript.
-->
例えば、`.d.ts` ファイルと `.ts` ファイルは、TypeScript では異なるセマンティックで、Deno では異なる方法で取り扱われます。`.ts` ファイルを JavaScript に変換することを期待しますが、`.d.ts` ファイルには "実行可能" なコードが含まれておらず、型を記述しているだけです (多くの場合 "plain" な JavaScript)。だから、リモートモジュールを取得するとき、`.ts` と `.d.ts` ファイルのメディアタイプは同じように見えます。そこで、パスを見て、`.d.ts` で終わるものは "実行可能" な TypeScript ではなく、型定義のみのファイルとして扱います。

<!-- #### Supported media types -->
#### サポートされるメディアタイプ

<!--
The following table provides a list of media types which Deno supports when
identifying the type of file of a remote module:
-->
次の表はリモートモジュールのファイルの型を決定する際の Deno がサポートするメディアタイプの表です。

| Media Type                 | How File is Handled                                         |
| -------------------------- | ----------------------------------------------------------- |
| `application/typescript`   | TypeScript (with path extension influence)                  |
| `text/typescript`          | TypeScript (with path extension influence)                  |
| `video/vnd.dlna.mpeg-tts`  | TypeScript (with path extension influence)                  |
| `video/mp2t`               | TypeScript (with path extension influence)                  |
| `application/x-typescript` | TypeScript (with path extension influence)                  |
| `application/javascript`   | JavaScript (with path extensions influence)                 |
| `text/javascript`          | JavaScript (with path extensions influence)                 |
| `application/ecmascript`   | JavaScript (with path extensions influence)                 |
| `text/ecmascript`          | JavaScript (with path extensions influence)                 |
| `application/x-javascript` | JavaScript (with path extensions influence)                 |
| `application/node`         | JavaScript (with path extensions influence)                 |
| `text/jsx`                 | JSX                                                         |
| `text/tsx`                 | TSX                                                         |
| `text/plain`               | Attempt to determine that path extension, otherwise unknown |
| `application/octet-stream` | Attempt to determine that path extension, otherwise unknown |

<!-- ### Strict by default -->
### デフォルトで厳格

<!--
Deno type checks TypeScript in _strict_ mode by default, and the TypeScript core
team recommends _strict_ mode as a sensible default. This mode generally enables
features of TypeScript that probably should have been there from the start, but
as TypeScript continued to evolve, would be breaking changes for existing code.
-->
Deno はデフォルトで TypeScript を _strict_ モードで型チェックします。TypeScript コアチームは _strict_ モードを適切なデフォルトとして推奨しています。このモードは一般的には初めからあったはずの TypeScript の機能を有効にしますが、TypeScript が進化し続けるにつれ、既存のコードに対して破壊的な変更になるかもしれません。

<!-- ### Mixing JavaScript and TypeScript -->
### JavaScript と TypeScript の混合

<!--
By default, Deno does not type check JavaScript. This can be changed, and is
discussed further in [Configuring TypeScript in Deno](./configuration.md). Deno
does support JavaScript importing TypeScript and TypeScript import JavaScript,
in complex scenarios.
-->
デフォルトでは、Deno は JavaScript を型チェックしません。これは変更可能で、[Configuring TypeScript in Deno](./configuration.md) で詳しく説明しています。Deno は複雑なシナリオでは、TypeScript をインポートする JavaScript と JavaScript をインポートする TypeScript をサポートします。

<!--
An important note though is that when type checking TypeScript, by default Deno
will "read" all the JavaScript in order to be able to evaluate how it might have
an impact on the TypeScript types. The type checker will do the best it can to
figure out what the types are of the JavaScript you import into TypeScript,
including reading any JSDoc comments. Details of this are discussed in detail in
the [Types and type declarations](./types.md) section.
-->
しかし、重要な注意点として、TypeScript の型チェックを行う際、デフォルトでは Deno は TypeScript の型にどのような影響を与えるかを評価できるようにすべての JavaScript の "読み込み" をします。型チェッカーは、TypeScript にインポートした JavaScript が何の型であるかを把握するために、JSDoc のコメントを読み込んだりして、最善のことをしてくれます。詳しくは [Types and type declarations](./types.md) セクションを参照してください。

<!-- ### Diagnostics are terminal -->
### 診断はターミナル

<!--
While `tsc` by default will still emit JavaScript when run while encountering
diagnostic (type checking) issues, Deno currently treats them as terminal. It
will halt on these warnings, not cache any of the emitted files, and exit the
process.
-->
`tsc` はデフォルトで  診断 (型チェック) の問題が発生しているときに実行しても JavaScript を出力しますが、現在 Deno はターミナルとして扱います。これらの警告が出た場合は停止し、出力されたファイルを何もキャッシュせず、プロセスを終了します。

<!--
In order to avoid this, you will either need to resolve the issue, utilise the
`// @ts-ignore` or `// @ts-expect-error` pragmas, or utilise `--no-check` to
bypass type checking all together.
-->
これを避けるため、問題を解決するか、`// @ts-ignore` か `// @ts-expect-error` を使うか、`--no-check` を使って型チェックを完全に回避する必要があります。

<!-- ### Type resolution -->
### 型解決

<!--
One of the core design principles of Deno is to avoid "magical" resolution, and
this applies to type resolution as well. If you want to utilise JavaScript that
has type definitions (e.g. a `.d.ts` file), you have to explicitly tell Deno
about this. The details of how this is accomplished are covered in the
[Types and type declarations](./types.md) section.
-->
Deno の基本設定の一つに "魔法のような" 解決を避けることがあり、これは型解決にも当てはまります。型定義を持つ JavaScript (例、`.d.ts` ファイル) を利用したい場合、Deno にそれを利用したいことを明示的に伝える必要があります。この方法と詳細は [型と型宣言](./types.md) セクションを参照してください。
