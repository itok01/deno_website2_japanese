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

<!-- To use starting directory for absolute imports: -->
絶対的インポートに開始ディレクトリを使う:

**import_map.json**

```jsonc
{
  "imports": {
    "/": "./"
  }
}
```

**main.ts**

```ts
import { MyUtil } from "/util.ts";
```

<!-- You may map a different directory: (eg. src) -->
別のディレクトリをマップすることも出来ます: (例、src)

**import_map.json**

```jsonc
{
  "imports": {
    "/": "./src/"
  }
}
```
