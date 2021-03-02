<!-- ## Runtime compiler APIs -->
## ランタイムコンパイラーAPI

<!--
> ⚠️ The runtime compiler API is unstable (and requires the `--unstable` flag to
> be used to enable it).
-->
> ⚠️ ランタイムコンパイラーAPIは不安定です (有効化するためには `--unstable` フラグが必要です)。

<!--
The runtime compiler API allows access to the internals of Deno to be able to
type check, transpile and bundle JavaScript and TypeScript. As of Deno 1.7,
several disparate APIs we consolidated into a single API, `Deno.emit()`.
-->
ランタイムコンパイラーAPIは Deno 内部へのアクセスを許可し、JavaScript と TypeScript の型チェック、トランスパイルとバンドルを行うことができます。Deno 1.7 ではいくつかのAPIが統合され `Deno.emit()` という一つのAPIになりました。

### Deno.emit()

<!-- The API is defined in the `Deno` namespace as: -->
この API は `Deno` 名前空間内で以下のように定義されます:

```ts
function emit(
  rootSpecifier: string | URL,
  options?: EmitOptions,
): Promise<EmitResult>;
```

<!-- The emit options are defined in the `Deno` namespace as: -->
エミットオプションは `Deno` 名前空間内で以下のように定義されています:

```ts
interface EmitOptions {
  /** Indicate that the source code should be emitted to a single file
   * JavaScript bundle that is an ES module (`"esm"`). */
  bundle?: "esm";
  /** If `true` then the sources will be typed checked, returning any
   * diagnostic errors in the result.  If `false` type checking will be
   * skipped.  Defaults to `true`.
   * 
   * *Note* by default, only TypeScript will be type checked, just like on
   * the command line.  Use the `compilerOptions` options of `checkJs` to
   * enable type checking of JavaScript. */
  check?: boolean;
  /** A set of options that are aligned to TypeScript compiler options that
   * are supported by Deno. */
  compilerOptions?: CompilerOptions;
  /** An [import-map](https://deno.land/manual/linking_to_external_code/import_maps#import-maps)
   * which will be applied to the imports. */
  importMap?: ImportMap;
  /** An absolute path to an [import-map](https://deno.land/manual/linking_to_external_code/import_maps#import-maps).
   * Required to be specified if an `importMap` is specified to be able to
   * determine resolution of relative paths. If a `importMap` is not
   * specified, then it will assumed the file path points to an import map on
   * disk and will be attempted to be loaded based on current runtime
   * permissions.
   */
  importMapPath?: string;
  /** A record of sources to use when doing the emit.  If provided, Deno will
   * use these sources instead of trying to resolve the modules externally. */
  sources?: Record<string, string>;
}
```

<!-- The emit result is defined in the `Deno` namespace as: -->
エミット結果は `Deno` 名前空間内で以下のように定義されています:

```ts
interface EmitResult {
  /** Diagnostic messages returned from the type checker (`tsc`). */
  diagnostics: Diagnostic[];
  /** Any emitted files.  If bundled, then the JavaScript will have the
   * key of `deno:///bundle.js` with an optional map (based on
   * `compilerOptions`) in `deno:///bundle.js.map`. */
  files: Record<string, string>;
  /** An optional array of any compiler options that were ignored by Deno. */
  ignoredOptions?: string[];
  /** An array of internal statistics related to the emit, for diagnostic
   * purposes. */
  stats: Array<[string, number]>;
}
```

<!--
The API is designed to support several use cases, which are described in the
sections below.
-->
API はいくつかのユースケースをサポートするように設計されていて、以下のセクションで説明されています。

<!-- ### Using external sources -->
### 外部ソースの利用

<!--
Using external sources, both local and remote, `Deno.emit()` can behave like
`deno cache` does on the command line, resolving those external dependencies,
type checking those dependencies, and providing an emitted output.
-->
ローカルとリモートで外部ソースを利用すると、`Deno.emit()` はコマンドラインで `deno cache` のように動作することができ、外部依存の解決、型チェックそして、出力を提供します。

<!--
By default, `Deno.emit()` will utilise external resources. The _rootSpecifier_
supplied as the first argument will determine what module will be used as the
root. The root module is similar to what you would provide on the command line.
-->
デフォルトでは、`Deno.emit()` 外部リソースを利用します。第一引数に与えられた _rootSpecifier_ はルートにどのモジュールが使われるかを決定します。ルートモジュールはコマンドラインで指定するものと似ています。

<!-- For example if you did: -->
例えば、以下を行った場合:

```
> deno run mod.ts
```

<!-- You could do something similar with `Deno.emit()`: -->
`Deno.emit()` でも同じようにすることができます:

```ts
try {
  const { files } = await Deno.emit("mod.ts");
  for (const [fileName, text] of Object.entries(files)) {
    console.log(`emitted ${fileName} with a length of ${text.length}`);
  }
} catch (e) {
  // something went wrong, inspect `e` to determine
}
```

<!--
`Deno.emit()` will use the same on disk cache for remote modules that the
standard CLI does, and it inherits the permissions and cache options of the
process that executes it.
-->
`Deno.emit()` は標準の CLI が行うようにリモートモジュールにディスクキャッシュを使い、パーミッションの継承とキャッシュオプションはプロセスが実行されたときのものを使います。

<!--
If the _rootSpecifier_ is a relative path, then the current working directory of
the Deno process will be used to resolve the specifier. (Not relative to the
current module!)
-->
もし、_rootSpecifier_ が相対パスなら、Deno プロセスのカレントディレクトリが解決に使われます。(カレントモジュールへの相対パスではありません!)

<!--
The _rootSpecifier_ can be a string file path, a string URL, or a URL.
`Deno.emit()` supports the same protocols for URLs that Deno supports, which are
currently `file`, `http`, `https`, and `data`.
-->
_rootSpecifier_ は文字列ファイルパス、文字列URLもしくはURLです。`Deno.emit()` は Deno がサポートする URL と同じプロトコルをサポートます、現在では `file`、`http`、`https` と `data` です。

<!-- ### Providing sources -->
### ソースの提供

<!--
Instead of resolving modules externally, you can provide `Deno.emit()` with the
sources directly. This is especially useful for a server to be able to provide
_on demand_ compiling of code supplied by a user, where the Deno process has
collected all the code it wants to emit.
-->
外部でモジュールを解決する代わりに、ソースディレクトリで `Deno.emit()` を指定することができます。これは、ユーザーから提供されたコードを _オンデマンド_ コンパイルできるサーバーに有効です。

<!--
The sources are passed in the _sources_ property of the `Deno.emit()` _options_
argument:
-->
ソースは `Deno.emit()` _options_ 引数の _sources_ プロパティに渡されます。

```ts
const { files } = await Deno.emit("/mod.ts", {
  sources: {
    "/mod.ts": `import * as a from "./a.ts";\nconsole.log(a);\n`,
    "/a.ts": `export const a: Record<string, string> = {};\n`,
  },
});
```

<!--
When sources are provided, Deno will no longer look externally and will try to
resolve all modules from within the map of sources provided, though the module
resolution follow the same rules as if the modules were external. For example
all module specifiers need their full filename. Also, because there are no media
types, if you are providing remote URLs in the sources, the path should end with
the appropriate extension, so that Deno can determine how to handle the file.
-->
ソースが提供されたとき、Deno は外部を検索せず、ソースが提供するマップ内ですべてのモジュールを解決しようとしますが、モジュール解決はモジュールが外部にある場合と同じルールに従います。例えば、すべてのモジュール指定子は完全なファイル名が必要です。また、メディアタイプがないので、ソース内でリモート URL を指定した場合、Deno がファイルの取り扱い方を決定するため、パスは適切な拡張子で終わるべきです。

<!-- ### Type checking and emitting -->
### 型チェックと出力

<!--
By default, `Deno.emit()` will type check any TypeScript (and TSX) it
encounters, just like on the command line. It will also attempt to transpile
JSX, but will leave JavaScript "alone". This behavior can be changed by changing
the compiler options. For example if you wanted Deno to type check your
JavaScript as well, you could set the _checkJs_ option to `true` in the compiler
options:
-->
デフォルトでは、`Deno.emit()` はコマンドラインと同様に TypeScript (と TSX) に型チェックを行います。JSXをトランスパイルをしようとしますが、JavaScript は "単独" のままにします。この動作はコンパイラオプションを変更することで変更することができます。例えば、Deno に JavaScript も型チェックをしてもらいたい場合はコンパイラオプションで _checkJs_ オプションを `true` にすることができます:

```ts
const { files, diagnostics } = await Deno.emit("./mod.js", {
  compilerOptions: {
    checkJs: true,
  },
});
```

<!--
The `Deno.emit()` result provides any diagnostic messages about the code
supplied. On the command line, any diagnostic messages get logged to stderr and
the Deno process terminates, but with `Deno.emit()` they are returned to the
caller.
-->
`Deno.emit()` の結果は提供されたコードのすべての診断メッセージを提供します。コマンドラインでは診断メッセージは stderr に記録され Deno プロセスは終了しますが、`Deno.emit()` では呼び出し元に返されます。

<!--
Typically you will want to check if there are any diagnostics and handle them
appropriately. You can introspect the diagnostics individually, but there is a
handy formatting function available to make it easier to potentially log the
diagnostics to the console for the user called `Deno.formatDiagnostics()`:
-->
通常、診断メッセージがあるかどうかを確認して、それらを適切に処理したいでしょう。診断を個別に調べることもできますが、`Deno.formatDiagnostics()` と呼ばれるコンソールに簡単に診断を記録する便利なフォーマット関数があります:

```ts
const { files, diagnostics } = await Deno.emit("./mod.ts");
if (diagnostics.length) {
  // there is something that impacted the emit
  console.warn(Deno.formatDiagnostics(diagnostics));
}
```

<!-- ### Bundling -->
### バンドル

<!--
`Deno.emit()` is also capable of providing output similar to `deno bundle` on
the command line. This is enabled by setting the _bundle_ option to `"esm"`.
(Currently Deno only supports bundling as a single file ES module, but there are
plans to add support for an IIFE bundle format as well):
-->
`Deno.emit()` はコマンドラインの `deno bundle` と似たような出力を提供することもできます。これは _bundle_ オプションを `"esm"` に設定することで有効化できます。(現在では Deno は単一ファイル ES モジュールとしてバンドルすることしかサポートしていませんが、IIFE バンドルフォーマットもサポートする計画があります。)

```ts
const { files, diagnostics } = await Deno.emit("./mod.ts", {
  bundle: "esm",
});
```

<!--
The _files_ of the result will contain a single key named `deno:///bundle.js` of
which the value with be the resulting bundle.
-->
結果の _files_ は `deno:///bundle.js` という単一のキーを含まれ、その値が結果のバンドルとなります。

<!--
> ⚠️ Just like with `deno bundle`, the bundle will not include things like
> dynamic imports or worker scripts, and those would be expected to be resolved
> and available when the code is run.
-->
> ⚠️ `deno bundle` と同様に、バンドルは動的インポートやワーカースクリプトを含まず、これらは解決されコードが実行されるときに利用可能になります。

<!-- ### Import maps -->

<!--
`Deno.emit()` supports import maps as well, just like on the command line. This
is a really powerful feature that can be used even more effectively to emit and
bundle code.
-->
`Deno.emit()` はコマンドラインと同じようにインポートマップもサポートします。これは本当に強力な機能で、コードを笑みっとしたりバンドルしたりするときにより効率的になります。

<!--
Because of the way import maps work, when using with `Deno.emit()` you also have
to supply an absolute URL for the import map. This allows Deno to resolve any
relative URLs specified in the import map. This needs to be supplied even if the
import map doesn't contain any relative URLs. The URL does not need to really
exist, it is just feed to the API.
-->
インポートマップの仕組み上、`Deno.emit()` を使うときにインポートパスへの絶対パスがを渡す必要があります。これは Deno にインポートマップ中のすべての URL 指定子を解決させます。これはインポートマップが相対パスを一切含んでいない場合でも必要です。URL は実際に存在する必要はありません、API へのフィードに過ぎません。

<!--
An example might be that I want to use a bare specifier to load a special
version of _lodash_ I am using with my project. I could do the following:
-->
もし自分のプロジェクトで特定のバージョンの _lodash_ をロードするための素の指定子を使いたい場合、以下のようにすることができます:

```ts
const { files } = await Deno.emit("mod.ts", {
  bundle: "esm",
  importMap: {
    imports: {
      "lodash": "https://deno.land/x/lodash",
    },
  },
  importMapPath: "file:///import-map.json",
});
```

<!--
> ⚠️ If you are not bundling your code, the emitted code specifiers do not get
> rewritten, that means that whatever process will consume the code, Deno or a
> browser for example, would need to support import maps and have that map
> available at runtime.
-->
> ⚠️ もしコードをバンドルしない場合、笑みっとされたコード指定子は書き換えられません。つまり、Deno やブラウザなどコードを使うプロセスが何であれインポートマップをサポートし、そのマップを実行時に利用できるようにする必要があるということです。

<!-- ### Skip type checking/transpiling only -->
### 型チェックをスキップし、トランスパイルのみ行う

<!--
`Deno.emit()` supports skipping type checking similar to the `--no-check` flag
on the command line. This is accomplished by setting the _check_ property to
`false`:
-->
`Deno.emit()` はコマンドラインでの `--no-check` フラグと同様に型チェックのスキップをサポートします。これは _check_ プロパティを `false` へ設定することで実現されます:

```ts
const { files } = await Deno.emit("./mod.ts", {
  check: false,
});
```

<!--
Setting _check_ to `false` will instruct Deno to not utilise the TypeScript
compiler to type check the code and emit it, instead only transpiling the code
from within Deno. This can be significantly quicker than doing the full type
checking.
-->
_check_ を `false` に設定することで Deno は TypeScript コンパイラーに型チェックをしないでコードを出力させるように、代わりに Deno 内でコードをトランスパイルさせるだけにします。これは完全な型チェックを行うより劇的に高速です。

<!-- ### Compiler options -->
### コンパイラオプション

<!--
`Deno.emit()` support quite a few compiler options that can impact how code is
type checked and emitted. They are similar to the options supported by a
`tsconfig.json` in the `compilerOptions` section, but there are several options
that are not supported. This is because they are either meaningless in Deno our
would cause Deno to not be able to work properly. The defaults for `Deno.emit()`
are the same defaults that are on the command line. The options are
[documented here](https://doc.deno.land/builtin/unstable#Deno.CompilerOptions)
along with their default values and are built into the Deno types.
-->
`Deno.emit()` はコードがどう型チェックされ出力されるかに影響する数少ないコンパイラオプションをサポートします。それらは `compilerOptions` セクション中の `tsconfig.json` でサポートされるオプションと同じようなオプションがありますが、いくつかのサポートされないオプションがあります。これは Deno では意味をなさないか Deno の正常な動作を妨げるからです。`Deno.emmit()` のデフォルトはコマンドラインでのデフォルトと同じです。オプションはデフォルト値と一緒に [ここに記載](https://doc.deno.land/builtin/unstable#Deno.CompilerOptions) されており、Deno 型に組み込まれています。

<!--
If you are type checking your code, the compiler options will be type checked
for you, but if for some reason you are either dynamically providing the
compiler options or are not type checking, then the result of `Deno.emit()` will
provide you with an array of _ignoredOptions_ if there are any.
-->
コードの型チェックしている場合は、コンパイラオプションは型チェックされますが、何らかの理由でコンパイラオプションの動的な提供か型チェックをしていないと、`Deno.emit()` の結果に _ignoredOptions_ があれば、その配列が提供されます。

<!--
> ⚠️ we have only tried to disable/remove options that we know won't work, that
> does not mean we extensively test all options in all configurations under
> `Deno.emit()`. You may find that some behaviors do not match what you can get
> from `tsc` or are otherwise incompatible. If you do find something that
> doesn't work, please do feel free to raise an issue.
-->
> ⚠️ 私達は動かないと知っているオプションのみ利用不可/削除にします。つまり、`Deno.emit()` 下のすべての設定のすべてのオプションをテストしているわけではありません。いくつかの動作は `tsc` で得られるものと異なっていたり。非互換かもしれません。もし、なにか動かないものを発見したら、遠慮なく issue を上げてください。
