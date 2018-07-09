import Document, { Head, Main, NextScript } from 'next/document';
import React from 'react';

export default class MyDocument extends Document {
    static async getInitialProps(ctx) {
        const initialProps = await Document.getInitialProps(ctx);
        return { ...initialProps };
    }

    render() {
        return (
            <html>
                <Head>
                    <link rel="icon" type="image/x-icon" href="/favicon.ico" />
                    <style>{`body {
                           font-family: Verdana, Geneva, sans-serif;
                           font-size: 15px;
                           color: black;
                           display: flex;
                           flex-direction: column;
                           text-align: center;
                        } /* custom! */`}</style>
                </Head>
                <body className="custom_class">
                    <Main />
                    <NextScript />
                </body>
            </html>
        );
    }
}
