import KbSidebar from "@/components/navigation/kb-sidebar";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";

export default function MainLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <SidebarProvider>
      <KbSidebar />
      <main>
        <SidebarTrigger />
        {children}
      </main>
    </SidebarProvider>
  );
}
