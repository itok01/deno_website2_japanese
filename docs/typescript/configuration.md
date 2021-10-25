<!-- ## Configuring TypeScript in Deno -->
## Deno での TypeScript の設定

<!--
TypeScript comes with a load of different options that can be configured, but
Deno strives to make it easy to use TypeScript with Deno. Lots of different
options frustrates that goal. To make things easier, Deno configures TypeScript
to "just work" and shouldn't require additional configuration.
-->
TypeScriptには設定可能なオプションが用意されていますが、Deno は Deno で TypeScript を簡単に使えるように努力しています。多くのオプションがあるとその目的は難しくなります。これを簡単にするために Deno は TypeScript を "ただ動く" ように設定し、追加の設定は必要ないようにしています。

<!--
That being said, Deno does support using a TypeScript configuration file, though
like the rest of Deno, the detection and use of use of a configuration file is
not automatic. To use a TypeScript configuration file with Deno, you have to
provide a path on the command line. For example:
-->
Deno は TypeScript の設定ファイルをサポートしていますが、他と違い、設定ファイルの検出を使用は自動ではありません。Deno で TypeScript 設定ファイルを使うには、コマンドラインでパスを指定する必要があります。例:

```
> deno run --config ./tsconfig.json main.ts
```

<!--
> ⚠️ Do consider though that if you are creating libraries that require a
> configuration file, all of the consumers of your modules will require that
> configuration file too if you distribute your modules as TypeScript. In
> addition, there could be settings you do in the configuration file that make
> other TypeScript modules incompatible. Honestly it is best to use the Deno
> defaults and to think long and hard about using a configuration file.
-->
> ⚠️ 設定ファイルが必要なライブラリ作成をし、TypeScript として配布している場合、あなたのモジュールのすべての利用者もその設定ファイルを必要とすることに注意してください。また、設定ファイルでの設定が他の TypeScript モジュールと非互換な設定の可能性もあります。正直なところ、Deno のデフォルトを使い、設定ファイルの使用について熟考することが最善です。

<!-- ### How Deno uses a configuration file -->
### Deno が設定ファイルをどのように使っているか

<!--
Deno does not process a TypeScript configuration file like `tsc` does, as there
are lots of parts of a TypeScript configuration file that are meaningless in a
Deno context or would cause Deno to not function properly if they were applied.
-->
Deno で意味がなかったり、適応すると Deno が正常に動かない設定ファイルが多くあることから、Deno は `tsc` のように TypeScript 設定ファイルを実行しません。

<!--
Deno only looks at the `compilerOptions` section of a configuration file, and
even then it only considers certain compiler options, with the rest being
ignored.
-->
Deno は設定ファイルの `compilerOptions` セクションしか見ず、特定のコンパイラオプションのみ考慮し、ほかは無視します。

<!--
Here is a table of compiler options that can be changed, their default in Deno
and any other notes about that option:
-->
以下、変更可能なコンパイラオプション、Deno でのデフォルトそして他の注意点の表:

| Option                           | Default                 | Notes                                                                                                                                                                                                                                                                            |
| -------------------------------- | ----------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `allowJs`                        | `true`                  | This almost never needs to be changed                                                                                                                                                                                                                                            |
| `allowUnreachableCode`           | `false`                 |                                                                                                                                                                                                                                                                                  |
| `allowUnusedLabels`              | `false`                 |                                                                                                                                                                                                                                                                                  |
| `checkJs`                        | `false`                 | If `true` causes TypeScript to type check JavaScript                                                                                                                                                                                                                             |
| `experimentalDecorators`         | `true`                  | We enable these by default as they are already opt-in in the code and when we skip type checking, the Rust based emitter has them on by default. We strongly discourage the use of legacy decorators, as they are incompatible with the future decorators standard in JavaScript |
| `jsx`                            | `"react"`               |                                                                                                                                                                                                                                                                                  |
| `jsxFactory`                     | `"React.createElement"` |                                                                                                                                                                                                                                                                                  |
| `jsxFragmentFactory`             | `"React.Fragment"`      |                                                                                                                                                                                                                                                                                  |
| `keyofStringsOnly`              | `false`                 |                                                                                                                                                                                                                                                                                  |
| `lib`                            | `[ "deno.window" ]`     | The default for this varies based on other settings in Deno. If it is supplied, it overrides the default. See below for more information.                                                                                                                                        |
| `noFallthroughCasesInSwitch`     | `false`                 |                                                                                                                                                                                                                                                                                  |
| `noImplicitAny`                  | `true`                  |                                                                                                                                                                                                                                                                                  |
| `noImplicitReturns`              | `false`                 |                                                                                                                                                                                                                                                                                  |
| `noImplicitThis`                 | `true`                  |                                                                                                                                                                                                                                                                                  |
| `noImplicitUseStrict`            | `true`                  |                                                                                                                                                                                                                                                                                  |
| `noStrictGenericChecks`          | `false`                 |                                                                                                                                                                                                                                                                                  |
| `noUnusedLocals`                 | `false`                 |                                                                                                                                                                                                                                                                                  |
| `noUnusedParameters`             | `false`                 |                                                                                                                                                                                                                                                                                  |
| `reactNamespace`                 | `React`                 |                                                                                                                                                                                                                                                                                  |
| `strict`                         | `true`                  |                                                                                                                                                                                                                                                                                  |
| `strictBindApply`                | `true`                  |                                                                                                                                                                                                                                                                                  |
| `strictFunctionTypes`            | `true`                  |                                                                                                                                                                                                                                                                                  |
| `strictPropertyInitialization`   | `true`                  |                                                                                                                                                                                                                                                                                  |
| `strictNullChecks`               | `true`                  |                                                                                                                                                                                                                                                                                  |
| `suppressExcessPropertyErrors`   | `false`                 |                                                                                                                                                                                                                                                                                  |
| `suppressImplicitAnyIndexErrors` | `false`                 |                                                                                                                                                                                                                                                                                  |

<!--
For a full list of compiler options and how they affect TypeScript, please refer
to the
[TypeScript Handbook](https://www.typescriptlang.org/docs/handbook/compiler-options.html)
-->
コンパイラオプションのすべてのリストとそれらが TypeScript にどのように影響するかは [TypeScript Handbook](https://www.typescriptlang.org/docs/handbook/compiler-options.html) を参照してください

<!-- ### What an implied tsconfig.json looks like -->
### 暗黙の tsconfig.json どのように見えるか

<!--
It is impossible to get `tsc` to behave like Deno. It is also difficult to get
the TypeScript language service to behave like Deno. This is why we have built a
language service directly into Deno. That being said, it can be useful to
understand what is implied.
-->
`tsc` を Deno と同じように動作させることは不可能です。また、TypeScript language service を Deno のように動作させることも難しいです。このため、Deno に直接 language service を組み込みました。そうは言っても、何が暗黙であるかを理解することは有用です。

<!--
If you were to write a `tsconfig.json` for Deno, it would look something like
this:
-->
Deno 用の `tsconfig.json` を書くと、以下のようになります:

```json
{
  "compilerOptions": {
    "allowJs": true,
    "esModuleInterop": true,
    "experimentalDecorators": true,
    "inlineSourceMap": true,
    "isolatedModules": true,
    "jsx": "react",
    "lib": ["deno.window"],
    "module": "esnext",
    "strict": true,
    "target": "esnext",
    "useDefineForClassFields": true
  }
}
```

<!--
You can't copy paste this into a `tsconfig.json` and get it to work,
specifically because of the built in type libraries that are custom to Deno
which are provided to the TypeScript compiler. This can somewhat be mocked by
running `deno types` on the command line and piping the output to a file and
including that in the files as part of the program, removing the `"lib"` option,
and setting the `"noLib"` option to `true`.
-->
これを `tsconfig.json` にコピーペーストして動かすことはできません、特に、TypeScript コンパイラに提供されている Deno 独自のビルトイン型ライブラリのせいです。これは、コマンドラインで `deno types` を実行し、出力をファイルにパイプしてプログラムの一部としてファイルに含め、`"lib"` オプションを削除し `"noLib"` オプションを `true` に設定することでモックすることはできます。

<!--
If you use the `--unstable` flag, Deno will change the `"lib"` option to
`[ "deno.window", "deno.unstable" ]`. If you are trying to load a worker, that
is type checked with `"deno.worker"` instead of `"deno.window"`.
-->
`--unstable` フラッグを使っていたら、Deno は `"lib"` オプションを `[ "deno.window", "deno.unstable" ]` に変更します。もし、ワーカーをロードしようとしているなら、`"deno.window"` の代わりに `"deno.worker"` で型チェックを行います。

<!-- ### Using the "lib" property -->
### "lib" プロパティの使用

[TBC]
