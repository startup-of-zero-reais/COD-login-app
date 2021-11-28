import type { AppProps } from 'next/app'
import { CssBaseline, ThemeProvider } from "@mui/material";
import '../presentation/styles/globals.scss'
import { theme } from "@/presentation/styles/shared/theme";

function MyApp( { Component, pageProps }: AppProps ) {
	return (
		<>
			<ThemeProvider theme={ theme }>
				<CssBaseline/>
				<Component { ...pageProps } />
			</ThemeProvider>
		</>
	)
}

export default MyApp
