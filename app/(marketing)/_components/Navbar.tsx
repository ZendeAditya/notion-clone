"use client";
import useScrollTop from "@/hooks/use-scroll-top";
import { cn } from "@/lib/utils";
import React from "react";
import Logo from "./Logo";
import { ModeToggle } from "@/components/mode-toggle";
import { useConvexAuth } from "convex/react";
import { SignInButton, UserButton } from "@clerk/clerk-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { Spinner } from "@/components/spinner";
type Props = {};

const Navbar = (props: Props) => {
  const { isAuthenticated, isLoading } = useConvexAuth();
  const scrolled = useScrollTop();

  return (
    <>
      <div
        className={cn(
          "z-50 dark:bg-[#1F1F1F] fixed top-0 flex items-center w-full p-6",
          scrolled && "border-b shadow-sm"
        )}
      >
        <Logo />
        <div className="md:ml-auto md:justify-end justify-between w-full flex items-center gap-x-2">
          <>
            {isLoading && (
              <p>
                <Spinner />
              </p>
            )}
            {!isAuthenticated && !isLoading && (
              <>
                <SignInButton mode="modal">
                  <Button variant="ghost" size="sm">
                    Log In
                  </Button>
                </SignInButton>
                <SignInButton mode="modal">
                  <Button size="sm">Get Notion Free</Button>
                </SignInButton>
              </>
            )}
            {isAuthenticated && !isLoading && (
              <>
                <Button variant={"ghost"} size={"sm"} asChild>
                  <div>
                    <Link href="/documents">Enter Notion</Link>
                  </div>
                </Button>
                <UserButton afterSignOutUrl="/" />
              </>
            )}
            <>
              <ModeToggle />
            </>
          </>
        </div>
      </div>
    </>
  );
};

export default Navbar;
