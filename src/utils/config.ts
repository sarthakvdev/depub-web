import { mainnet, goerli, polygon, polygonMumbai } from '@wagmi/chains';
const CreateActorsABI = require('../abi/CreateActors.json');
const StoryABI = require('../abi/Story.json');

export const SITE_NAME = 'DePub';
export const SITE_DESCRIPTION = 'The Decentralised Publishing Platform';

export const SOCIAL_TWITTER = '';
export const SOCIAL_GITHUB = '';

export const ETH_CHAINS = [mainnet, polygonMumbai];

export const SERVER_SESSION_SETTINGS = {
  cookieName: SITE_NAME,
  password:
    process.env.SESSION_PASSWORD ??
    'UPDATE_TO_complex_password_at_least_32_characters_long',
  cookieOptions: {
    secure: process.env.NODE_ENV === 'production',
  },
};

export const CREATEACTORS_CONTRACT = {
  address: '0x4AAfA67575E670E95c955c6Ddde00ea6949FF676',
  abi: CreateActorsABI,
};

export const STORY_CONTRACT = {
  address: '0xe02f23448bBCFF6ddE897F2842CD9ef768120912',
  abi: StoryABI,
};
