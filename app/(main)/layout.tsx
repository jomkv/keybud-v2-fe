import LeftSidebar from "@/components/navigation/left-sidebar";

export default function MainLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="flex justify-center items-center h-screen">
      <div className="h-full w-[5rem] 2xl:w-[15rem] me-[1rem] 2xl:me-[2.5rem]">
        <LeftSidebar />
      </div>
      <div className="w-[45rem] h-full border-s-2 border-e-2 border-solid border-neutral-700">
        {children}
      </div>
      <div className="h-full w-[5rem] 2xl:w-[20rem] ms-[1rem] 2xl:ms-[2.5rem]">
        <div className="w-full h-full hidden xl:block">yooo</div>
      </div>
    </div>
  );
}
