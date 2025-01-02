"use client"
import { Monitor, Book, FileQuestion, FileText } from "lucide-react"
import {
    Sidebar,
    SidebarContent,
    SidebarGroup,
    SidebarGroupContent,
    SidebarMenu,
    SidebarMenuButton,
    SidebarMenuItem,
} from "@/components/ui/sidebar"
import Link from "next/link"
// Menu items.
const items = [
    {
        title: "Tutorials",
        url: "/",
        icon: Book,
    },
    {
        title: "Assignments",
        url: "/assignments",
        icon: FileText,
    },
    {
        title: "Quizs",
        url: "/quizs",
        icon: FileQuestion,
    },
    {

        title: "Presentations",
        url: "presentations",
        icon: Monitor,
    }
]

export function AppSidebar() {
    return (
        <Sidebar>
            <SidebarContent>
                <SidebarGroup>
                    <h1 className="text-primary font-bold text-xl mb-5">Reminder Hpa An (CU)</h1>
                    <SidebarGroupContent>
                        <SidebarMenu>
                            {items.map((item) => (
                                <SidebarMenuItem key={item.title} >
                                    <SidebarMenuButton asChild>
                                        <Link href={item.url}>
                                            <item.icon className="text-base" />
                                            <span className="text-base">{item.title}</span>
                                        </Link>
                                    </SidebarMenuButton>
                                </SidebarMenuItem>
                            ))}
                        </SidebarMenu>
                    </SidebarGroupContent>
                </SidebarGroup>
            </SidebarContent>
        </Sidebar>
    )
}
