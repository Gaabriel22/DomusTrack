import "../styles/globals.css"
import type { AppProps } from "next/app"
import { ThemeProvider } from "../components/theme-provider"
import Head from "next/head"
import { AuthProvider } from "../contexts/AuthContext"
import { NotificationProvider } from "../contexts/NotificationContext"
import { PropertyProvider } from "../contexts/PropertyContext"

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
        {/* Providers globais */}
        <AuthProvider>
          <NotificationProvider>
            <PropertyProvider>
              <Component {...pageProps} />
            </PropertyProvider>
          </NotificationProvider>
        </AuthProvider>
      </ThemeProvider>
    </>
  )
}
