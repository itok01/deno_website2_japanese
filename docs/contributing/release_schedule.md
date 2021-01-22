<!-- ## Release Schedule -->
## リリーススケジュール

<!--
A new minor release for the `deno` cli is released every 6 weeks. A new patch
version is released weekly, except in the week before a new minor release.
-->
`deno` cliのマイナーリリースは6週間ごとです。新しいパッチバージョンは1週間ごとにリリースされます。ただし、新しいマイナーリリースの前週は除きます。

<!-- The release dates for the upcoming minor releases are: -->
今後のマイナーリリースの日付は:

- 1.8.0: March 2nd, 2021
- 1.9.0: April 13, 2021

<!--
Stable releases can be found on the
[GitHub releases page](https://github.com/denoland/deno/releases).
-->
安定バージョンのリリースは[GitHub releases page](https://github.com/denoland/deno/releases)にあります。

### Canary channel

<!--
In addition to the stable channel described above, canaries are released
multiple times daily (for each commit on master). You can upgrade to the latest
canary release by running:
-->
上記の安定チャンネルの他に canaries は毎日複数回(master の各コミットごとに)リリースされています。最新の canary チャンネルにアップグレードするには以下を実行してください:

```
deno upgrade --canary
```

<!-- To update to a specific canary, pass the commit hash in the `--version` option: -->
特定の canary にアップグレードするには `--version` オプションにコミットハッシュを渡してください:

```
deno upgrade --canary --version=973af61d8bb03c1709f61e456581d58386ed4952
```

<!-- To switch back to the stable channel, run `deno upgrade`. -->
安定ちゃんねるに戻すには `deno upgrade` を実行してください。

<!-- Canaries can be downloaded from https://dl.deno.land. -->
Canaries は https://dl.deno.land からダウンロードできます。
