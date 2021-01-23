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

<!-- Cross compiling binaries for different platforms is not currently possible. -->
別のプラットフォームへのクロスコンパイルバイナリは現時点では不可能です。
