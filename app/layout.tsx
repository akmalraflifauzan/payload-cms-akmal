import "./(frontend)/globals.css";

export const metadata = {
  title: "Payload CMS My App",
  description: "Root layout required by Next App Router",
};

export default function RootLayout({ children }: { children: any }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
