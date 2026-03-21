/**
 * @file app/(landing)/components/Navbar.tsx
 * @description Navigation menu component
 */
"use client";
import { Button } from "@/components/ui/button";
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
} from "@/components/ui/navigation-menu";
import { ScrollArea } from "@/components/ui/scroll-area";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { CircleX, Menu } from "lucide-react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";

const Navbar = () => {
  // routes button to login page
  const router = useRouter();
  // Get the current path
  const pathname = usePathname();
  return (
    <nav className="relative">
      {/* Utility Bar */}
      {/* <div className="hidden lg:block bg-primary text-white py-2">
        <div className="container text-center font-bold text-[13px]">
          Some message related to the app
        </div>
      </div> */}
      <div className="container flex items-center justify-between py-4">
        {/* Logo */}
        <span>Logo</span>

        {/* menu items - Desktop view only */}
        <NavigationMenu className="hidden lg:inline-flex">
          <NavigationMenuList className="flex gap-8">
            {/* Home */}
            <NavigationMenuItem>
              <NavigationMenuLink asChild>
                <Link href="/" className={`${pathname === "/" && "active"}`}>
                  Home
                </Link>
              </NavigationMenuLink>
            </NavigationMenuItem>
            {/* About Us */}
            <NavigationMenuItem>
              <NavigationMenuLink asChild>
                <Link
                  href="/about"
                  className={`${pathname === "/about" && "active"}`}
                >
                  About Us
                </Link>
              </NavigationMenuLink>
            </NavigationMenuItem>
            {/* Features */}
            <NavigationMenuItem>
              <NavigationMenuLink asChild>
                <Link href="/features">Features</Link>
              </NavigationMenuLink>
            </NavigationMenuItem>
          </NavigationMenuList>
        </NavigationMenu>

        {/* menu button - Desktop view only */}
        <Button
          className="button hidden lg:inline-flex"
          onClick={() => router.push("/auth/login")}
        >
          Sign In
        </Button>

        {/* burger / sheet - tablet or mobile view only */}
        <Sheet>
          <SheetTrigger asChild className="lg:hidden">
            <Menu
              size={28}
              strokeWidth={2.5}
              className="text-primary cursor-pointer"
            />
          </SheetTrigger>
          <SheetContent
            side="left"
            className="[&>button:first-of-type]:hidden flex flex-col lg:hidden"
          >
            {/* Menu Header */}
            <SheetHeader>
              <SheetTitle className="flex justify-between items-center">
                logo
                <SheetClose
                  className="cursor-pointer focus:outline-none"
                  title="close menu"
                >
                  <CircleX size={24} className="text-primary" />
                </SheetClose>
              </SheetTitle>
            </SheetHeader>

            {/* Menu items */}
            <ScrollArea className="flex-1 overflow-y-auto">
              <NavigationMenu viewport={false} className="max-w-full">
                <div className="w-full text-center px-4">
                  <NavigationMenuList className="flex flex-col space-y-4">
                    {/* Home */}
                    <NavigationMenuItem className="w-full">
                      <NavigationMenuLink asChild>
                        <Link
                          href="/"
                          className={`${
                            pathname === "/" && "active"
                          } text-[16px]`}
                        >
                          Home
                        </Link>
                      </NavigationMenuLink>
                    </NavigationMenuItem>
                    {/* About Us */}
                    <NavigationMenuItem className="w-full">
                      <NavigationMenuLink asChild>
                        <Link
                          href="/about"
                          className={`${
                            pathname === "/about" && "active"
                          } text-[16px]`}
                        >
                          About Us
                        </Link>
                      </NavigationMenuLink>
                    </NavigationMenuItem>
                    {/* Features */}
                    <NavigationMenuItem className="w-full">
                      <NavigationMenuLink asChild>
                        <Link href="/features" className="text-[16px]">
                          Features
                        </Link>
                      </NavigationMenuLink>
                    </NavigationMenuItem>
                  </NavigationMenuList>
                </div>
              </NavigationMenu>
            </ScrollArea>

            {/* Menu Buttons */}
            <SheetFooter>
              {/* Sign in Button */}
              <Button
                className="button"
                onClick={() => router.push("/auth/login")}
              >
                Sign In
              </Button>
            </SheetFooter>
          </SheetContent>
        </Sheet>
      </div>
    </nav>
  );
};

export default Navbar;
