'use client';

import { useEffect, useMemo, useState } from 'react';

export default function HomePage() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const schemaMarkup = useMemo(
    () => ({
      '@context': 'https://schema.org',
      '@type': 'ExerciseGym',
      name: 'Lab Studio Fit - Viera Private Training',
      parentOrganization: {
        '@type': 'Organization',
        name: 'Lab Studio Fit'
      },
      url: 'https://labstudio.fit/viera-private-trainer',
      address: {
        '@type': 'PostalAddress',
        streetAddress: 'Your Studio Street Address',
        addressLocality: 'Melbourne',
        addressRegion: 'FL',
        postalCode: '32940',
        addressCountry: 'US'
      },
      geo: {
        '@type': 'GeoCoordinates',
        latitude: 28.26,
        longitude: -80.72
      },
      areaServed: 'Viera, FL',
      priceRange: '$$$'
    }),
    []
  );

  useEffect(() => {
    document.body.classList.toggle('overflow-hidden', isMenuOpen);

    return () => {
      document.body.classList.remove('overflow-hidden');
    };
  }, [isMenuOpen]);

  const closeMenu = () => setIsMenuOpen(false);

  const handleConsultationClick = () => {
    alert('This is a demo. Hook this up to your email service!');
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schemaMarkup) }}
      />
      <div className="bg-labBlue text-white text-xs py-2 px-4 text-center font-semibold tracking-wide">
        <span className="inline-block mr-2">
          <i className="fas fa-map-marker-alt" /> SERVING VIERA, SUNTREE & 32940
        </span>
        <span className="hidden sm:inline">|</span>
        <span className="inline-block ml-2">
          <i className="fas fa-bolt" /> NEW CLIENT SPECIAL: FREE CONSULTATION
        </span>
      </div>

      <nav className="sticky top-0 z-50 bg-labDarker/95 backdrop-blur border-b border-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-20 items-center">
            <div className="flex-shrink-0 flex items-center">
              <a href="/" className="text-3xl font-black italic tracking-tighter text-white">
                LAB <span className="text-labBlue">STUDIO</span> FIT
              </a>
            </div>

            <div className="hidden md:flex space-x-8 items-center">
              <a href="#home" className="text-gray-300 hover:text-white transition font-medium">
                Home
              </a>
              <a href="#training" className="text-gray-300 hover:text-white transition font-medium">
                Personal Training
              </a>
              <a href="#why-private" className="text-gray-300 hover:text-white transition font-medium">
                Why Private
              </a>
              <a
                href="#location-details"
                className="text-gray-300 hover:text-white transition font-medium"
              >
                Location
              </a>
              <a href="#faq" className="text-gray-300 hover:text-white transition font-medium">
                FAQ
              </a>
              <a href="/members" className="text-gray-300 hover:text-white transition font-medium">
                Member Login
              </a>
              <a
                href="#contact"
                className="bg-labOrange hover:bg-orange-700 text-white px-6 py-2 rounded-full font-bold transition transform hover:scale-105 shadow-lg"
              >
                Book Now
              </a>
            </div>

            <div className="md:hidden flex items-center">
              <button
                id="menu-btn"
                className="text-white hover:text-labBlue focus:outline-none"
                onClick={() => setIsMenuOpen(true)}
                aria-label="Open menu"
              >
                <i className="fas fa-bars text-2xl" />
              </button>
            </div>
          </div>
        </div>

        <div
          id="mobile-menu"
          className={`fixed inset-0 bg-labDarker z-50 pt-20 px-6 space-y-6 md:hidden ${
            isMenuOpen ? 'open' : ''
          }`}
        >
          <button
            id="close-menu"
            className="absolute top-6 right-6 text-white text-3xl"
            onClick={closeMenu}
            aria-label="Close menu"
          >
            <i className="fas fa-times" />
          </button>
          <a
            href="#home"
            className="block text-2xl font-bold text-white border-b border-gray-800 pb-2"
            onClick={closeMenu}
          >
            Home
          </a>
          <a
            href="#training"
            className="block text-2xl font-bold text-white border-b border-gray-800 pb-2"
            onClick={closeMenu}
          >
            Personal Training
          </a>
          <a
            href="#why-private"
            className="block text-2xl font-bold text-white border-b border-gray-800 pb-2"
            onClick={closeMenu}
          >
            Why Private
          </a>
          <a
            href="#location-details"
            className="block text-2xl font-bold text-white border-b border-gray-800 pb-2"
            onClick={closeMenu}
          >
            Location
          </a>
          <a
            href="#faq"
            className="block text-2xl font-bold text-white border-b border-gray-800 pb-2"
            onClick={closeMenu}
          >
            FAQ
          </a>
          <a
            href="/members"
            className="block text-2xl font-bold text-white border-b border-gray-800 pb-2"
            onClick={closeMenu}
          >
            Member Login
          </a>
          <a
            href="#contact"
            className="block text-center w-full bg-labOrange text-white py-4 rounded-lg font-bold text-xl mt-8"
            onClick={closeMenu}
          >
            Book Free Consult
          </a>
        </div>
      </nav>

      <section
        id="home"
        className="relative h-screen min-h-[600px] flex items-center clip-slant"
      >
        <div className="absolute inset-0 z-0">
          <img
            src="https://images.unsplash.com/photo-1571902943202-507ec2618e8f?q=80&w=1975&auto=format&fit=crop"
            alt="Private Personal Trainer Viera Gym"
            className="w-full h-full object-cover opacity-60"
          />
        </div>
        <div className="absolute inset-0 hero-overlay z-10" />

        <div className="relative z-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
          <div className="max-w-3xl">
            <span className="text-labOrange font-bold tracking-widest uppercase mb-2 block">
              Located in the heart of 32940
            </span>
            <h1 className="text-5xl md:text-7xl font-black text-white mb-6 leading-tight text-shadow">
              Premier Private <br />
              <span className="text-labOrange">Personal Training</span> in Viera, FL
            </h1>
            <p className="text-xl md:text-2xl text-gray-300 mb-8 font-light max-w-2xl">
              The exclusivity of a private studio. The intensity of a pro gym. Located in the
              heart of 32940.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <a
                href="#contact"
                className="bg-labOrange hover:bg-orange-700 text-white px-8 py-4 rounded-full font-bold text-lg text-center transition shadow-lg shadow-orange-900/50"
              >
                Book Your Private Assessment
              </a>
              <a
                href="#why-private"
                className="bg-transparent border-2 border-white hover:bg-white hover:text-labDarker text-white px-8 py-4 rounded-full font-bold text-lg text-center transition"
              >
                Why Private Training
              </a>
            </div>
            <div className="mt-8 flex items-center space-x-6 text-sm text-gray-400">
              <div className="flex items-center">
                <i className="fas fa-check text-labBlue mr-2" /> 24/7 Access
              </div>
              <div className="flex items-center">
                <i className="fas fa-check text-labBlue mr-2" /> No Crowds
              </div>
              <div className="flex items-center">
                <i className="fas fa-check text-labBlue mr-2" /> Certified Pros
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-20 bg-labDarker">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
            The Premier <span className="text-labBlue">Private Gym</span> in Viera
          </h2>
          <p className="text-gray-400 max-w-3xl mx-auto text-lg leading-relaxed">
            Lab Studio Fit is not a crowded commercial fitness center. We are a private
            training facility located near <strong>Viera Blvd (32940)</strong>, dedicated to
            clients who demand privacy, expert coaching, and real results. Whether you are
            looking for weight loss, strength training, or injury rehab, our certified{' '}
            <strong>personal trainers</strong> build a custom roadmap for your body.
          </p>
        </div>
      </section>

      <section id="why-private" className="py-20 bg-gray-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <span className="text-labOrange font-bold uppercase tracking-wider">
              Why Private Training
            </span>
            <h2 className="text-4xl font-bold text-white mt-2">
              Why Viera Residents Choose Private Training
            </h2>
            <p className="text-gray-400 max-w-3xl mx-auto mt-4 text-lg">
              Experience Viera&apos;s premier private training studio. No waiting for equipment. No
              crowds. Just you and your coach.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-labDarker p-8 rounded-2xl border border-gray-800">
              <h3 className="text-2xl font-bold text-white mb-4">Escape the Crowds</h3>
              <p className="text-gray-400">
                Stop waiting for racks at the big box gyms on Wickham Rd. At{' '}
                <strong>Lab Studio Fit</strong>, your session is truly private.
              </p>
            </div>
            <div className="bg-labDarker p-8 rounded-2xl border border-gray-800">
              <h3 className="text-2xl font-bold text-white mb-4">Focused 1-on-1 Coaching</h3>
              <p className="text-gray-400">
                We don&apos;t do generic classes. We build data-driven programs tailored to your
                physiology.
              </p>
            </div>
            <div className="bg-labDarker p-8 rounded-2xl border border-gray-800">
              <h3 className="text-2xl font-bold text-white mb-4">High-End Facility</h3>
              <p className="text-gray-400">
                Experience a clean, tech-forward environment designed for the Viera and Suntree
                professional.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section id="training" className="py-20 bg-gray-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <span className="text-labOrange font-bold uppercase tracking-wider">Our Services</span>
            <h2 className="text-4xl font-bold text-white mt-2">How We Get You Results</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-labDarker p-8 rounded-2xl border border-gray-800 hover:border-labBlue transition group">
              <div className="h-14 w-14 bg-labBlue/20 rounded-full flex items-center justify-center mb-6 group-hover:bg-labBlue transition">
                <i className="fas fa-dumbbell text-2xl text-labBlue group-hover:text-white" />
              </div>
              <h3 className="text-2xl font-bold text-white mb-4">1-on-1 Personal Training</h3>
              <p className="text-gray-400 mb-6">
                The fastest way to reach your goals. A dedicated coach creates your workouts,
                tracks your nutrition, and corrects your form in every single session.
              </p>
              <ul className="text-sm text-gray-500 space-y-2 mb-8">
                <li>
                  <i className="fas fa-check text-green-500 mr-2" /> Custom Workout Plan
                </li>
                <li>
                  <i className="fas fa-check text-green-500 mr-2" /> Nutritional Guidance
                </li>
                <li>
                  <i className="fas fa-check text-green-500 mr-2" /> Accountability
                </li>
              </ul>
              <a href="#contact" className="text-labBlue font-bold hover:text-white transition">
                Learn More &rarr;
              </a>
            </div>

            <div className="bg-labDarker p-8 rounded-2xl border border-gray-800 hover:border-labBlue transition group relative overflow-hidden">
              <div className="absolute top-0 right-0 bg-labOrange text-white text-xs font-bold px-3 py-1 rounded-bl-lg">
                POPULAR
              </div>
              <div className="h-14 w-14 bg-labBlue/20 rounded-full flex items-center justify-center mb-6 group-hover:bg-labBlue transition">
                <i className="fas fa-users text-2xl text-labBlue group-hover:text-white" />
              </div>
              <h3 className="text-2xl font-bold text-white mb-4">Semi-Private Training</h3>
              <p className="text-gray-400 mb-6">
                Get the expertise of a personal trainer at a fraction of the cost. Train in small
                groups (2-4 people) for high energy and community motivation.
              </p>
              <ul className="text-sm text-gray-500 space-y-2 mb-8">
                <li>
                  <i className="fas fa-check text-green-500 mr-2" /> Lower Cost Per Session
                </li>
                <li>
                  <i className="fas fa-check text-green-500 mr-2" /> High Energy Atmosphere
                </li>
                <li>
                  <i className="fas fa-check text-green-500 mr-2" /> Individual Modifications
                </li>
              </ul>
              <a href="#contact" className="text-labBlue font-bold hover:text-white transition">
                Learn More &rarr;
              </a>
            </div>

            <div className="bg-labDarker p-8 rounded-2xl border border-gray-800 hover:border-labBlue transition group">
              <div className="h-14 w-14 bg-labBlue/20 rounded-full flex items-center justify-center mb-6 group-hover:bg-labBlue transition">
                <i className="fas fa-key text-2xl text-labBlue group-hover:text-white" />
              </div>
              <h3 className="text-2xl font-bold text-white mb-4">Private Gym Access</h3>
              <p className="text-gray-400 mb-6">
                For the experienced lifter. Get 24/7 keycard access to our facility. No waiting
                for racks, no crowds, just high-end equipment and focus.
              </p>
              <ul className="text-sm text-gray-500 space-y-2 mb-8">
                <li>
                  <i className="fas fa-check text-green-500 mr-2" /> 24/7 Keycard Entry
                </li>
                <li>
                  <i className="fas fa-check text-green-500 mr-2" /> Capped Membership
                </li>
                <li>
                  <i className="fas fa-check text-green-500 mr-2" /> Shower & Towel Service
                </li>
              </ul>
              <a href="#contact" className="text-labBlue font-bold hover:text-white transition">
                Inquire Now &rarr;
              </a>
            </div>
          </div>
        </div>
      </section>

      <section id="coach-admin" className="py-20 bg-labDarker">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <span className="text-labOrange font-bold uppercase tracking-wider">
              Coach + Admin Experience
            </span>
            <h2 className="text-4xl font-bold text-white mt-2">
              Powerful Tools That Run the Business
            </h2>
            <p className="text-gray-400 max-w-3xl mx-auto mt-4 text-lg">
              Built for scale, the platform gives coaches a live client view, automation, and
              deep performance tracking without extra admin overhead.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <div className="bg-gray-900 border border-gray-800 rounded-2xl p-8">
              <h3 className="text-2xl font-bold text-white mb-3">A. Client Management</h3>
              <p className="text-gray-400 mb-4">
                Coaches can open a client&apos;s view (&ldquo;what you see is what the client gets&rdquo;),
                review today&apos;s schedule, check progress, and highlight achievements.
              </p>
              <ul className="text-sm text-gray-500 space-y-2">
                <li>
                  <i className="fas fa-check text-labBlue mr-2" /> Real-time Today view reviews
                </li>
                <li>
                  <i className="fas fa-check text-labBlue mr-2" /> Progress tracking and
                  milestones
                </li>
              </ul>
            </div>

            <div className="bg-gray-900 border border-gray-800 rounded-2xl p-8">
              <h3 className="text-2xl font-bold text-white mb-3">
                B. Master Libraries + Templates
              </h3>
              <p className="text-gray-400 mb-4">
                Store, tag, and duplicate workouts from a master library, then copy them into
                programs or client plans.
              </p>
              <ul className="text-sm text-gray-500 space-y-2">
                <li>
                  <i className="fas fa-check text-labBlue mr-2" /> 70+ workouts and 60+ programs
                  ready to import
                </li>
                <li>
                  <i className="fas fa-check text-labBlue mr-2" /> Fast edits and re-use at scale
                </li>
              </ul>
            </div>

            <div className="bg-gray-900 border border-gray-800 rounded-2xl p-8">
              <h3 className="text-2xl font-bold text-white mb-3">C. Program Calendar Engine</h3>
              <p className="text-gray-400 mb-4">
                Schedule workouts, cardio, reminders, progress-photo prompts, body stats prompts,
                and auto-messages into a calendar that powers each client&apos;s Today view.
              </p>
              <ul className="text-sm text-gray-500 space-y-2">
                <li>
                  <i className="fas fa-check text-labBlue mr-2" /> Drag-and-drop calendar with
                  real-time updates
                </li>
                <li>
                  <i className="fas fa-check text-labBlue mr-2" /> Recurring subscription
                  workflows
                </li>
              </ul>
            </div>

            <div className="bg-gray-900 border border-gray-800 rounded-2xl p-8">
              <h3 className="text-2xl font-bold text-white mb-3">
                G. Integrations for Running the Business
              </h3>
              <p className="text-gray-400 mb-4">
                Import custom exercise videos from YouTube and connect Zapier workflows for
                forms, payments, waivers, and email marketing.
              </p>
              <ul className="text-sm text-gray-500 space-y-2">
                <li>
                  <i className="fas fa-check text-labBlue mr-2" /> Works with Google
                  Forms/Typeform, PayPal/Square, and Sign tools
                </li>
                <li>
                  <i className="fas fa-check text-labBlue mr-2" /> Integrations for ABC Glofox,
                  ABC Ignite, and Mindbody
                </li>
              </ul>
            </div>

            <div className="bg-gray-900 border border-gray-800 rounded-2xl p-8">
              <h3 className="text-2xl font-bold text-white mb-3">
                H. White-Label / Custom Branded Apps
              </h3>
              <p className="text-gray-400 mb-4">
                White-label iOS + Android apps with Pro, Studio, and Enterprise levels, including
                custom app icons, themed navigation, welcome videos, and dedicated store listings.
              </p>
              <ul className="text-sm text-gray-500 space-y-2">
                <li>
                  <i className="fas fa-check text-labBlue mr-2" /> Branding options vary by plan
                </li>
                <li>
                  <i className="fas fa-check text-labBlue mr-2" /> Full client-facing experience
                  under your name
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      <section id="facility" className="py-20 bg-labDarker relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-4xl font-bold text-white mb-6">
                A Gym Built for <span className="text-labBlue">Performance</span>
              </h2>
              <p className="text-gray-400 text-lg mb-6">
                Located conveniently in the Suntree Business Center, Lab Studio Fit is equipped
                with everything you need and nothing you don&apos;t.
              </p>
              <ul className="space-y-4 mb-8">
                <li className="flex items-start">
                  <i className="fas fa-check-circle text-labOrange mt-1 mr-3" />
                  <div>
                    <h4 className="text-white font-bold">Private Atmosphere</h4>
                    <p className="text-sm text-gray-500">No filming, no crowds, just work.</p>
                  </div>
                </li>
                <li className="flex items-start">
                  <i className="fas fa-check-circle text-labOrange mt-1 mr-3" />
                  <div>
                    <h4 className="text-white font-bold">Top-Tier Equipment</h4>
                    <p className="text-sm text-gray-500">
                      Squat racks, deadlift platforms, cables, and functional turf.
                    </p>
                  </div>
                </li>
                <li className="flex items-start">
                  <i className="fas fa-check-circle text-labOrange mt-1 mr-3" />
                  <div>
                    <h4 className="text-white font-bold">Clean &amp; Sanitized</h4>
                    <p className="text-sm text-gray-500">
                      We take pride in a spotless facility.
                    </p>
                  </div>
                </li>
              </ul>
              <a
                href="#contact"
                className="inline-block bg-white text-labDarker px-8 py-3 rounded-full font-bold hover:bg-gray-200 transition"
              >
                Schedule a Tour
              </a>
            </div>
            <div className="relative">
              <div className="absolute -inset-4 bg-labBlue/30 rounded-lg blur-lg" />
              <img
                src="https://images.unsplash.com/photo-1593079831268-3381b0db4a77?q=80&w=1469&auto=format&fit=crop"
                alt="Gym Interior Viera"
                className="relative rounded-lg shadow-2xl border border-gray-700"
              />
            </div>
          </div>
        </div>
      </section>

      <section id="location-details" className="py-20 bg-gray-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <span className="text-labOrange font-bold uppercase tracking-wider">Serving 32940</span>
            <h2 className="text-4xl font-bold text-white mt-2">Serving the 32940 Community</h2>
            <p className="text-gray-400 max-w-3xl mx-auto mt-4 text-lg">
              We are conveniently located for residents of <strong>Viera East, Viera West, and
              Suntree</strong>. Whether you are coming from the Avenues or the Country Club,
              effective private training is just minutes away.
            </p>
          </div>
          <div className="bg-labDarker border border-gray-800 rounded-2xl h-72 flex items-center justify-center text-gray-400">
            <p>
              <em>[Embed Google Map Here targeted to 32940]</em>
            </p>
          </div>
        </div>
      </section>

      <section id="faq" className="py-20 bg-labDarker">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <span className="text-labOrange font-bold uppercase tracking-wider">FAQ</span>
            <h2 className="text-4xl font-bold text-white mt-2">Frequently Asked Questions</h2>
          </div>
          <div className="space-y-4 max-w-3xl mx-auto">
            <details className="bg-gray-900 border border-gray-800 rounded-xl p-6">
              <summary className="cursor-pointer text-white font-bold">
                Is this a membership gym or private studio?
              </summary>
              <p className="text-gray-400 mt-3">
                We are a private studio. Unlike public gyms in Melbourne, we focus exclusively
                on scheduled 1-on-1 personal training sessions.
              </p>
            </details>
            <details className="bg-gray-900 border border-gray-800 rounded-xl p-6">
              <summary className="cursor-pointer text-white font-bold">
                Do you serve the Suntree area?
              </summary>
              <p className="text-gray-400 mt-3">
                Yes, we are just a short drive for all Suntree residents looking for a private
                gym alternative.
              </p>
            </details>
          </div>
        </div>
      </section>

      <section id="about" className="py-20 bg-gray-900 border-t border-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <div className="order-2 md:order-1">
              <div className="relative rounded-lg overflow-hidden shadow-2xl border border-gray-700">
                <img
                  src="https://images.unsplash.com/photo-1567013127542-490d757e51fc?q=80&w=1374&auto=format&fit=crop"
                  alt="Personal Trainer Viera"
                  className="w-full h-full object-cover"
                />
                <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black to-transparent p-6">
                  <p className="text-white font-bold text-lg">Your Name / Head Trainer</p>
                  <p className="text-labOrange text-sm">Owner &amp; Founder</p>
                </div>
              </div>
            </div>
            <div className="order-1 md:order-2">
              <span className="text-labOrange font-bold uppercase tracking-wider">About Us</span>
              <h2 className="text-4xl font-bold text-white mt-2 mb-6">More Than Just A Gym</h2>
              <p className="text-gray-400 text-lg mb-6 leading-relaxed">
                Lab Studio Fit was founded to solve a problem: big box gyms are crowded, dirty,
                and distracting. We built a sanctuary for serious fitness in{' '}
                <strong>Viera &amp; Melbourne</strong>.
              </p>
              <p className="text-gray-400 text-lg mb-8 leading-relaxed">
                Our philosophy is simple: Environment dictates performance. When you train here,
                you aren&apos;t just renting equipment; you are joining a private community focused
                on elite standards, whether you are a pro athlete or a busy parent reclaiming your
                health.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <div className="flex items-center text-gray-300">
                  <i className="fas fa-certificate text-labBlue mr-3 text-xl" />
                  <span>Certified Experts</span>
                </div>
                <div className="flex items-center text-gray-300">
                  <i className="fas fa-heart text-labBlue mr-3 text-xl" />
                  <span>Locally Owned</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-20 bg-gray-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold text-white mb-12">What Our Clients Say</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-labDarker p-6 rounded-xl shadow-lg text-left">
              <div className="flex text-yellow-400 mb-4">
                <i className="fas fa-star" />
                <i className="fas fa-star" />
                <i className="fas fa-star" />
                <i className="fas fa-star" />
                <i className="fas fa-star" />
              </div>
              <p className="text-gray-300 italic mb-4">
                &quot;Hands down the best personal training experience in Viera. I&apos;ve lost 15lbs in
                2 months and my back pain is gone. The private studio vibe makes a huge
                difference.&quot;
              </p>
              <p className="text-white font-bold">- Sarah M., Suntree</p>
            </div>
            <div className="bg-labDarker p-6 rounded-xl shadow-lg text-left">
              <div className="flex text-yellow-400 mb-4">
                <i className="fas fa-star" />
                <i className="fas fa-star" />
                <i className="fas fa-star" />
                <i className="fas fa-star" />
                <i className="fas fa-star" />
              </div>
              <p className="text-gray-300 italic mb-4">
                &quot;I love that I can come in at 2am or 2pm with my keycard and never have to wait
                for equipment. It&apos;s clean, cold, and professional.&quot;
              </p>
              <p className="text-white font-bold">- Mike T., Melbourne</p>
            </div>
            <div className="bg-labDarker p-6 rounded-xl shadow-lg text-left">
              <div className="flex text-yellow-400 mb-4">
                <i className="fas fa-star" />
                <i className="fas fa-star" />
                <i className="fas fa-star" />
                <i className="fas fa-star" />
                <i className="fas fa-star" />
              </div>
              <p className="text-gray-300 italic mb-4">
                &quot;The trainers here actually care. They don&apos;t just count reps; they teach you how
                to lift correctly. Highly recommend!&quot;
              </p>
              <p className="text-white font-bold">- Jessica R., Viera</p>
            </div>
          </div>
          <div className="mt-10">
            <a
              href="https://g.page/r/YOUR_GOOGLE_LINK"
              target="_blank"
              rel="noreferrer"
              className="text-labBlue hover:text-white underline"
            >
              Read more reviews on Google
            </a>
          </div>
        </div>
      </section>

      <section id="contact" className="py-20 bg-labBlue relative overflow-hidden">
        <div className="absolute inset-0 bg-labDarker/90" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            <div className="text-white">
              <h2 className="text-4xl font-bold mb-6">Start Your Journey Today</h2>
              <p className="text-gray-300 mb-8">
                Fill out the form to schedule your free consultation or facility tour. We will
                get back to you within 24 hours.
              </p>

              <div className="space-y-6">
                <div className="flex items-start">
                  <div className="flex-shrink-0 bg-labOrange p-3 rounded-lg">
                    <i className="fas fa-map-marker-alt text-xl text-white" />
                  </div>
                  <div className="ml-4">
                    <h3 className="text-lg font-bold">Location</h3>
                    <p className="text-gray-300">
                      Your Studio Street Address<br />Melbourne, FL 32940
                    </p>
                  </div>
                </div>

                <div className="flex items-start">
                  <div className="flex-shrink-0 bg-labOrange p-3 rounded-lg">
                    <i className="fas fa-phone text-xl text-white" />
                  </div>
                  <div className="ml-4">
                    <h3 className="text-lg font-bold">Phone</h3>
                    <p className="text-gray-300">+1-321-555-0100</p>
                  </div>
                </div>

                <div className="flex items-start">
                  <div className="flex-shrink-0 bg-labOrange p-3 rounded-lg">
                    <i className="fas fa-envelope text-xl text-white" />
                  </div>
                  <div className="ml-4">
                    <h3 className="text-lg font-bold">Email</h3>
                    <p className="text-gray-300">info@labstudio.fit</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-2xl p-8 shadow-2xl">
              <form action="#" method="POST" className="space-y-4">
                <div>
                  <label className="block text-gray-700 font-bold mb-2" htmlFor="contact-name">
                    Name
                  </label>
                  <input
                    id="contact-name"
                    type="text"
                    className="w-full bg-gray-100 border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:border-labBlue"
                    placeholder="Your Name"
                  />
                </div>
                <div>
                  <label
                    className="block text-gray-700 font-bold mb-2"
                    htmlFor="contact-email"
                  >
                    Email
                  </label>
                  <input
                    id="contact-email"
                    type="email"
                    className="w-full bg-gray-100 border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:border-labBlue"
                    placeholder="john@example.com"
                  />
                </div>
                <div>
                  <label className="block text-gray-700 font-bold mb-2" htmlFor="contact-goal">
                    Goal
                  </label>
                  <select
                    id="contact-goal"
                    className="w-full bg-gray-800 text-white border border-gray-700 rounded-lg px-4 py-3 focus:outline-none focus:border-labBlue"
                  >
                    <option className="bg-gray-800 text-white">Weight Loss</option>
                    <option className="bg-gray-800 text-white">Muscle Gain</option>
                    <option className="bg-gray-800 text-white">Private Gym Access</option>
                    <option className="bg-gray-800 text-white">General Fitness</option>
                  </select>
                </div>
                <button
                  type="button"
                  onClick={handleConsultationClick}
                  className="w-full bg-labDarker text-white font-bold py-4 rounded-lg hover:bg-labBlue transition"
                >
                  Request Free Consultation
                </button>
              </form>
            </div>
          </div>
        </div>
      </section>

      <footer className="bg-black text-gray-500 py-12 border-t border-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
            <div itemScope itemType="http://schema.org/ExerciseGym">
              <h3 className="text-white text-lg font-bold mb-4" itemProp="name">
                Lab Studio Fit
              </h3>
              <div
                itemProp="address"
                itemScope
                itemType="http://schema.org/PostalAddress"
                className="text-sm space-y-1"
              >
                <p>
                  <span itemProp="streetAddress">Your Studio Street Address</span>
                  <br />
                  <span itemProp="addressLocality">Melbourne</span>,{' '}
                  <span itemProp="addressRegion">FL</span>{' '}
                  <span itemProp="postalCode">32940</span>
                </p>
              </div>
              <p className="text-sm mt-3">
                Phone: <span itemProp="telephone">+1-321-555-0100</span>
              </p>
              <p className="text-sm mt-3">
                Top-rated Private Gym in Viera &amp; Suntree.
              </p>
            </div>
            <div>
              <h3 className="text-white text-lg font-bold mb-4">Quick Links</h3>
              <ul className="space-y-2 text-sm">
                <li>
                  <a href="#home" className="hover:text-white">
                    Home
                  </a>
                </li>
                <li>
                  <a href="#training" className="hover:text-white">
                    Personal Training
                  </a>
                </li>
                <li>
                  <a href="#why-private" className="hover:text-white">
                    Why Private
                  </a>
                </li>
                <li>
                  <a href="#location-details" className="hover:text-white">
                    Location
                  </a>
                </li>
                <li>
                  <a href="#faq" className="hover:text-white">
                    FAQ
                  </a>
                </li>
                <li>
                  <a href="#contact" className="hover:text-white">
                    Contact
                  </a>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="text-white text-lg font-bold mb-4">Service Areas</h3>
              <p className="text-sm">Viera (32940), Suntree, Melbourne, Rockledge, Cocoa Beach.</p>
            </div>
          </div>
          <div className="border-t border-gray-800 pt-8 text-center text-xs">
            &copy; 2026 Lab Studio Fit. All Rights Reserved.
          </div>
        </div>
      </footer>
    </>
  );
}
