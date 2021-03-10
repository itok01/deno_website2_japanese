<!-- ## Compiling Executables -->
## 実行可能ファイルのコンパイル

<!--
> Since the compile functionality is relatively new, the `--unstable` flag has
> to be set in order for the command to work.
-->
コンパイル機能は比較的新しいので、コマンドを動作させるには `--unstable` フラッグをセットしてください。

<!--
`deno compile [--output <OUT>] <SRC>` will compile the script into a
self-contained executable.
-->
`deno compile [--output <OUT>] <SRC>` はスクリプトを自己完結型の実行可能ファイルにコンパイルします。

```
> deno compile --unstable https://deno.land/std/examples/welcome.ts
```

<!--
If you omit the `OUT` parameter, the name of the executable file will be
inferred.
-->
`OUT` パラメーターを省略すると、実行ファイルの名前は推測されます。

<!-- ### Flags -->
### フラグ

<!--
As with [`deno install`](./script_installer.md), the runtime flags used to
execute the script must be specified at compilation time. This includes
permission flags.
-->
[`deno install`](./script_installer.md) と同様にスクリプトの実行に使用するランタイムフラフはコンパイル時に指定しなければいけません。これにはパーミッションフラグも含まれます。

```
> deno compile --unstable --allow-read --allow-net https://deno.land/std/http/file_server.ts
```

<!--
[Script arguments](../getting_started/command_line_interface.md#script-arguments)
can be partially embedded.
-->
[スクリプト引数](../getting_started/command_line_interface.md#script-arguments) は部分的に埋め込むことができます。

```
> deno compile --unstable --allow-read --allow-net https://deno.land/std/http/file_server.ts -p 8080
> ./file_server --help
```

<!-- ### Cross Compilation -->
### クロスコンパイル

<!--
You can use cross compilation by adding `--target` CLI argument, benefiting that
you can create binaries for other platforms in single CI machine. Deno supports
compiling to Windows x64, macOS x64, macOS ARM and Linux x64 currently. Use
`deno compile --help` to get the full list about compilation targets.
-->
CLI 引数に `--target` を追加することでクロスコンパイルできます。これの利点は、一つの CI マシンで他のプラットフォームへのバイナリを生成できることです。Deno は現在 Windows x64、macOS ARM そして Linux x64 へのコンパイルをサポートします。コンパイルターゲットに関する完全なリストを得るには `deno compile --help` を使ってください。

<!-- ### Generating smaller binaries -->
### より小さいバイナリの生成

<!--
Once `--lite` argument is passed, `deno compile` will use a slimmed-down
runtime-only binary.
-->
引数に `--lite` が渡されると、`deno compile` は小さくしたランタイムのバイナリを使用します。 
