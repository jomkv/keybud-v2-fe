import clsx from "clsx";
import { LoaderCircle } from "lucide-react";
import React from "react";

function Loader(props: React.ComponentProps<typeof LoaderCircle>) {
  const { className, ...rest } = props;

  return (
    <div className="flex flex-col items-center justify-center h-full w-full">
      <LoaderCircle
        className={clsx("animate-spin text-white", className)}
        style={{ animationDuration: "4s" }}
        {...rest}
      />
    </div>
  );
}

export default Loader;
