import "../styles/globals.css"
import type { AppProps } from "next/app"
import { ThemeProvider } from "../components/theme-provider"
import Head from "next/head"
import { AuthProvider } from "../contexts/AuthContext"
import { NotificationProvider } from "../contexts/NotificationContext"
import { PropertyProvider } from "../contexts/PropertyContext"
import Navbar from "../components/Navbar"
import ThemeToggleButton from "../components/ThemeToggleButton"
import { useRouter } from "next/router"

export default function App({ Component, pageProps }: AppProps) {
  const router = useRouter()
  const isAuthPage = ["/login", "/register"].includes(router.pathname)

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
        <AuthProvider>
          <NotificationProvider>
            <PropertyProvider>
              <div className="min-h-screen bg-background text-foreground transition-colors">
                {!isAuthPage && <Navbar />}
                {!isAuthPage && (
                  <div className="absolute top-4 right-4 z-50">
                    <ThemeToggleButton />
                  </div>
                )}
                <Component {...pageProps} />
              </div>
            </PropertyProvider>
          </NotificationProvider>
        </AuthProvider>
      </ThemeProvider>
    </>
  )
}
