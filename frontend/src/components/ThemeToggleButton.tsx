"use client"

import { useTheme } from "next-themes"
import { useEffect, useState } from "react"
import { FiMoon, FiSun } from "react-icons/fi"

const ThemeToggleButton = () => {
  const { theme, setTheme } = useTheme()
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) return null

  return (
    <button
      onClick={() => setTheme(theme === "light" ? "dark" : "light")}
      className="fixed bottom-4 right-4 p-3 bg-gray-700 text-white rounded-full shadow-lg hover:bg-gray-800 transition-all"
    >
      {theme === "light" ? <FiMoon size={24} /> : <FiSun size={24} />}
    </button>
  )
}

export default ThemeToggleButton
