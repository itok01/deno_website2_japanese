<!-- # Testing -->
# テスト

<!--
Deno has a built-in test runner that you can use for testing JavaScript or
TypeScript code.
-->
DenoはJavaScriptやTypeScriptのコードをテストするためにビルトインテストランナーを持っています。

<!-- ## Writing tests -->
## テストを書く

<!--
To define a test you need to call `Deno.test` with a name and function to be
tested:
-->
テストを定義するにはテストする名前と関数をつけて `Deno.test` を呼び出してください:

<!--
```ts
Deno.test("hello world", () => {
  const x = 1 + 2;
  if (x !== 3) {
    throw Error("x should be equal to 3");
  }
});
```
-->
```ts
// シンプルな名前と関数コンパクトですが、設定可能ではないです。
Deno.test("hello world #1", () => {
  const x = 1 + 2;
  assertEquals(x, 3);
});

// 完全で本格的なテスト定義で長いですが、設定可能です(下記参照)
Deno.test({
  name: "hello world #2",
  fn() => {
    const x = 1 + 2;
    assertEquals(x, 3);
  }
});
```

<!--
There are some useful assertion utilities at https://deno.land/std/testing to
make testing easier:
-->
テストを簡単にするアサーションユーティリティは https://deno.land/std/testing にあります:

```ts
import { assertEquals } from "https://deno.land/std/testing/asserts.ts";

Deno.test("hello world", () => {
  const x = 1 + 2;
  assertEquals(x, 3);
});
```

<!-- ### Async functions -->
### Async 関数

<!--
You can also test asynchronous code by passing a test function that returns a
promise. For this you can use the `async` keyword when defining a function:
-->
promise を返すテスト関数を渡すことで非同期のコードテストできます。これをするために関数を定義するときに `async` キーワードを使うことが出来ます:

<!--
```ts
import { delay } from "https://deno.land/std/async/delay.ts";

Deno.test("async hello world", async () => {
  const x = 1 + 2;

  // await some async task
  await delay(100);

  if (x !== 3) {
    throw Error("x should be equal to 3");
  }
});
```
-->
```ts
import { delay } from "https://deno.land/std/async/delay.ts";

Deno.test("async hello world", async () => {
  const x = 1 + 2;

  // 非同期タスクをまつ
  await delay(100);

  if (x !== 3) {
    throw Error("x は 3 になるはずです");
  }
});
```

<!-- ### Resource and async op sanitizers -->
### リソースと非同期opサニタイザー

<!--
Certain actions in Deno create resources in the resource table
([learn more here](./contributing/architecture.md)). These resources should be
closed after you are done using them.
-->
Denoの特定のアクションは、リソーステーブル([詳しくはこちら](./contributing/architecture.md))にリソースを作成します。これらのリソースは使い終わったら閉じられるべきです。

<!--
For each test definition the test runner checks that all resources created in
this test have been closed. This is to prevent resource 'leaks'. This is enabled
by default for all tests, but can be disabled by setting the `sanitizeResources`
boolean to false in the test definition.
-->
それぞれのテスト定義に対してテストランナーはこのテストで作られたすべてのリソースが閉じられるかチェックします。これはリソースの'漏れ'を防ぐためです。これは全てのテストに対しデフォルトで有効ですが、テスト定義で `sanitizeResources` ブーリアンをfalseに設定することで無効にできます。

<!--
The same is true for async operation like interacting with the filesystem. The
test runner checks that each operation you start in the test is completed before
the end of the test. This is enabled by default for all tests, but can be
disabled by setting the `sanitizeOps` boolean to false in the test definition.
-->
ファイルシステムとのやり取りのような非同期の操作も同様です。テストランナーはテストで開始した各操作がテスト終了前に完了しているかどうかチェックします。これは全てのテストに対してデフォルトで有効ですが、テスト定義の `sanitizeOps` ブーリアンをfalseに設定することで無効にできます。

```ts
Deno.test({
  name: "leaky test",
  fn() {
    Deno.open("hello.txt");
  },
  sanitizeResources: false,
  sanitizeOps: false,
});
```

<!-- ### Ignoring tests -->
### テストを無視

<!--
Sometimes you want to ignore tests based on some sort of condition (for example
you only want a test to run on Windows). For this you can use the `ignore`
boolean in the test definition. If it is set to true the test will be skipped.
-->
状況よって(例えばWindowsだけでテストしたいなど)テストを無視した場合があります。これにはテスト定義の中で `ignore` ブーリアンを使うことが出来ます。これがtrueであればテストはスキップされます。

```ts
Deno.test({
  name: "do macOS feature",
  ignore: Deno.build.os !== "darwin",
  fn() {
    doMacOSFeature();
  },
});
```
<!-- ## Running tests -->
## テストの実行

<!--
To run the test, call `deno test` with the file that contains your test
function:
-->
テストを実行するにはテスト関数が入っているファイルに対し `deno test` を呼んでください。

```shell
deno test my_test.ts
```

<!--
You can also omit the file name, in which case all tests in the current
directory (recursively) that match the glob `{*_,*.,}test.{js,mjs,ts,jsx,tsx}`
will be run. If you pass a directory, all files in the directory that match this
glob will be run.
-->
テストを実行するには、テスト関数を含んでいるファイルで `deno test` を呼び出してください。ファイル名を省略することも出来ます。その場合、現在のディレクトリ内(再帰的)のグロブ `{*_,*.,}test.{js,mjs,ts,jsx,tsx}` に一致するすべてのテストが実行されます。ディレクトリを渡すとこのグロブに一致する全てのファイルが実行されます。
