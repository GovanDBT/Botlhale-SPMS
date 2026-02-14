/**
 * @file app/loading.tsx
 * @description loading page UI
 */

import { Spinner } from "@/components/ui/spinner";

export default function Loading() {
  return (
    <div className="h-screen flex flex-col">
      <div className="container flex items-center place-content-center h-full">
        <Spinner className="size-10 text-primary" />
      </div>
    </div>
  );
}
