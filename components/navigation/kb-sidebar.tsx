import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuBadge,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import { Icon } from "@iconify/react";

// Menu items.
const items = [
  {
    title: "Home",
    url: "#",
    icon: "ph:house",
  },
  {
    title: "Messages",
    url: "#",
    icon: "ph:envelope-simple",
  },
  {
    title: "Notifications",
    url: "#",
    icon: "ph:bell-simple",
  },
  {
    title: "Search",
    url: "#",
    icon: "ph:magnifying-glass",
  },
  {
    title: "Settings",
    url: "#",
    icon: "ph:gear",
  },
];

function KbSidebar() {
  return (
    <Sidebar>
      <SidebarHeader />
      <SidebarContent>
        <SidebarGroup>
          {/* <SidebarGroupLabel>Application</SidebarGroupLabel> */}
          <SidebarGroupContent>
            <SidebarMenu>
              {items.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild>
                    <a href={item.url}>
                      <Icon icon={item.icon} className="text-4xl" />
                      <span>{item.title}</span>
                    </a>
                  </SidebarMenuButton>
                  {item.title === "Notifications" && (
                    <SidebarMenuBadge>24</SidebarMenuBadge>
                  )}
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
        <SidebarGroup />
      </SidebarContent>
      <SidebarFooter />
    </Sidebar>
  );
}

export default KbSidebar;
