import contentstack from '@contentstack/management';

const contentstackClient = contentstack.client();

const stack = contentstackClient.stack({
  api_key: process.env.NEXT_PUBLIC_CONTENTSTACK_API_KEY,  // Use your Stack API key
  management_token: process.env.NEXT_PUBLIC_CONTENTSTACK_MANAGEMENT_TOKEN, // Managem
});

export default stack

