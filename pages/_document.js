import Document, { Html, Head, Main, NextScript } from 'next/document'

class MyDocument extends Document {
  static async getInitialProps(ctx) {
    const initialProps = await Document.getInitialProps(ctx)
    return { ...initialProps }
  }

  render() {
    return (
      <Html>
        <Head>
          <link href="https://fonts.googleapis.com/css2?family=Dancing+Script:wght@500&display=swap" rel="stylesheet" />
        </Head>
        <body>
          <Main />
          <NextScript />
          {/* Here I am adding the modal wrapper */}
          <div id="modal-root"></div>
        </body>
      </Html>
    )
  }
}

export default MyDocument