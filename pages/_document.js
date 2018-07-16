import Document, { Head, Main, NextScript } from 'next/document';
import React from 'react';
import { extractCritical } from 'emotion-server';

export default class MyDocument extends Document {
    static async getInitialProps(ctx) {
        const page = ctx.renderPage();
        const styles = extractCritical(page.html);
        return { ...page, ...styles };
        //return { ...(await Document.getInitialProps(ctx))};
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
                    <style
                        dangerouslySetInnerHTML={{ __html: this.props.css }}
                    />
                </Head>
                <body className="custom_class">
                    <Main />
                    <NextScript />
                </body>
            </html>
        );
    }
}
