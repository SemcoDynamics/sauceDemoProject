// setup-env.ts
import { config } from 'dotenv';

config(); // This loads variables from .env into process.env
// Log to verify the variables are loaded
console.log('ARGOS_TOKEN:', process.env.ARGOS_TOKEN);

