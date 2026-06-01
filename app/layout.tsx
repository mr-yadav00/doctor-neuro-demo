import type { Metadata } from "next";
import { Inter, Plus_Jakarta_Sans } from "next/font/google";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const plusJakarta = Plus_Jakarta_Sans({
  subsets: ["latin"],
  variable: "--font-plus-jakarta",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Dr. Bharat Bhushan | Neurologist & Healthcare Specialist | Rajasthan",
  description:
    "Dr. Bharat Bhushan – Expert Neurologist & Healthcare Specialist in Rajasthan, India. Book appointment for Neurology, Brain & Nerve Care, General Medicine, Diabetes Management. 10,000+ patients treated. Call +91 8696352862.",
  keywords: [
    "Dr Bharat Bhushan",
    "Neurologist Rajasthan",
    "Brain specialist India",
    "Neurology clinic Rajasthan",
    "nerve specialist",
    "headache treatment",
    "epilepsy treatment",
    "SiteLab India",
    "healthcare specialist",
  ],
  authors: [{ name: "SiteLab India", url: "https://sitelabindia.in" }],
  creator: "SiteLab India",
  publisher: "SiteLab India",
  openGraph: {
    title: "Dr. Bharat Bhushan | Expert Neurologist | Rajasthan",
    description:
      "Premium healthcare by Dr. Bharat Bhushan – Top Neurologist in Rajasthan. Book your appointment today.",
    type: "website",
    locale: "en_IN",
    siteName: "Dr. Bharat Bhushan Neuro & Healthcare Clinic",
  },
  twitter: {
    card: "summary_large_image",
    title: "Dr. Bharat Bhushan | Neurologist | Rajasthan",
    description:
      "Expert Neurology & Healthcare. Book appointment: +91 8696352862",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "MedicalBusiness",
    "name": "Dr. Bharat Bhushan Neuro & Healthcare Clinic",
    "image": "https://sitelabindia.in/logo.png",
    "@id": "https://sitelabindia.in/#clinic",
    "url": "https://sitelabindia.in",
    "telephone": "+918696352862",
    "priceRange": "$$",
    "address": {
      "@type": "PostalAddress",
      "streetAddress": "Dr. Bharat Bhushan Neuro & Healthcare Clinic",
      "addressLocality": "Rajasthan",
      "addressRegion": "Rajasthan",
      "addressCountry": "IN"
    },
    "geo": {
      "@type": "GeoCoordinates",
      "latitude": 27.0238,
      "longitude": 74.2179
    },
    "openingHoursSpecification": [
      {
        "@type": "OpeningHoursSpecification",
        "dayOfWeek": [
          "Monday",
          "Tuesday",
          "Wednesday",
          "Thursday",
          "Friday",
          "Saturday"
        ],
        "opens": "09:00",
        "closes": "13:00"
      },
      {
        "@type": "OpeningHoursSpecification",
        "dayOfWeek": [
          "Monday",
          "Tuesday",
          "Wednesday",
          "Thursday",
          "Friday",
          "Saturday"
        ],
        "opens": "16:00",
        "closes": "19:00"
      },
      {
        "@type": "OpeningHoursSpecification",
        "dayOfWeek": "Sunday",
        "opens": "10:00",
        "closes": "12:00"
      }
    ],
    "sameAs": [
      "https://sitelabindia.in"
    ],
    "employee": {
      "@type": "Physician",
      "name": "Dr. Bharat Bhushan",
      "medicalSpecialty": [
        "Neurology",
        "GeneralMedicine"
      ]
    }
  };

  return (
    <html lang="en" className={`${inter.variable} ${plusJakarta.variable}`}>
      <head>
        <link rel="canonical" href="https://sitelabindia.in" />
        <meta name="geo.region" content="IN-RJ" />
        <meta name="geo.placename" content="Rajasthan, India" />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body className="min-h-screen antialiased">{children}</body>
    </html>
  );
}

