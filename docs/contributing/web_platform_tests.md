<!-- ## Web Platform Test -->
## Web プラットフォームテスト

<!--
Deno uses a custom test runner for Web Platform Tests. It can be found at
`./tools/wpt.ts`.
-->
Deno は Web プラットフォームテスト (Web Platform Tests) のためのカスタムテストランナーを使用します。これは `./tools/wpt.ts` にあります。

<!-- ### Running tests -->
### テストの実行

<!--
> If you are on Windows, or your system does not support shebangs, prefix all
> `./tools/wpt.ts` commands with
> `deno run --unstable --allow-write --allow-read --allow-net --allow-env --allow-run`.
-->
> もし Windows をお使いの場合や、shebangs をサポートしていない場合、すべての `./tools/wpt.ts` コマンドの前に `deno run --unstable --allow-write --allow-read --allow-net --allow-env --allow-run` をつけてください。

<!--
Before attempting to run WPT tests for the first time, please run the WPT setup.
You must also run this command every time the `./test_util/wpt` submodule is
updated:
-->
初めて WPT テストを実行しようとする前に、WPT セットアップを実行してください。また、`./test_util/wpt` サブモジュールが更新されるたびにこのコマンドを実行しなければなりません:

```shell
./tools/wpt.ts setup
```

<!-- To run all available web platform tests, run the following command: -->
すべての利用可能な web プラットフォームテストを実行するには、次のコマンドを実行してください:

```shell
./tools/wpt.ts run

# You can also filter which test files to run by specifying filters:
./tools/wpt.ts run -- streams/piping/general hr-time
```

<!--
The test runner will run each web platform test and record its status (failed or
ok). It will then compare this output to the expected output of each test as
specified in the `./tools/wpt/expectation.json` file. This file is a nested JSON
structure that mirrors the `./test_utils/wpt` directory. It describes for each
test file, if it should pass as a whole (all tests pass, `true`), if it should
fail as a whole (test runner encounters an exception outside of a test or all
tests fail, `false`), or which tests it expects to fail (a string array of test
case names).
-->
テストランナーは各ウェブプラットフォームのテストを実行し、そのステータス (失敗かOKか) を記録します。そして、この出力を `./tools/wpt/expectation.json` ファイルで指定された各テストの期待される出力と比較します。このファイルは `./test_utils/wpt` ディレクトリをミラーする入れ子の JSON 構造体です。このファイルは各テストファイルに対して、全体として合格するかどうか (すべてのテストが合格、`true`)、全体として失敗するかどうか (テストランナーがテストの外で例外に遭遇したか、すべてのテストが失敗したか、`false`)、どのテストが失敗すると予想されるか (テストケース名の文字列配列) を記述します。

<!-- ### Updating enabled tests or expectations -->
### 有効なテストや期待値を更新する

<!--
You can update the `./tools/wpt/expectation.json` file manually by changing the
value of each of the test file entries in the JSON structure. The alternative
and preferred option is to have the WPT runner run all, or a filtered subset of
tests, and then automatically update the `expectation.json` file to match the
current reality. You can do this with the `./wpt.ts update` command. Example:
-->
JSON構造内の各テストファイルエントリの値を変更することで、`./tools/wpt/expectation.json` ファイルを手動で更新することができます。代替の好ましいオプションは、WPTランナーにすべてのテスト、あるいはフィルタリングされたテストのサブセットを実行させ、現在の現実と一致するように `expectation.json` ファイルを自動的に更新させることです。これは `./wpt.ts update` コマンドで行えます。例:

```shell
./tools/wpt.ts update -- hr-time
```

<!--
After running this command the `expectation.json` file will match the current
output of all the tests that were run. This means that running `wpt.ts run`
right after a `wpt.ts update` should always pass.
-->
このコマンドを実行した後、`expectation.json` ファイルは実行されたすべてのテストの現在の出力と一致します。つまり、`wpt.ts update` の直後に `wpt.ts run` を実行すると、常に合格します。

<!-- ### Subcommands -->
### サブコマンド

#### `setup`

<!--
Validate that your environment is configured correctly, or help you configure
it.
-->
環境が正しく設定されたかどうかの検証、設定の手助けをします。

<!--
This will check that the python3 (or `python.exe` on Windows) is actually
Python 3.
-->
これはpython3 (Windowsでは `python.exe`) が実際に Python3 であることを確認します。

<!-- You can specify the following flags to customize bahaviour: -->
動作をカスタマイズするために次のフラグを指定知ることができます:

```
--rebuild
    Rebuild the manifest instead of downloading. This can take up to 3 minutes.

--auto-config
    Automatically configure /etc/hosts if it is not configured (no prompt will be shown).
```

#### `run`

<!-- Run all tests like specified in `expectation.json`. -->
`expectation.json` で指定されたすべてのテストを実行します。

<!-- You can specify the following flags to customize behaviour: -->
動作をカスタマイズするために次のフラグを指定することができます:

```
--release
    Use the ./target/release/deno binary instead of ./target/debug/deno

--quiet
    Disable printing of `ok` test cases.

--json=<file>
    Output the test results as JSON to the file specified.
```

<!--
You can also specify exactly which tests to run by specifying one of more
filters after a `--`:
-->
また、`--` の後にフィルタを指定することで、どのテストを実行するかを正確に指定することもできます。

```
./tools/wpt.ts run -- hr-time streams/piping/general
```

### `update`

<!-- Update the `expectation.json` to match the current reality. -->
現在の現実に合わせて `expectation.json` を更新します。

<!-- You can specify the following flags to customize behaviour: -->
動作をカスタマイズするために次のフラグを指定することができます:

```
--release
    Use the ./target/release/deno binary instead of ./target/debug/deno

--quiet
    Disable printing of `ok` test cases.

--json=<file>
    Output the test results as JSON to the file specified.
```

<!--
You can also specify exactly which tests to run by specifying one of more
filters after a `--`:
-->
また、`--` の後にフィルタを指定することで、どのテストを実行するかを正確に指定することもできます。

```
./tools/wpt.ts update -- hr-time streams/piping/general
```

### FAQ

<!-- #### Upgrading the wpt submodule: -->
#### wpt サブコマンドのアップデート

```shell
cd test_util/wpt/
# Rebase to retain our modifications
git rebase origin/master
git push denoland
```

<!-- All contributors will need to rerun `./tools/wpt.ts setup` after this. -->
すべてのコントリビューターはこれを実行した後 `./tools/wpt.ts setup` を再実行する必要があります。
