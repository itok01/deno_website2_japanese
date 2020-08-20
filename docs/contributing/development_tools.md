<!-- ## Testing and Tools -->
## テストとツール

<!-- ### Tests -->
### テスト

<!-- Test `deno`: -->
`deno` をテスト:

<!--
```shell
# Run the whole suite:
cargo test

# Only test cli/js/:
cargo test js_unit_tests
```
-->
```shell
# スイートすべてをテスト:
cargo test

# cli/jsのみをテスト:
cargo test js_unit_tests
```

<!-- Test `std/`: -->
`std/` をテスト:

```shell
cargo test std_tests
```

<!-- ### Lint and format -->
### リントとフォーマット

<!-- Lint the code: -->
コードのリント:

```shell
./tools/lint.py
```

<!-- Format the code: -->
コードのフォーマット:

```shell
./tools/format.py
```

<!-- ### Profiling -->
### プロファイリング

<!-- To start profiling, -->
プロファイリングを始めるには,

```sh
# Make sure we're only building release.
# Build deno and V8's d8.
ninja -C target/release d8

# Start the program we want to benchmark with --prof
./target/release/deno run tests/http_bench.ts --allow-net --v8-flags=--prof &

# Exercise it.
third_party/wrk/linux/wrk http://localhost:4500/
kill `pgrep deno`
```

<!--
V8 will write a file in the current directory that looks like this:
`isolate-0x7fad98242400-v8.log`. To examine this file:
-->
V8は現在のディレクトリの `isolate-0x7fad98242400-v8.log` のようなファイルに書き込みます。このファイルを調べるには:

```sh
D8_PATH=target/release/ ./third_party/v8/tools/linux-tick-processor
isolate-0x7fad98242400-v8.log > prof.log
# on macOS, use ./third_party/v8/tools/mac-tick-processor instead
```

<!-- `prof.log` will contain information about tick distribution of different calls. -->
`prof.log` は異なるコールの分布に関する情報を含みます。

<!-- To view the log with Web UI, generate JSON file of the log: -->
Web UIでログを見るには、ログのJSONファイルを作ってください:

```sh
D8_PATH=target/release/ ./third_party/v8/tools/linux-tick-processor
isolate-0x7fad98242400-v8.log --preprocess > prof.json
```

<!--
Open `third_party/v8/tools/profview/index.html` in your browser, and select
`prof.json` to view the distribution graphically.
-->
`third_party/v8/tools/profview/index.html` をブラウザで開いて、分布をグラフィカルに表示するには `prof.json` を選択してください。

<!-- Useful V8 flags during profiling: -->
プロファイリング中の便利なV8フラグ:

- --prof
- --log-internal-timer-events
- --log-timer-events
- --track-gc
- --log-source-code
- --track-gc-object-stats

<!-- To learn more about `d8` and profiling, check out the following links: -->
`d8` とプロファイリングについてもっと知りたい場合は、次のリンクを調べてください:

- [https://v8.dev/docs/d8](https://v8.dev/docs/d8)
- [https://v8.dev/docs/profile](https://v8.dev/docs/profile)

<!-- ### Debugging with LLDB -->
### LLDBでデバッグ

<!-- We can use LLDB to debug Deno. -->
DenoをデバッグするのにLLDBが使えます

```shell
$ lldb -- target/debug/deno run tests/worker.js
> run
> bt
> up
> up
> l
```

<!--
To debug Rust code, we can use `rust-lldb`. It should come with `rustc` and is a
wrapper around LLDB.
-->
Rustコードをデバッグするには、`rust-lldb` を使うことが出来ます。これは `rustc` とともにくるものでLLDBのラッパーです。

```shell
$ rust-lldb -- ./target/debug/deno run --allow-net tests/http_bench.ts
# On macOS, you might get warnings like
# `ImportError: cannot import name _remove_dead_weakref`
# In that case, use system python by setting PATH, e.g.
# PATH=/System/Library/Frameworks/Python.framework/Versions/2.7/bin:$PATH
(lldb) command script import "/Users/kevinqian/.rustup/toolchains/1.36.0-x86_64-apple-darwin/lib/rustlib/etc/lldb_rust_formatters.py"
(lldb) type summary add --no-value --python-function lldb_rust_formatters.print_val -x ".*" --category Rust
(lldb) type category enable Rust
(lldb) target create "../deno/target/debug/deno"
Current executable set to '../deno/target/debug/deno' (x86_64).
(lldb) settings set -- target.run-args  "tests/http_bench.ts" "--allow-net"
(lldb) b op_start
(lldb) r
```

<!-- ### V8 flags -->
### V8フラグ

<!-- V8 has many many internal command-line flags. -->
V8はたくさんの内部コマンドラインフラグを持っています。

```shell
# list available v8 flags
$ deno --v8-flags=--help

#  example for applying multiple flags
$ deno --v8-flags=--expose-gc,--use-strict
```

<!-- Particularly useful ones: -->
とくに有用なもの:

```
--async-stack-trace
```

<!-- ### Continuous Benchmarks -->
### 継続的ベンチマーク

<!-- See our benchmarks [over here](https://deno.land/benchmarks) -->
私達のベンチマークは [こちら](https://deno.land/benchmarks) で見てください。

<!--
The benchmark chart supposes
https://github.com/denoland/benchmark_data/blob/gh-pages/data.json has the type
`BenchmarkData[]` where `BenchmarkData` is defined like the below:
-->
ベンチマークチャートは https://github.com/denoland/benchmark_data/blob/gh-pages/data.json が下記で定義されるような `BenchmarkData` の `BenchmarkData[]` を持っていると想定します:

```ts
interface ExecTimeData {
  mean: number;
  stddev: number;
  user: number;
  system: number;
  min: number;
  max: number;
}

interface BenchmarkData {
  created_at: string;
  sha1: string;
  benchmark: {
    [key: string]: ExecTimeData;
  };
  binarySizeData: {
    [key: string]: number;
  };
  threadCountData: {
    [key: string]: number;
  };
  syscallCountData: {
    [key: string]: number;
  };
}
```
