<!-- ## FAQs about TypeScript in Deno -->
## Deno での TypeScript についてよくある質問とその解凍

<!-- ### Can I use TypeScript not written for Deno? -->
### Deno 向けに書かれていない TypeScript を使用できますか？

<!--
Maybe. That is the best answer, we are afraid. For lots of reasons, Deno has
chosen to have fully qualified module specifiers. In part this is because it
treats TypeScript as a first class language. Also, Deno uses explicit module
resolution, with no _magic_. This is effectively the same way browsers
themselves work, though they don't obviously support TypeScript directly. If the
TypeScript modules use imports that don't have these design decisions in mind,
they may not work under Deno.
-->
多分使用できます。これがベストアンサーです。多くの理由から、Deno は完全に装飾されたモジュール指定師を持つことを選択しました。これは TypeScript を第一級言語として扱うからです。また、Deno は明示的な _魔法_ を使わず、モジュール解決を使用します。これはブラウザが直接 TypeScript をサポートしているわけではないにしても、事実上ブラウザのの動作と同じです。TypeScript モジュールがこれらの設計を考慮していないインポートを使用している場合、Deno では動作しないかもしれません。

<!--
Also, in recent versions of Deno (starting with 1.5), we have started to use a
Rust library to do transformations of TypeScript to JavaScript in certain
scenarios. Because of this, there are certain situations in TypeScript where
type information is required, and therefore those are not supported under Deno.
If you are using `tsc` as stand-alone, the setting to use is `"isolatedModules"`
and setting it to `true` to help ensure that your code can be properly handled
by Deno.
-->
最近のバージョンの Deno (1.5 から始まった) では、特定のシナリオで TypeScript を JavaScript に変換する Rust ライブラリを使用し始めました。このため、TypeScript の中には型情報が必要な状況があり、Deno ではサポートされていません。スタンドアローンで `tsc` を使用している場合、`"isolatedModules"` を使用し `true` に設定することで、Deno でコードを適切に処理できるようになります。

<!--
One of the ways to deal with the extension and the lack of _magical_ resolution
is to use [import maps](../linking_to_external_code/import_maps.md) which would
allow you to specify "packages" of bare specifiers which then Deno could resolve
and load.
-->
拡張子と _魔法のような_ 解決の欠如を扱う方法の一つは [import maps](../linking_to_external_code/import_maps.md) を使うことです。これを使えば、素の指定子の "パッケージ" を指定して、それをDeno が解決して読み込むことができます。

<!-- ### What version(s) of TypeScript does Deno support? -->
### Deno はどのバージョンの TypeScript をサポートしますか？

<!--
Deno is built with a specific version of TypeScript. To find out what this is,
type the following on the command line:
-->
Deno は特定のバージョンの TypeScript と一緒にビルドされます。これが何かを知るためには次をコマンドラインに入力してください:

```shell
> deno --version
```

<!--
The TypeScript version (along with the version of Deno and v8) will be printed.
Deno tries to keep up to date with general releases of TypeScript, providing
them in the next patch or minor release of Deno.
-->
TypeScript バージョン (Deno と V8 のバージョンと一緒に) 表示されます。Deno TypeScript のリリースを追従するようにしており、Deno のパッチやマイナーリリースで提供しています。

<!-- ### There was a breaking change in the version of TypeScript that Deno uses, why did you break my program? -->
### Deno が使っている TypeScript のバージョンでは破壊的な変更があります。なぜ私のプログラムを壊すのですか？

<!--
We do not consider changes in behavior or breaking changes in TypeScript
releases as breaking changes for Deno. TypeScript is a generally mature language
and breaking changes in TypeScript are almost always "good things" making code
more sound, and it is best that we all keep our code sound. If there is a
blocking change in the version of TypeScript and it isn't suitable to use an
older release of Deno until the problem can be resolved, then you should be able
to use `--no-check` to skip type checking all together.
-->
私達は TypeScript のリリースにおける動作の変更や破壊的な変更を Deno の変更点としては考慮していません。TypeScript は一般的に成熟した言語であり、破壊的な変更はコードをより健全なものにする "良いこと" であり、コードを健全に保つことが最善だからです。もし TypeScript のバージョンにブロッキングの変更があり、問題が解決するまで古いリリースのDenoを使うことが適切でない場合、`--no-check` を使ってすべての型チェックをスキップすることができるはずです。

<!--
In addition you can utilize `@ts-ignore` to _ignore_ a specific error in code
that you control. You can also replace whole dependencies, using
[import maps](../linking_to_external_code/import_maps), for situations where a
dependency of a dependency isn't being maintained or has some sort of breaking
change you want to bypass while waiting for it to be updated.
-->
更に、自分が管理しているコードの特定のエラーを _無視_ するために、`@ts-ignore` を利用することができます。また、[import maps](../linking_to_external_code/import_maps) を利用してすべての依存関係を入れ替えることができます。
依存関係の依存関係がメンテナンスされていない場合や、破壊的な変更がある場合、更新を待っている間にバイパスすることもできます。

<!-- ### Why are you forcing me to use isolated modules, why can't I use const enums with Deno, why do I need to do export type? -->
### なぜ isolated モジュールを使用することを強制するのですか、なぜ Deno では const enums を使うことができないのですか、なぜ型をエクスポートする必要があるのですか？

<!--
As of Deno 1.5 we defaulted to _isolatedModules_ to `true` and in Deno 1.6 we
removed the options to set it back to `false` via a configuration file. The
_isolatedModules_ option forces the TypeScript compiler to check and emit
TypeScript as if each module would stand on its own. TypeScript has a few _type
directed emits_ in the language at the moment. While not allowing type directed
emits into the language was a design goal for TypeScript, it has happened
anyways. This means that the TypeScript compiler needs to understand the
erasable types in the code to determine what to emit, which when you are trying
to make a fully erasable type system on top of JavaScript, that becomes a
problem.
-->
Deno 1.5 では _isolatedModules_ を `true` に設定していて、Deno 1.6 では設定ファイルを使ってそれを `false` に戻すオプションを削除しました。 _isolatedModules_ オプションは TypeScript コンパイラにそれぞれのモジュールが独立しているかのように TypeScript をチェックして出力することを強制します。現在は、TypeScript はいくつかの _型指定の出力_ があります。TypeScript の設計上の目標である型指定出力を許可しないようにしていますが、これはどのみち起こります。つまり、TypeScript コンパイラは何を出力するか決定するために、消去可能な型を理解する必要があります。

<!--
When people started transpiling TypeScript without `tsc`, these type directed
emits became a problem, since the likes of Babel simply try to erase the types
without needing to understand the types to direct the emit. In the internals of
Deno we have started to use a Rust based emitter which allows us to optionally
skip type checking and generates the bundles for things like `deno bundle`. Like
all transpilers, it doesn't care about the types, it just tries to erase them.
This means in certain situations we cannot support those type directed emits.
-->
`tsc` を使わず TypeScript をトランスパイルするようになったとき、このような型指定エミットが問題になりました。Babel のようなものは笑みっとするとき型を理解する必要がないため単に型を削除しようとします。Deno の内部では Rust ベースのエミッターを使い始めました。これはオプションで型チェックをスキップしたり `deno bundle` などのバンドルを作成したりできます。他のトランスパイラーと同様に型を気にせず単に削除します。これは、ある状況では型指定エミッタをサポートできないことを意味します。

<!--
So instead of trying to get every user to understand when and how we could
support the type directed emits, we made the decision to disable the use of them
by forcing the _isolatedModules_ option to `true`. This means that even when we
are using the TypeScript compiler to emit the code, it will follow the same
"rules" that the Rust based emitter follows.
-->
そこで、型指定エミッターをいつどのようにサポートするのかをすべてのユーザに理解してもらおうとする代わりに、_isolatedModules_ オプションを `true` に強制することで、エミッターを使用しないようにすることを決定しました。これは、TypeScript コンパイラを使ってコードをエミットする場合でも、Rust ベースのエミッタと同じ "ルール" に従うことを意味します。

<!--
This means that certain language features are not supportable. Those features
are:
-->
ある言語機能はサポートされていません。それらの機能は:

- Re-exporting of types is ambigious and requires to know if the source module
  is exporting runtime code or just type information. Therefore, it is
  recommended that you use `import type` and `export type` for type only imports
  and exports. This will help ensure that when the code is emitted, that all the
  types are erased.
- `const enum` is not supported. `const enum`s require type information to
  direct the emit, as `const enum`s get written out as hard coded values.
  Especially when `const enum`s get exported, they are a type system only
  construct.
- `export =` and `import =` are legacy TypeScript syntax which we do not
  support.
- Only `declare namespace` is support. Runtime `namespace` is legacy TypeScript
  syntax that is not supported.

<!-- ### Why don't you support language service plugins or transformer plugins? -->
### 言語サービスのプラグインやトランスフォーマープラグインに対応していないのはなぜですか？

<!--
While `tsc` supports language service plugins, Deno does not. Deno does not
always use the built in TypeScript compiler to do what it does, and the
complexity of adding support for a language service plugin is not feasible.
TypeScript does not support emitter plugins, but there are a few community
projects which _hack_ emitter plugins into TypeScript. First, we wouldn't want
to support something that TypeScript doesn't support, plus we do not always use
the TypeScript compiler for the emit, which would mean we would need to ensure
we supported it in all modes, and the other emitter is written in Rust, meaning
that any emitter plugin for TypeScript wouldn't be available for the Rust
emitter.
-->
`tsc` は言語サービスのプラグインをサポートしていますが、Deno はサポートしていません。Deno は常に内蔵の TypeScript コンパイラを使用しています。言語サービスプラグインのサポートを追加することの複雑さは実現可能ではありません。TypeScript はエミッタプラグインをサポートしていませんが、いくつかのコミュニティのエミッタプラグインを TypeScript に _ハック_ するプロジェクトがあります。第一に、TypeScript がサポートしていないものをサポートしたくないこと、そして、エミットには常に TypeScript コンパイラを使用しているわけではないので、すべてのモードでサポートしていることを確認する必要があること、もう一つのエミッターは Rust で書かれているので、TypeScript 用のエミッタープラグインは Rust エミッターでは利用できないことです。

<!--
The TypeScript in Deno isn't intended to be a fully flexible TypeScript
compiler. Its main purpose is to ensure that TypeScript and JavaScript can run
under Deno. The secondary ability to do TypeScript and JavaScript emitting via
the runtime API `Deno.emit()` is intended to be simple and straight forward and
support a certain set of use cases.
-->
Deno の TypeScript は、完全に柔軟な TypeScript コンパイラであることを意図したものではありません。主な目的は、Deno で TypeScript と JavaScript が動作することを保証することです。ランタイム API `Deno.emit()` を介して TypeScript や JavaScript のエミッタ機能を提供することは、シンプルでわかりやすく、特定のユースケースをサポートすることを目的としています。
