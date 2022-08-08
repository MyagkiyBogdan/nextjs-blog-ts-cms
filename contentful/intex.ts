import { createClient } from 'contentful';

// позволяет запрашивать контент из CMS по API по GraphQL

const client = createClient({
  space: String(process.env.SPACE),
  accessToken: String(process.env.ACCESS_TOKEN),
});

export default client;
