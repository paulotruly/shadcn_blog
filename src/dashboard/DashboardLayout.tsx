import { useNavigate } from "@tanstack/react-router"
import { useEffect } from "react"
import { getToken } from "../lib/cookies"
import SidebarDashboard from "../components/SidebarDashboard"

function DashboardLayout() {
  const navigate = useNavigate()
  const token = getToken()

  useEffect(() => {
    if (!token) {
      navigate({ to: "/login", replace: true })
    }
  }, [token, navigate])

  if (!token) {
    return null
  }

  return <SidebarDashboard />
}

export default DashboardLayout