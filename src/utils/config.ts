import { mainnet, goerli, polygon, polygonMumbai } from '@wagmi/chains';

export const SITE_NAME = 'DePub';
export const SITE_DESCRIPTION = 'The Decentralised Publishing Platform';

export const SOCIAL_TWITTER = '';
export const SOCIAL_GITHUB = '';

export const ETH_CHAINS = [polygonMumbai];

export const SERVER_SESSION_SETTINGS = {
  cookieName: SITE_NAME,
  password:
    process.env.SESSION_PASSWORD ??
    'UPDATE_TO_complex_password_at_least_32_characters_long',
  cookieOptions: {
    secure: process.env.NODE_ENV === 'production',
  },
};
