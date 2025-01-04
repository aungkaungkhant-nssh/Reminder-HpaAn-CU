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
import { cn } from "@/lib/utils"
import { usePathname } from 'next/navigation';

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
    const pathName = usePathname();
    return (
        <Sidebar>
            <SidebarContent>
                <SidebarGroup>
                    <h1 className="text-primary font-bold text-xl mb-7">Reminder Hpa An (CU)</h1>
                    <SidebarGroupContent>
                        <SidebarMenu>
                            {items.map((item) => (
                                <SidebarMenuItem key={item.title} className="my-1" >
                                    <SidebarMenuButton
                                        asChild
                                    >
                                        <Link
                                            href={item.url}
                                            className={cn(
                                                pathName === item.url ? "bg-green-200 text-black" : "bg-gray-100",
                                                "w-full py-5 group hover:bg-green-200 hover:text-black transition-colors duration-300 ease-in-out"
                                            )}
                                        >
                                            <item.icon className="group-hover:font-semibold transition-all duration-300 ease-in-out" />
                                            <span className="text-lg">{item.title}</span>
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
