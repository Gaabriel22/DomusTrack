import "@/styles/globals.css"
import type { AppProps } from "next/app"
import { ThemeProvider } from "../components/theme-provider"
import Head from "next/head"

export default function App({ Component, pageProps }: AppProps) {
  return (
    <>
      <Head>
        <title>DomusTrack</title>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta
          name="description"
          content="Gestão de manutenção com cuidado e organização."
        />
        <link rel="icon" href="/DomusTrack.ico" />
      </Head>

      <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
        {/* Aqui podemos envolver com contextos globais futuramente, exemplo: */}
        {/* <AuthContextProvider> */}
        <Component {...pageProps} />
        {/* </AuthContextProvider> */}
      </ThemeProvider>
    </>
  )
}
