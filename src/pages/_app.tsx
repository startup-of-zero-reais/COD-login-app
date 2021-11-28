import { useEffect } from "react";
import type { AppProps } from 'next/app'
import { CssBaseline, ThemeProvider } from "@mui/material";
import '../presentation/styles/globals.scss'
import { theme } from "@/presentation/styles/shared/theme";
import { EmotionCache } from "@emotion/utils";
import { createEmotionCache } from "@/presentation/utils";
import { CacheProvider } from "@emotion/react";

interface MyAppProps extends AppProps {
    emotionCache?: EmotionCache
}

const clientSideEmotionCache = createEmotionCache()

function MyApp( { Component, pageProps, emotionCache = clientSideEmotionCache }: MyAppProps ) {
    useEffect(() => {
        // Remove the server-side injected CSS.
        const jssStyles = document.querySelector("#jss-server-side");
        if (jssStyles) {
            jssStyles.parentElement?.removeChild(jssStyles);
        }
    }, []);

    return (
        <>
            <CacheProvider value={ emotionCache }>
                <ThemeProvider theme={ theme }>
                    <CssBaseline/>
                    <Component { ...pageProps } />
                </ThemeProvider>
            </CacheProvider>
        </>
    )
}

export default MyApp
