import './globals.css';
import Script from 'next/script';

export const metadata = {
  title: {
    default: 'Lab Studio Fit',
    template: '%s | Lab Studio Fit'
  },
  description:
    'Private personal training and exclusive gym access in Viera, FL. Book a free consultation with Lab Studio Fit.',
  metadataBase: new URL('https://labstudio.fit'),
  openGraph: {
    type: 'website',
    title: 'Lab Studio Fit',
    description:
      "Experience Viera's premier private training studio. No waiting for equipment. No crowds. Just you and your coach.",
    url: 'https://labstudio.fit/viera-private-trainer',
    images: [
      {
        url: 'https://labstudio.fit/images/viera-studio-preview.jpg',
        width: 1200,
        height: 630,
        alt: 'Viera private training studio'
      }
    ]
  },
  robots: {
    index: true,
    follow: true
  },
  alternates: {
    canonical: 'https://labstudio.fit/viera-private-trainer'
  }
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className="scroll-smooth">
      <body className="bg-labDarker text-gray-100 font-sans antialiased overflow-x-hidden">
        {children}
        <Script
          src="https://cdn.tailwindcss.com"
          strategy="beforeInteractive"
        />
        <Script
          id="tailwind-config"
          strategy="beforeInteractive"
          dangerouslySetInnerHTML={{
            __html: `tailwind.config = {
              theme: {
                extend: {
                  fontFamily: {
                    sans: ['Inter', 'sans-serif'],
                  },
                  colors: {
                    labBlue: '#025F9A',
                    labOrange: '#CB611F',
                    labDark: '#0f172a',
                    labDarker: '#020617'
                  }
                }
              }
            };`
          }}
        />
      </body>
    </html>
  );
}
