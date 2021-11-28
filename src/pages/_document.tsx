import React from 'react';
import Document, { DocumentContext, Head, Html, Main, NextScript } from "next/document";
import createEmotionServer from "@emotion/server/create-instance"
import { createEmotionCache } from "@/presentation/utils";

class MyDocument extends Document {
    static async getInititalProps( ctx: DocumentContext ) {
        const originalRenderPage = ctx.renderPage;

        const cache = createEmotionCache()
        const { extractCriticalToChunks } = createEmotionServer(cache)

        ctx.renderPage = () => originalRenderPage({
            // eslint-disable-next-line react/display-name
            enhanceApp: ( App: any ) => ( props ) => <App emotionCache={ cache } { ...props } />,
        })

        const initialProps = await Document.getInitialProps(ctx)

        const emotionStyles = extractCriticalToChunks(initialProps.html)
        const emotionStylesTags = emotionStyles.styles.map(style => (
            <style
                data-emotion={ `${ style.key } ${ style.ids.join(" ") }` }
                key={ style.key }
                dangerouslySetInnerHTML={ { __html: style.css } }
            />
        ))

        return {
            ...initialProps,
            styles: [ ...React.Children.toArray(initialProps.styles), ...emotionStylesTags ]
        }
    }

    render() {
        return (
            <Html lang={ "pt-BR" }>
                <Head>
                    <link rel="preconnect" href="https://fonts.googleapis.com"/>
                    <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin={ "true" }/>
                    <link
                        href="https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;500;700&display=swap"
                        rel="stylesheet"
                    />
                    <link
                        href="https://fonts.googleapis.com/css2?family=Red+Hat+Display:wght@400;500;700&display=swap"
                        rel="stylesheet"
                    />
                    <link
                        href="https://fonts.googleapis.com/css2?family=Montserrat:wght@300;400;500;700&display=swap"
                        rel="stylesheet"
                    />
                </Head>
                <body>
                <Main/>
                <NextScript/>
                </body>
            </Html>
        )
    }
}

export default MyDocument;