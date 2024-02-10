import dotenv from 'dotenv';

async function globalSetup(): Promise<void> {
  dotenv.config({ override: true });
  // console.log('⚠️ URL:', process.env.BASE_URL);
  //  console.log('⚠️ User:', process.env.USER_EMAIL);
}

export default globalSetup;
