import * as React from "react"
import { useLocation, Link } from "react-router-dom"
import { routeConfig } from "@/config/routes"

import { SearchForm } from "@/components/search-form"
import { VersionSwitcher } from "@/components/version-switcher"
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarRail,
} from "@/components/ui/sidebar"




export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  const location = useLocation()

  React.useEffect(() => {
    // Tìm phần tử menu đang active và cuộn nó ra giữa khung nhìn của Sidebar
    const activeItem = document.getElementById("active-sidebar-item")
    if (activeItem) {
      // Đợi 1 chút để Sidebar render/mở rộng hoàn tất rồi mới cuộn
      setTimeout(() => {
        activeItem.scrollIntoView({ behavior: "smooth", block: "center" })
      }, 100)
    }
  }, [location.pathname])

  return (
    <Sidebar {...props}>
      <SidebarHeader>
        <VersionSwitcher
          versions={routeConfig.versions}
          defaultVersion={routeConfig.versions[0]}
        />
        <SearchForm />
      </SidebarHeader>
      <SidebarContent>
        {routeConfig.navMain.map((item) => (
          <SidebarGroup key={item.title}>
            <SidebarGroupLabel>{item.title}</SidebarGroupLabel>
            <SidebarGroupContent>
              <SidebarMenu>
                {item.items.map((item) => (
                  <SidebarMenuItem key={item.title}>
                    <SidebarMenuButton
                      id={location.pathname === item.url ? "active-sidebar-item" : undefined}
                      isActive={location.pathname === item.url}
                      render={<Link to={item.url} />}
                    >
                      {item.title}
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                ))}
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>
        ))}
      </SidebarContent>
      <SidebarRail />
    </Sidebar>
  )
}
