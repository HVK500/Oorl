import axios from 'axios';

export const getShortUrl = (url: string): string => {
  if (url.length > 700) return url;

  // axios.get().then();

  return url;
};
