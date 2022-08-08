import { createClient } from 'contentful';

// позволяет запрашивать контент из CMS по API по GraphQL

const client = createClient({
  // space: String(process.env.SPACE),
  // accessToken: String(process.env.ACCESS_TOKEN),
  space: '57jaehl2fmxx',
  accessToken: '_dBE5E_thxTqsbl4hA9FSjFrzMJZeUmUGbICD86i7Ss',
});

export default client;
