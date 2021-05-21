## Import maps

<!-- Deno supports [import maps](https://github.com/WICG/import-maps). -->
Denoは [import maps](https://github.com/WICG/import-maps) をサポートしています。

<!-- You can use import maps with the `--import-map=<FILE>` CLI flag. -->
`--import-map=<FILE>` CLIフラグでimport mapsを使うことが出来まます。

<!-- Example: -->
例:

**import_map.json**

```js
{
   "imports": {
      "fmt/": "https://deno.land/std@$STD_VERSION/fmt/"
   }
}
```

**color.ts**

```ts
import { red } from "fmt/colors.ts";

console.log(red("hello world"));
```

<!-- Then: -->
次に:

```shell
$ deno run --import-map=import_map.json  color.ts
```

<!-- To use your project root for absolute imports: -->
絶対的インポートにプロジェクトルートを使う:

**import_map.json**

```jsonc
{
  "imports": {
    "/": "./",
    "./": "./"
  }
}
```

**main.ts**

```ts
import { MyUtil } from "/util.ts";
```

<!--
This causes import specifiers starting with `/` to be resolved relative to the
import map's URL or file path.
-->
これにより `/` で始まるインポート指定子はインポートマップのURLまたはファイルパスに対して相対的に解決されます。
