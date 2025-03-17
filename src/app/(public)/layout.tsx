import PublicNavBar from "@/components/ui/public-nav-bar";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <PublicNavBar />
      {children}
    </>
  );
}
