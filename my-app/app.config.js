import 'dotenv/config'; // This loads .env

export default ({ config }) => ({
  ...config,
  extra: {
    // Expose both PORT and API_URL so app code can read whichever it expects
    PORT: process.env.API,
    API_URL: process.env.API 
  },
});
