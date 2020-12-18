<!-- ## Compiling Executables -->
## 実行可能ファイルのコンパイル

<!--
> Since the compile functionality is relatively new, the `--unstable` flag has
> to be set in order for the command to work.
-->
コンパイル機能は比較的新しいので、コマンドを動作させるには `--unstable` フラッグをセットしてください。

<!--
`deno compile [SRC] [OUT]` will compile the script into a self contained
executable.
-->
`deno compile [SRC] [OUT]` はスクリプトを自己完結型の実行ファイルにコンパイルします。

```
> deno compile --unstable https://deno.land/std/http/file_server.ts
```

<!--
If you omit the `OUT` parameter, the name of the executable file will be
inferred.
-->
`OUT` パラメーターを省略すると、実行ファイルの名前は推測されます。

<!-- ### Cross Compilation -->
### クロスコンパイル

<!-- Cross compiling binaries for different platforms is not currently possible. -->
別のプラットフォームへのクロスコンパイルバイナリは現時点では不可能です。
