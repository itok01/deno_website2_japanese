<!-- ## Proxies -->
## プロキシ

<!-- Deno supports proxies for module downloads and the Web standard `fetch` API. -->
DenoはモジュールのダウンロードのためのプロキシとWeb標準の `fetch` APIをサポートしています。

<!--
Proxy configuration is read from environmental variables: `HTTP_PROXY`, `HTTPS_PROXY` and `NO_PROXY`.
-->
プロキシ設定は環境変数 `HTTP_PROXY`、`HTTPS_PROXY` 及び `NO_PROXY` から読み込まれます。

<!--
In case of Windows, if environment variables are not found Deno falls back to
reading proxies from registry.
-->
Windowsの場合、環境変数が見つからない場合Denoはレジストリからプロキシを読み込みます。
