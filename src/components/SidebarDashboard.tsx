import { Link, useNavigate, Outlet } from "@tanstack/react-router"
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
} from "./ui/sidebar"
import { FileText, LogOut } from "lucide-react"
import { useAuth } from "@/context/AuthContext"
import { removeToken } from "@/lib/cookies"
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar"

const menuItems = [
  { label: "Posts", icon: FileText, to: "/dashboard/posts" },
]

function SidebarDashboard() {
  const { user, userDetails, logout } = useAuth()
  const navigate = useNavigate()

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

        <SidebarFooter className="border-t border-slate-700 pt-4">
          <div className="flex items-center gap-3 px-2">
            
            <Avatar className="h-9 w-9 border-2 border-slate-600">
              <AvatarImage src={userDetails?.image} alt={userDetails?.firstName} />
              {/* mostra a primeira letra do nome se a imagem não carregar */}
              <AvatarFallback className="bg-slate-700 text-white text-sm">
                {userDetails?.firstName?.charAt(0) || user?.username?.charAt(0)}
              </AvatarFallback>
            </Avatar>

            <div className="flex flex-col">
              <span className="text-sm font-medium text-white">
                {userDetails?.firstName} {userDetails?.lastName}
              </span>
              <span className="text-xs text-slate-400">
                @{user?.username}
              </span>
            </div>

            <button
              onClick={handleLogout}
              className="ml-auto p-2 hover:bg-slate-700 rounded-md transition-colors"
              title="Sair"
            >
              <LogOut size={18} className="text-slate-400 hover:text-white" />
            </button>
          </div>
        </SidebarFooter>

      </Sidebar>

      <SidebarInset className="bg-slate-950 w-full min-h-screen text-white p-10">
        <Outlet/>
      </SidebarInset>
    </SidebarProvider>
  )
}

export default SidebarDashboard
