export const metadata = {
  title: 'Hot Dogueres',
  description: 'Clube Hot Dogueres',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="pt-BR">
      <body style={{ margin: 0 }}>{children}</body>
    </html>
  );
}
