import { createClient } from 'contentful';

// позволяет запрашивать контент из CMS по API по GraphQL
const client = createClient({
  space: process.env.SPACE,
  accessToken: process.env.ACCESS_TOKEN,
});

export default client;
