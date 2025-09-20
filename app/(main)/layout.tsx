import LeftSidebar from "@/app/(main)/components/sidebars/left-sidebar";
import RightSidebar from "@/app/(main)/components/sidebars/right-sidebar";

export default function MainLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="flex justify-center min-h-screen relative">
      <div className="sticky top-0 h-screen w-[5rem] 2xl:w-[15rem] me-[1rem] 2xl:me-[2.5rem] py-5 flex-shrink-0">
        <LeftSidebar />
      </div>
      <div className="w-[45rem] min-h-screen border-s-[1px] border-e-[1px] border-solid border-neutral-700 flex flex-col divide-y divide-neutral-700">
        {children}
      </div>
      <div className="sticky top-0 h-screen w-[5rem] 2xl:w-[20rem] ms-[1rem] 2xl:ms-[2.5rem] py-5 flex-shrink-0">
        <RightSidebar />
      </div>
    </div>
  );
}
