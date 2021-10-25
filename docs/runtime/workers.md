<!-- ## Workers -->
## ワーカー

<!--
Deno supports
[`Web Worker API`](https://developer.mozilla.org/en-US/docs/Web/API/Worker/Worker).
-->
Denoは [`Web Worker API`](https://developer.mozilla.org/en-US/docs/Web/API/Worker/Worker) をサポートします。

<!--
Workers can be used to run code on multiple threads. Each instance of `Worker`
is run on a separate thread, dedicated only to that worker.
-->
ワーカーは複数スレッドでコードを実行する時に使われます。それぞれの `Worker` インスタンスはワーカーそれぞれのワーカー専有の別々のスレッドで実行されます。

<!--
Currently Deno supports only `module` type workers; thus it's essential to pass
the `type: "module"` option when creating a new worker.
-->
現在、Denoは `module` タイプのワーカーのみサポートしています; そのため、新しいワーカーを作成するときに `type: "module"` オプションを指定します。

<!--
Use of relative module specifiers in the main worker are only supported with
`--location <href>` passed on the CLI. This is not recommended for portability.
You can instead use the `URL` constructor and `import.meta.url` to easily create
a specifier for some nearby script. Dedicated workers, however, have a location
and this capability by default.
-->
メインワーカーでの相対モジュールの使用はCLIで渡された `--location <href>` 内でのみサポートされます。これは移植性のために推奨されません。代わりに近くにあるスクリプトの指定子を簡単に作るため、`URL` コンストラクタと `import.meta.url` を使用してください。しかし、専用のワーカーはデフォルトで場所とこの機能を持っています。

<!--
```ts
// Good
new Worker(new URL("./worker.js", import.meta.url).href, { type: "module" });

// Bad
new Worker(new URL("./worker.js", import.meta.url).href);
new Worker(new URL("./worker.js", import.meta.url).href, { type: "classic" });
new Worker("./worker.js", { type: "module" });
```
-->
```ts
// 良い例
new Worker(new URL("./worker.js", import.meta.url).href, { type: "module" });

// 悪い例
new Worker(new URL("./worker.js", import.meta.url).href);
new Worker(new URL("./worker.js", import.meta.url).href, { type: "classic" });
new Worker("./worker.js", { type: "module" });
```

<!-- ### Instantiation permissions -->
### パーミッション

<!--
Creating a new `Worker` instance is similar to a dynamic import; therefore Deno
requires appropriate permission for this action.
-->
新しい `Worker` インスタンスの作成はダイナミックインポートと似ています; そのためDenoはこのアクションに適切なパーミッションを要求します。

<!-- For workers using local modules; `--allow-read` permission is required: -->
ローカルモジュールを使うワーカーには `--allow-read` パーミッションが必要です:

**main.ts**

```ts
new Worker(new URL("./worker.ts", import.meta.url).href, { type: "module" });
```

**worker.ts**

```ts
console.log("hello world");
self.close();
```

```shell
$ deno run main.ts
error: Uncaught PermissionDenied: read access to "./worker.ts", run again with the --allow-read flag

$ deno run --allow-read main.ts
hello world
```

<!-- For workers using remote modules; `--allow-net` permission is required: -->
リモートモジュールを使うワーカーには `--allow-net` パーミッションが必要です:

**main.ts**

```ts
new Worker("https://example.com/worker.ts", { type: "module" });
```

**worker.ts** (at https[]()://example.com/worker.ts)

```ts
console.log("hello world");
self.close();
```

```shell
$ deno run main.ts
error: Uncaught PermissionDenied: net access to "https://example.com/worker.ts", run again with the --allow-net flag

$ deno run --allow-net main.ts
hello world
```

<!-- ### Using Deno in worker -->
### ワーカー内でのDenoの使用

<!--
> This is an unstable Deno feature. Learn more about
> [unstable features](./stability.md).
-->
> これは不安定版のDenoの機能です。詳しくは [不安定版の機能](./stability.md) を見てください。

<!-- By default the `Deno` namespace is not available in worker scope. -->
デフォルトでは `Deno` 名前空間はワーカースコープ内で有効ではありません。

To enable the `Deno` namespace pass `deno.namespace = true` option when creating
+new worker:

**main.js**

```ts
const worker = new Worker(new URL("./worker.js", import.meta.url).href, {
  type: "module",
  deno: {
    namespace: true,
  },
});
worker.postMessage({ filename: "./log.txt" });
```

**worker.js**

```ts
self.onmessage = async (e) => {
  const { filename } = e.data;
  const text = await Deno.readTextFile(filename);
  console.log(text);
  self.close();
};
```

**log.txt**

```
hello world
```

```shell
$ deno run --allow-read --unstable main.js
hello world
```

<!-- ### Specifying worker permissions -->
### ワーカーのパーミッションの指定

<!--
> This is an unstable Deno feature. Learn more about
> [unstable features](./stability.md).
-->
> これは Deno の不安定な機能です。詳しくは [不安定な機能](./stability.md) を参照してください。

<!--
The permissions available for the worker are analogous to the CLI permission
flags, meaning every permission enabled there can be disabled at the level of
the Worker API. You can find a more detailed description of each of the
permission options [here](../getting_started/permissions.md).
-->
ワーカーで利用可能なパーミッションはCLIパーミッションフラグに似ていて、そこで許可されたすべてのパーミッションはワーカー API のレベルで無効にできます。すべてのパーミッションオプションのそれぞれの詳しい説明は [ここ](../getting_started/permissions.md) を参照してください。

<!--
By default a worker will inherit permissions from the thread it was created in,
however in order to allow users to limit the access of this worker we provide
the `deno.permissions` option in the worker API.
-->
デフォルトではワーカーは自信が作成されたスレッドと同じパーミッションを継承します、しかし、ユーザーがこのワーカーのアクセスを制限するためワーカー API に　`deno.permissions` オプションを要しいています。

<!--
- For permissions that support granular access you can pass in a list of the
  desired resources the worker will have access to, and for those who only have
  the on/off option you can pass true/false respectively.
-->
- 緻密なアクセスをサポートするパーミッションについては、ワーカーがアクセスするリソースのリストを渡すことができ、on/off オプションのみ持っているものについては、それぞれ true/false を渡すことができます。

  ```ts
  const worker = new Worker(new URL("./worker.js", import.meta.url).href, {
    type: "module",
    deno: {
      namespace: true,
      permissions: {
        net: [
          "https://deno.land/",
        ],
        read: [
          new URL("./file_1.txt", import.meta.url),
          new URL("./file_2.txt", import.meta.url),
        ],
        write: false,
      },
    },
  });
  ```

<!--
- Granular access permissions receive both absolute and relative routes as
  arguments, however take into account that relative routes will be resolved
  relative to the file the worker is instantiated in, not the path the worker
  file is currently in
-->
- 緻密なアクセスパーミッションは引数として絶対と相対経路の両方を受け取りますが、相対経路はワーカーファイルが存在する現在のパスではなくワーカーがインスタンス化されたファイルに対して相対的に解決されることを考慮してください。

  ```ts
  const worker = new Worker(
    new URL("./worker/worker.js", import.meta.url).href,
    {
      type: "module",
      deno: {
        namespace: true,
        permissions: {
          read: [
            "/home/user/Documents/deno/worker/file_1.txt",
            "./worker/file_2.txt",
          ],
        },
      },
    },
  );
  ```

<!--
- Both `deno.permissions` and its children support the option `"inherit"`, which
  implies it will borrow its parent permissions.
-->
- `deno.permissions` とその子達はオプション `"inherit"` をサポートし、親のパーミッションを借ります。

  ```ts
  // This worker will inherit its parent permissions
  const worker = new Worker(new URL("./worker.js", import.meta.url).href, {
    type: "module",
    deno: {
      namespace: true,
      permissions: "inherit",
    },
  });
  ```

  ```ts
  // This worker will inherit only the net permissions of its parent
  const worker = new Worker(new URL("./worker.js", import.meta.url).href, {
    type: "module",
    deno: {
      namespace: true,
      permissions: {
        env: false,
        hrtime: false,
        net: "inherit",
        plugin: false,
        read: false,
        run: false,
        write: false,
      },
    },
  });
  ```

<!--
- Not specifying the `deno.permissions` option or one of its children will cause
  the worker to inherit by default.
-->
- `deno.permissions` オプションやその子を指定しないとワーカーはデフォルトを継承します。

  ```ts
  // This worker will inherit its parent permissions
  const worker = new Worker(new URL("./worker.js", import.meta.url).href, {
    type: "module",
  });
  ```

  ```ts
  // This worker will inherit all the permissions of its parent BUT net
  const worker = new Worker(new URL("./worker.js", import.meta.url).href, {
    type: "module",
    deno: {
      namespace: true,
      permissions: {
        net: false,
      },
    },
  });
  ```

<!--
- You can disable the permissions of the worker all together by passing `"none"` to
  the `deno.permissions` option.
-->
- `deno.permissions` に `"none"` を渡すことでオプションワーカーのパーミッションをすべて無効にすることができます。

  ```ts
  // This worker will not have any permissions enabled
  const worker = new Worker(new URL("./worker.js", import.meta.url).href, {
    type: "module",
    deno: {
      namespace: true,
      permissions: "none",
    },
  });
  ```
