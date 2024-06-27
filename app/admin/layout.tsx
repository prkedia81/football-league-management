import Sidebar from "@/components/admin/Sidebar";
import LoadingState from "./loading";
import { Suspense } from "react";

export default function Layout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <Suspense fallback={<LoadingState />}>
      <Sidebar>
        <div className="my-2">{children}</div>
      </Sidebar>
    </Suspense>
  );
}
