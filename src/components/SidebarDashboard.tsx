import { Link, useNavigate } from "@tanstack/react-router"
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarHeader,
  SidebarInset,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarProvider,
  SidebarRail,
} from "./ui/sidebar"
import { FileText, LogOut } from "lucide-react"
import { useAuth } from "@/context/AuthContext"
import { getToken, removeToken } from "@/lib/cookies"

const menuItems = [
  { label: "Posts", icon: FileText, to: "/" },
]

function SidebarDashboard() {

  const { logout } = useAuth()
  const navigate = useNavigate()
  const token = getToken()

  const handleLogout = () => {
    logout()
    removeToken()
    navigate({ to: "/login" })
  }

  return (
    <SidebarProvider>
      <Sidebar variant="inset" className="bg-slate-800 w-72 border-r-0">
        
        <SidebarHeader>
          <div className="flex items-center gap-2 px-2 py-4">
            <h2 className="text-xl font-bold text-white">dashboard</h2>
          </div>
        </SidebarHeader>

        <SidebarContent>
          <SidebarGroup>
            <SidebarGroupContent>
              <SidebarMenu>
                {menuItems.map((item) => (
                  <SidebarMenuItem key={item.label}>
                    <SidebarMenuButton asChild>
                      <Link to={item.to} className="text-white text-lg">
                        <item.icon/>
                        <span>{item.label}</span>
                      </Link>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                ))}
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>
        </SidebarContent>

        <SidebarFooter>
          <SidebarMenu>
            <SidebarMenuItem>
              <SidebarMenuButton onClick={handleLogout} className="text-white">
                <LogOut/>
                <span>Sair</span>
              </SidebarMenuButton>
            </SidebarMenuItem>
          </SidebarMenu>
        </SidebarFooter>

      </Sidebar>

      <SidebarInset className=" bg-yellow-900">
          <h1>Dashboard</h1>
      </SidebarInset>
    </SidebarProvider>
  )
}

export default SidebarDashboard
