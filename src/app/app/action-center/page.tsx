'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';

export default function ActionCenterPage() {
  const router = useRouter();

  useEffect(() => {
    // Action center is unified into the Dashboard Main Home page
    router.replace('/app');
  }, [router]);

  return null;
}
