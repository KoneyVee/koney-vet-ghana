// Script to update CORS settings for Sanity project
const sanityClient = require('@sanity/client');

// Configure the client
const client = sanityClient({
  projectId: 'fqp1d8a4',
  dataset: 'koneyblog',
  token: process.env.SANITY_TOKEN, // You'll need to set this environment variable
  useCdn: false, // We need the API, not the CDN
  apiVersion: '2023-05-03' // Use the API version from your error messages
});

// Update CORS origins
async function updateCors() {
  try {
    const result = await client.request({
      url: '/cors',
      method: 'POST',
      body: {
        origins: [
          'http://localhost:8080',
          'http://localhost:3000',
          'http://127.0.0.1:8080',
          'http://127.0.0.1:3000',
          'http://localhost:8081',
          'http://127.0.0.1:8081',
          'http://localhost:8082',
          'http://127.0.0.1:8082',
          'https://localhost:8080',
          'https://127.0.0.1:8080',
          'https://localhost:3000',
          'https://127.0.0.1:3000',
          'https://localhost:8081',
          'https://127.0.0.1:8081',
          'https://localhost:8082',
          'https://127.0.0.1:8082'
        ],
        allowCredentials: true
      }
    });
    console.log('CORS settings updated successfully:', result);
  } catch (error) {
    console.error('Error updating CORS settings:', error);
  }
}

updateCors();