'use client';

import { useEffect, useState } from 'react';
import { usePathname, useSearchParams } from 'next/navigation';
import { setup } from 'meta-pixel';

export default function MetaPixel() {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const [pixel, setPixel] = useState<ReturnType<typeof setup> | null>(null);

  useEffect(() => {
    const pixelId = process.env.NEXT_PUBLIC_FACEBOOK_PIXEL_ID;
    
    // Only initialize if ID is present and not already initialized
    if (pixelId && !pixel) {
      const p = setup();
      p.init(pixelId);
      setPixel(p);
    }
  }, [pixel]);

  useEffect(() => {
    if (pixel) {
      pixel.pageView();
    }
  }, [pathname, searchParams, pixel]);

  return null;
}
