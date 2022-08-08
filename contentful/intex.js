import { createClient } from 'contentful';

// позволяет запрашивать контент из CMS по API по GraphQL

const client = createClient({
  // space: '57jaehl2fmxx',
  // accessToken: '_dBE5E_thxTqsbl4hA9FSjFrzMJZeUmUGbICD86i7Ss',
  space: process.env.SPACE,
  accessToken: process.env.ACCESS_TOKEN,
});

export default client;
