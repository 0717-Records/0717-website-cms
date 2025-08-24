import { 
  FaFacebook, 
  FaInstagram, 
  FaYoutube, 
  FaTwitter, 
  FaSoundcloud, 
  FaBandcamp,
  FaSpotify,
  FaApple,
  FaGlobe,
  FaLink
} from 'react-icons/fa';

export type SocialPlatform = 
  | 'facebook'
  | 'instagram'
  | 'youtube'
  | 'twitter'
  | 'soundcloud'
  | 'bandcamp'
  | 'spotify'
  | 'itunes'
  | 'officialWebsite'
  | 'genericLink';

interface SocialIconConfig {
  icon: React.ComponentType<{ className?: string }>;
  label: string;
  color?: string; // Optional for platform-specific colors if needed later
}

export const socialIconMap: Record<SocialPlatform, SocialIconConfig> = {
  facebook: {
    icon: FaFacebook,
    label: 'Facebook',
  },
  instagram: {
    icon: FaInstagram,
    label: 'Instagram',
  },
  youtube: {
    icon: FaYoutube,
    label: 'YouTube',
  },
  twitter: {
    icon: FaTwitter,
    label: 'X/Twitter',
  },
  soundcloud: {
    icon: FaSoundcloud,
    label: 'SoundCloud',
  },
  bandcamp: {
    icon: FaBandcamp,
    label: 'Bandcamp',
  },
  spotify: {
    icon: FaSpotify,
    label: 'Spotify',
  },
  itunes: {
    icon: FaApple,
    label: 'Apple Music',
  },
  officialWebsite: {
    icon: FaGlobe,
    label: 'Official Website',
  },
  genericLink: {
    icon: FaLink,
    label: 'Link',
  },
};

interface SocialIconProps {
  platform: SocialPlatform;
  className?: string;
}

export const SocialIcon: React.FC<SocialIconProps> = ({ platform, className = '' }) => {
  const config = socialIconMap[platform];
  const IconComponent = config.icon;
  
  return <IconComponent className={className} />;
};

// Helper function to get the platform type from a URL or field name
export const getPlatformFromField = (fieldName: string): SocialPlatform => {
  switch (fieldName) {
    case 'facebook': return 'facebook';
    case 'instagram': return 'instagram';
    case 'youtube': return 'youtube';
    case 'twitter': return 'twitter';
    case 'soundcloud': return 'soundcloud';
    case 'bandcamp': return 'bandcamp';
    case 'spotify': return 'spotify';
    case 'itunes': return 'itunes';
    case 'officialWebsite': return 'officialWebsite';
    default: return 'genericLink';
  }
};

// Helper function to get platform label
export const getPlatformLabel = (platform: SocialPlatform): string => {
  return socialIconMap[platform].label;
};