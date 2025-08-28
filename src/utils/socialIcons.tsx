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
import { SOCIAL_PLATFORMS, getPlatformByKey } from '@/sanity/schemaTypes/shared/platformsConfig';

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

const iconComponents = {
  facebook: FaFacebook,
  instagram: FaInstagram,
  youtube: FaYoutube,
  twitter: FaTwitter,
  soundcloud: FaSoundcloud,
  bandcamp: FaBandcamp,
  spotify: FaSpotify,
  itunes: FaApple,
  officialWebsite: FaGlobe,
  genericLink: FaLink,
};

// Generate socialIconMap from the shared configuration
export const socialIconMap: Record<SocialPlatform, SocialIconConfig> = 
  SOCIAL_PLATFORMS.reduce((acc, platform) => {
    acc[platform.key as SocialPlatform] = {
      icon: iconComponents[platform.key as keyof typeof iconComponents],
      label: platform.label,
    };
    return acc;
  }, {} as Record<SocialPlatform, SocialIconConfig>);

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
  const platform = getPlatformByKey(fieldName);
  return (platform?.key as SocialPlatform) || 'genericLink';
};

// Helper function to get platform label
export const getPlatformLabel = (platform: SocialPlatform): string => {
  return socialIconMap[platform].label;
};

// Helper function to get all available platforms
export const getAllPlatforms = () => SOCIAL_PLATFORMS;

// Helper function to get platform config
export const getPlatformConfig = (platform: string) => getPlatformByKey(platform);