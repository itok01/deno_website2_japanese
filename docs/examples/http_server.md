<!-- # Simple HTTP web server -->
# 簡単なHTTP webサーバー

<!-- ## Concepts -->
## 概念

- Use Deno's integrated HTTP server to run your own web server.

<!-- ## Overview -->
## 概要

<!--
With just a few lines of code you can run your own HTTP web server with control
over the response status, request headers and more.
-->
数行のコードでレスポンスステータスやリクエストヘッダーなどをコントールできるHTTP webサーバーを実行することができます。

> ℹ️ The _native_ HTTP server is currently unstable, meaning the API is not
> finalized and may change in breaking ways in future version of Deno. To have
> the APIs discussed here available, you must run Deno with the `--unstable`
> flag.

<!-- ## Sample web server -->
## 簡単なwebサーバー

<!-- In this example, the user-agent of the client is returned to the client: -->
この例では、クライアントのuser-agentがクライアントに返されます:

**webserver.ts**:

```ts
// Start listening on port 8080 of localhost.
const server = Deno.listen({ port: 8080 });
console.log(`HTTP webserver running.  Access it at:  http://localhost:8080/`);

// Connections to the server will be yielded up as an async iterable.
for await (const conn of server) {
  // In order to not be blocking, we need to handle each connection individually
  // in its own async function.
  (async () => {
    // This "upgrades" a network connection into an HTTP connection.
    const httpConn = Deno.serveHttp(conn);
    // Each request sent over the HTTP connection will be yielded as an async
    // iterator from the HTTP connection.
    for await (const requestEvent of httpConn) {
      // The native HTTP server uses the web standard `Request` and `Response`
      // objects.
      const body = `Your user-agent is:\n\n${requestEvent.request.headers.get(
        "user-agent",
      ) ?? "Unknown"}`;
      // The requestEvent's `.respondWith()` method is how we send the response
      // back to the client.
      requestEvent.respondWith(
        new Response(body, {
          status: 200,
        }),
      );
    }
  })();
}
```

Then run this with:

```shell
deno run --allow-net --unstable webserver.ts
```

Then navigate to `http://localhost:8080/` in a browser.
