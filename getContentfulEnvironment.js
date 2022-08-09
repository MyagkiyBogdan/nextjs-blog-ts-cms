const contentfulManagement = require('contentful-management');

module.exports = function () {
  const contentfulClient = contentfulManagement.createClient({
    accessToken: 'CFPAT-pnhwrViwSlt5yOgXdcraAhnrJfnOUDFt3tWOVWGKWzM',
  });

  return contentfulClient.getSpace('57jaehl2fmxx').then(space => space.getEnvironment('master'));
};
