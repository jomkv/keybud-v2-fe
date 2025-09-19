import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const TABS: {
  value: string;
  label: string;
}[] = [
  {
    value: "posts",
    label: "Posts",
  },
  {
    value: "comments",
    label: "Comments",
  },
  {
    value: "media",
    label: "Media",
  },
  {
    value: "stars",
    label: "Stars",
  },
];

function ProfileTab() {
  return (
    <Tabs defaultValue={TABS[0].value}>
      <TabsList className="w-full justify-evenly bg-black">
        {TABS.map((tab, key) => (
          <TabsTrigger
            key={key}
            value={tab.value}
            className="flex-1 data-[state=active]:border-b-2 data-[state=active]:border-b-[#8c53fe] rounded-none text-md"
          >
            {tab.label}
          </TabsTrigger>
        ))}
      </TabsList>
      <TabsContent value="account">
        Make changes to your account here.
      </TabsContent>
      <TabsContent value="password">Change your password here.</TabsContent>
    </Tabs>
  );
}

export default ProfileTab;
