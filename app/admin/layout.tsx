import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Admin Portal — Dr. Bharat Bhushan Clinic',
  description: 'Secure admin panel for clinic management',
  robots: { index: false, follow: false },
};

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen" style={{ background: '#060d28' }}>
      {children}
    </div>
  );
}
