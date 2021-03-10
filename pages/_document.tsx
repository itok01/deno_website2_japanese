// Copyright 2020 the Deno authors. All rights reserved. MIT license.

import React from "react";
import Document, {
  Html,
  Head,
  Main,
  NextScript,
  DocumentContext,
  DocumentInitialProps,
} from "next/document";

export default class DenoDocDocument extends Document {
  static async getInitialProps(
    ctx: DocumentContext
  ): Promise<DocumentInitialProps> {
    const initialProps = await Document.getInitialProps(ctx);
    return { ...initialProps };
  }

  gtag_header = `(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
                new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
                j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
                'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
                })(window,document,'script','dataLayer','GTM-P9DQ4WJ');`;
  gtag_body = `<iframe src="https://www.googletagmanager.com/ns.html?id=GTM-P9DQ4WJ"
              height="0" width="0" style="display:none;visibility:hidden"></iframe>`;

  render(): React.ReactElement {
    return (
      // <Html lang="en">
      <Html lang="ja">
        <Head>
          <meta name="twitter:site" content="@deno_land" />
          <meta name="twitter:creator" content="@deno_land" />
          <meta
            name="twitter:title"
            content="Deno - A secure runtime for JavaScript and TypeScript"
          />
          <meta
            name="twitter:description"
            content="Deno is a simple, modern and secure runtime for JavaScript and
            TypeScript that uses V8 and is built in Rust."
          />
          <meta name="twitter:card" content="summary_large_image" />
          <meta property="og:locale" content="en_US" />
          <meta property="og:site_name" content="DenoLand" />
          <meta
            property="og:title"
            content="Deno - A secure runtime for JavaScript and TypeScript"
          />
          <meta
            property="og:description"
            content="Deno is a simple, modern and secure runtime for JavaScript and
            TypeScript that uses V8 and is built in Rust."
          />
          <meta property="og:image" content="/images/icons/icon-512x512.png" />
          <meta property="og:type" content="website" />
          <meta name="robots" content="index, follow" />
          <meta
            name="keywords"
            content="Deno, DenoLand, Development, Javascript, TypeScript"
          />
          <link rel="stylesheet" href="/fonts/inter/inter.css" />
          <link
            href="https://fonts.googleapis.com/css?family=Noto+Sans+JP"
            rel="stylesheet"
          />
          <link
            rel="apple-touch-icon"
            sizes="180x180"
            href="/images/icons/apple-touch-icon-180x180.png"
          />
          <link rel="manifest" href="/site.webmanifest" />
          {/* <!-- Google Tag Manager --> */}
          <script dangerouslySetInnerHTML={{ __html: this.gtag_header }} />
          {/* <!-- End Google Tag Manager --> */}
        </Head>
        <body>
          {/* <!-- Google Tag Manager (noscript) --> */}
          <noscript dangerouslySetInnerHTML={{ __html: this.gtag_body }} />
          {/* <!-- End Google Tag Manager (noscript) --> */}
          <Main />
          <NextScript />
          <script
            defer
            src="https://static.cloudflareinsights.com/beacon.min.js"
            data-cf-beacon='{"token": "1b59386cd9134d5e81c9b0d5b9cb9686"}'
          ></script>
        </body>
      </Html>
    );
  }
}
