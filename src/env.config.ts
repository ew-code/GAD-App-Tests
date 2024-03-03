import * as dotenv from 'dotenv';

dotenv.config({ override: true });

function requireEnvVariable(envVariableName: string): string {
  const envVariableValue = process.env[envVariableName] ?? '[NOT SET]';
  if (envVariableValue === undefined) {
    throw new Error(`Environment variable ${envVariableName} is not set.`);
  }
  return envVariableValue;
}

export const BASE_URL = requireEnvVariable('BASE_URL');
export const USER_EMAIL = requireEnvVariable('USER_EMAIL');
export const USER_PASSWORD = requireEnvVariable('USER_PASSWORD');
