// server
import Head from 'next/head';

export default function CustomHead() {
  return (
    <Head>
      <title>TravelSync - Find Your Perfect Travel Companions</title>
      <meta name="description" content="Connect with fellow travelers and create unforgettable journeys together." />
      <meta name="viewport" content="width=device-width, initial-scale=1" />
      <link rel="icon" href="/favicon.ico" />
      
      {/* TODO: Add Open Graph meta tags */}
      <meta property="og:title" content="TravelSync - Find Your Perfect Travel Companions" />
      <meta property="og:description" content="Connect with fellow travelers and create unforgettable journeys together." />
      <meta property="og:type" content="website" />
      
      {/* TODO: Add Twitter Card meta tags */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content="TravelSync - Find Your Perfect Travel Companions" />
      <meta name="twitter:description" content="Connect with fellow travelers and create unforgettable journeys together." />
    </Head>
  );
}
