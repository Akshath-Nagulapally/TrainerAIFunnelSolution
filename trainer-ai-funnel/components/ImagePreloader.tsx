'use client';

import { useEffect } from 'react';
import { useOnboarding } from '@/context/OnboardingContext';
import { screens } from '@/lib/screens';
import { infoScreens } from '@/lib/questions';

const CLOUD_NAME = process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME || 'dn4cu83dd';

// Same map as in cloudinary-loader.ts - keep in sync!
const imageMap: Record<string, string> = {
  // Main images
  'demo_1.png': 'images/intro_1_mhcsew',
  'iphone-frame.svg': 'images/iphone-frame_pgwbn2',
  'basics_start.png': 'images/basics_start_fgpng9',
  'guider_goal.png': 'images/guider_goal_jupjun',
  'notification_bell.png': 'images/notification_bell_wg9zrj',
  'ninetysixpercent_reasons_image.png': 'images/ninetysixpercent_reasons_image_n1qecy',
  'onappstore.png': 'images/onappstore_wme6qd',
  'logo.png': 'images/logo_teb3mo',
  'app_icon.png': 'images/app_icon_s9tufa',
  
  // Body composition images
  'threetofour_man.png': 'images/threetofour_man_rdqn5t',
  'fivetoseven_man.png': 'images/fivetoseven_man_nqztia',
  'eighttotwelve_man.jpg': 'images/eighttotwelve_man_iqa6ku',
  'thirteentoseventeen_man.png': 'images/thirteentoseventeen_man_uygfho',
  'eighteentotwentythree_man.png': 'images/eighteentotwentythree_man_gkub3n',
  'twentyfourtotwentynine_man.png': 'images/twentyfourtotwentynine_man_jclxii',
  'thirtytothirtyfour_man.png': 'images/thirtytothirtyfour_man_hcnwhn',
  'thirtyfivetothirtynine_man.png': 'images/thirtyfivetothirtynine_man_kw9zsc',
  'fortyplus_man.png': 'images/fortyplus_man_q4n54l',
  'personalized.png': 'personalized_rt8v5f',
};

// Helper to build Cloudinary URL for preloading
function getCloudinaryUrl(src: string, width: number = 800) {
  const publicId = imageMap[src];
  if (!publicId) {
    // Fallback to local
    return `/images/${src}`;
  }
  return `https://res.cloudinary.com/${CLOUD_NAME}/image/upload/f_auto,c_limit,w_${width},q_auto/${publicId}`;
}

// All images that need preloading in the funnel
const allImages = [
  // Info screen images
  'demo_1.png',
  'demo_2.png',
  'iphone-frame.svg',
  'lets_personalize.png',
  'basics_start.png',
  'guider_goal.png',
  'personalized.png',
  'notification_bell.png',
  // Body composition images
  'threetofour_man.png',
  'fivetoseven_man.png',
  'eighttotwelve_man.jpg',
  'thirteentoseventeen_man.png',
  'eighteentotwentythree_man.png',
  'twentyfourtotwentynine_man.png',
  'thirtytothirtyfour_man.png',
  'thirtyfivetothirtynine_man.png',
  'fortyplus_man.png',
  // Other images
  'ninetysixpercent_reasons_image.png',
];

export function ImagePreloader() {
  const { state } = useOnboarding();

  useEffect(() => {
    // Get images for next few screens
    const imagesToPreload = getUpcomingImages(state.currentStep, 5);
    
    // Preload each image
    imagesToPreload.forEach((src) => {
      const img = new Image();
      img.src = getCloudinaryUrl(src);
    });
  }, [state.currentStep]);

  // Also preload all images on initial mount for best experience
  useEffect(() => {
    // Preload all images after a small delay to not block initial render
    const timer = setTimeout(() => {
      allImages.forEach((src) => {
        const img = new Image();
        img.src = getCloudinaryUrl(src);
      });
    }, 1000);

    return () => clearTimeout(timer);
  }, []);

  return null; // This component doesn't render anything
}

// Get images for the next N screens
function getUpcomingImages(currentStep: number, count: number): string[] {
  const images: string[] = [];
  
  for (let i = 0; i < count; i++) {
    const screenIndex = currentStep + i;
    if (screenIndex >= screens.length) break;
    
    const screen = screens[screenIndex];
    
    // Check if it's an info screen with an image
    if (screen.template === 'InfoScreen') {
      const screenData = infoScreens[screen.id];
      if (screenData?.image) {
        images.push(screenData.image);
      }
    }
  }
  
  return images;
}
