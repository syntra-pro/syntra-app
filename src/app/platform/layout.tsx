export const metadata = {
  title: 'Syntra',
  description: '',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children};</>;
}
