/**
 *  @file app/components/NotFoundPage.tsx
 *  @description page not found component
 */
"use client";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight } from "lucide-react";

const NotFoundPage = () => {
  const router = useRouter();
  return (
    <div className="container h-full flex flex-col items-center place-content-center space-y-7">
      {/* Header */}
      <div className="text-center space-y-4">
        <h2 className="text-3xl font-bold text-primary">Oops!</h2>
        <h2 className="text-8xl font-extrabold bg-linear-to-r from-primary via-primary to-secondary bg-clip-text text-transparent">
          404
        </h2>
        <h2 className="text-3xl font-bold text-primary">Page Not Found</h2>
      </div>
      {/* Description */}
      <p className="text-[16px] lg:max-w-5/10 text-center text-zinc-500 font-medium">
        The page or resource your looking for could not be found. Please use the
        buttons below to navigate back or return to home page.
      </p>
      {/* Buttons */}
      <div className="flex items-center gap-8">
        <Button
          className="hover:bg-[#6471ad] pr-5! cursor-pointer"
          onClick={() => router.back()}
        >
          <ChevronLeft />
          Previous Page
        </Button>
        <Button
          onClick={() => router.push("/")}
          className="hover:bg-[#6471ad] pl-5! cursor-pointer"
        >
          Return Home <ChevronRight />
        </Button>
      </div>
    </div>
  );
};

export default NotFoundPage;
