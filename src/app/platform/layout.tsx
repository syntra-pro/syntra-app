export const metadata = {
  title: "Daosphere",
  description: "by SeedLatam",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children};</>;
}
