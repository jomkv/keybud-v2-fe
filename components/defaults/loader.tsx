import { LoaderCircle } from "lucide-react";
import React from "react";

function Loader(props: React.ComponentProps<typeof LoaderCircle>) {
  return (
    <div className="flex flex-col items-center justify-center h-full w-full">
      <LoaderCircle
        className="animate-spin text-white"
        style={{ animationDuration: "4s" }}
        {...props}
      />
    </div>
  );
}

export default Loader;
