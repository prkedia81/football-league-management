import Sidebar from "@/components/admin/Sidebar";

export default function Layout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <Sidebar>
      <div className="my-2">{children}</div>
    </Sidebar>
  );
}
