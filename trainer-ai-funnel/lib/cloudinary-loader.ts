// Cloudinary image loader for Next.js
// Docs: https://cloudinary.com/documentation/image_transformations

const CLOUD_NAME = process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME || 'dn4cu83dd';

// Map of original filename -> Cloudinary public ID
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
  
  // Served locally (too large for Cloudinary free tier):
  // 'demo_2.png'
  // 'lets_personalize.png'
};

export default function cloudinaryLoader({
  src,
  width,
  quality,
}: {
  src: string;
  width: number;
  quality?: number;
}) {
  // If it's already a full Cloudinary URL, just return it
  if (src.startsWith('https://res.cloudinary.com')) {
    return src;
  }

  // Look up the public ID in our map
  const publicId = imageMap[src];
  
  if (!publicId) {
    // Fallback to local image if not mapped yet
    console.warn(`[Cloudinary] Image not mapped: ${src} - using local fallback`);
    return `/images/${src}`;
  }

  // Build optimization params
  const params = [
    'f_auto',           // Auto format (WebP, AVIF, etc)
    'c_limit',          // Limit size without cropping
    `w_${width}`,       // Width
    `q_${quality || 'auto'}`,  // Quality
  ];

  return `https://res.cloudinary.com/${CLOUD_NAME}/image/upload/${params.join(',')}/${publicId}`;
}
