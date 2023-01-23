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
  address: '0x4Dacc35ecEca63546c17e9E8fcb54d8894D455a3',
  abi: CreateActorsABI,
};

export const STORY_CONTRACT = {
  address: '0xc3B6b5d6f21D4fb00c01a6d9ef3d36c6Ce09A793',
  abi: StoryABI,
};
