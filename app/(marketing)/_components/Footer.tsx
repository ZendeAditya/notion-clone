import React from "react";
import Logo from "./Logo";
import { Button } from "@/components/ui/button";

type Props = {};

const Footer = (props: Props) => {
  return (
    <div className="flex items-center w-full p-6 z-50 dark:bg-[#1F1F1F]">
      <Logo />
      <div className="md:ml-auto w-full justify-between md:justify-end flex items-center gap-x-2 text-gray-400">
        <Button variant={"ghost"} size={"sm"}>
          Privacy Policy
        </Button>
        <Button variant="ghost" size="sm">
          Terms & conditions
        </Button>
      </div>
    </div>
  );
};

export default Footer;
