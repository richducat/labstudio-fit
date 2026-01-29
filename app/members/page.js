import Script from 'next/script';

export const metadata = {
  title: 'The Lab Ultimate Members'
};

export default function MembersPage() {
  return (
    <main className="min-h-screen bg-zinc-950 text-zinc-100">
      <div id="root" />
      <Script src="/members/boot.js" strategy="afterInteractive" />
    </main>
  );
}
