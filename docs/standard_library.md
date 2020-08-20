<!-- # Standard library -->
# 標準ライブラリ

<!--
Deno provides a set of standard modules that are audited by the core team and
are guaranteed to work with Deno.
-->
Denoはコアチームによって監査されDenoで動くことが保証された標準モジュールセットを提供しています。

<!-- Standard library is available at: https://deno.land/std/ -->
標準ライブラリはここにあります: https://deno.land/std/

<!-- ## Versioning and stability -->
## バージョニングと安定性

<!--
Standard library is not yet stable and therefore it is versioned differently
than Deno. For latest release consult https://deno.land/std/ or
https://deno.land/std/version.ts.
-->
標準ライブラリはまだ安定版でなくそのためDenoのバージョンと違います。最新のリリースは https://deno.land/std/ もしくは https://deno.land/std/version.ts にあります。

<!--
We strongly suggest to always use imports with pinned version of standard
library to avoid unintended changes.
-->
意図しない変更を回避するために標準ライブラリは固定されたバージョンをつねにインポートすることを強くおすすめします。

<!-- ## Troubleshooting -->
## トラブルシューティング

<!-- Some of the modules provided in standard library use unstable Deno APIs. -->
標準ライブラリで提供されているモジュールの中には不安定なDeno APIを使用しているものがあります。

<!--
Trying to run such modules without `--unstable` CLI flag ends up with a lot of
TypeScript errors suggesting that some APIs on `Deno` namespace do not exist:
-->
これらのモジュールを `--unstable` フラグなしで実行しようとすると `Deno` 名前空間にあるいくつかのAPIが存在しないことを示唆する多くのTypeScriptはエラーが発生します。

```typescript
// main.ts
import { copy } from "https://deno.land/std@$STD_VERSION/fs/copy.ts";

copy("log.txt", "log-old.txt");
```

```shell
$ deno run --allow-read --allow-write main.ts
Compile file:///dev/deno/main.ts
Download https://deno.land/std@0.50.0/fs/copy.ts
Download https://deno.land/std@0.50.0/fs/ensure_dir.ts
Download https://deno.land/std@@0.50.0/fs/_util.ts
error: TS2339 [ERROR]: Property 'utime' does not exist on type 'typeof Deno'.
    await Deno.utime(dest, statInfo.atime, statInfo.mtime);
               ~~~~~
    at https://deno.land/std@0.50.0/fs/copy.ts:90:16

TS2339 [ERROR]: Property 'utimeSync' does not exist on type 'typeof Deno'.
    Deno.utimeSync(dest, statInfo.atime, statInfo.mtime);
         ~~~~~~~~~
    at https://deno.land/std@0.50.0/fs/copy.ts:101:10
```

<!-- Solution to that problem requires adding `--unstable` flag: -->
これらのプログラムへの解決策は `--unstable` フラグを利用することです:

```shell
deno run --allow-read --allow-write --unstable main.ts
```

<!--
To make sure that API producing error is unstable check
[`lib.deno.unstable.d.ts`](https://github.com/denoland/deno/blob/master/cli/js/lib.deno.unstable.d.ts)
declaration.
-->
APIが不安定なエラーを生成していることを確認するには [`lib.deno.unstable.d.ts`](https://github.com/denoland/deno/blob/master/cli/js/lib.deno.unstable.d.ts) を確認してください。

<!--
This problem should be fixed in the near future.
-->
この問題は近いうちに解決されるはずです。
