import HomePage from './home-page';

export const metadata = {
  title: 'Private Personal Trainer Viera FL | Exclusive Gym 32940',
  description:
    'Looking for a private gym in Viera? Lab Studio Fit offers exclusive 1-on-1 personal training near Viera Blvd. No crowds, just results. Book a consultation.',
  keywords: [
    'Private Personal Trainer Viera',
    'Private Gym Viera',
    'Personal Training 32940',
    'Exclusive Gym Suntree',
    'Lab Studio Fit'
  ],
  authors: [{ name: 'Lab Studio Fit' }],
  alternates: {
    canonical: 'https://labstudio.fit/viera-private-trainer'
  },
  openGraph: {
    title: 'Private Personal Training in Viera - Lab Studio Fit',
    description:
      "Experience Viera's premier private training studio. No waiting for equipment. No crowds. Just you and your coach.",
    url: 'https://labstudio.fit/viera-private-trainer',
    type: 'website',
    images: [
      {
        url: 'https://labstudio.fit/images/viera-studio-preview.jpg',
        width: 1200,
        height: 630,
        alt: 'Viera private training studio'
      }
    ]
  }
};

export default function Page() {
  return <HomePage />;
}
