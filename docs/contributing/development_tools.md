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

# Only test cli/tests/unit/:
cargo test js_unit_tests
```
-->
```shell
# スイートすべてをテスト:
cargo test

# cli/tests/unit/のみをテスト:
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
deno run -A --unstable ./tools/lint.js
```

<!-- Format the code: -->
コードのフォーマット:

```shell
deno run -A --unstable ./tools/format.js
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
