import { Outlet, useLocation } from "react-router-dom"
import { useEffect } from "react"
import { AppSidebar } from "@/components/app-sidebar"
import { routeConfig } from "@/config/routes"
import {
    Breadcrumb,
    BreadcrumbItem,
    BreadcrumbLink,
    BreadcrumbList,
    BreadcrumbPage,
    BreadcrumbSeparator,
} from "@/components/ui/breadcrumb"
import { Separator } from "@/components/ui/separator"
import {
    SidebarInset,
    SidebarProvider,
    SidebarTrigger,
} from "@/components/ui/sidebar"

export default function MainLayout() {
    const location = useLocation()

    useEffect(() => {
        // Tự động cuộn lên đầu trang (lên cả window và nếu có phần tử cuộn bên trong)
        window.scrollTo(0, 0)
        const mainScrollContainer = document.querySelector('.overflow-auto') || document.querySelector('.overflow-y-auto');
        if (mainScrollContainer) {
            mainScrollContainer.scrollTo(0, 0)
        }
    }, [location.pathname])

    let activeItemTitle = "Home"
    for (const group of routeConfig.navMain) {
        const foundItem = group.items.find(item => item.url === location.pathname)
        if (foundItem) {
            activeItemTitle = foundItem.title
            break
        }
    }

    return (
        <SidebarProvider>
            <AppSidebar />
            <SidebarInset>
                <header className="flex h-16 shrink-0 items-center gap-2 border-b px-4">
                    <SidebarTrigger className="-ml-1" />
                    <Separator
                        orientation="vertical"
                        className="mr-2 data-[orientation=vertical]:h-5 my-auto"
                    />
                    <Breadcrumb>
                        <BreadcrumbList>
                            <BreadcrumbItem className="hidden md:block">
                                <BreadcrumbLink href="/">@vn-gis/windify-gis</BreadcrumbLink>
                            </BreadcrumbItem>
                            <BreadcrumbSeparator className="hidden md:block" />
                            <BreadcrumbItem>
                                <BreadcrumbPage>{activeItemTitle}</BreadcrumbPage>
                            </BreadcrumbItem>
                        </BreadcrumbList>
                    </Breadcrumb>
                </header>
                <div className="flex flex-1 flex-col gap-4 p-4">
                    <Outlet />
                </div>
            </SidebarInset>
        </SidebarProvider>
    )
}
