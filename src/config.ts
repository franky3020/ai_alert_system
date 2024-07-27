import path from "path";
import dotenv from "dotenv";

// Parsing the env file.
dotenv.config({ path: path.resolve(__dirname, "./.env") });

// Interface to load env variables
// Note these variables can possibly be undefined
// as someone could skip these varibales or not setup a .env file at all

interface ENV {
    OPEN_AI_API_KEY: string | undefined;
    Google_Search_API_KEY: string | undefined;
    Google_Search_API_CX: string | undefined;
  }

interface Config {
    OPEN_AI_API_KEY: string;
    Google_Search_API_KEY: string;
    Google_Search_API_CX: string;
}

// Loading process.env as ENV interface

const getConfig = (): ENV => {
  return {
    OPEN_AI_API_KEY: process.env.OPEN_AI_API_KEY,
    Google_Search_API_KEY: process.env.Google_Search_API_KEY,
    Google_Search_API_CX: process.env.Google_Search_API_CX
  };
};

// Throwing an Error if any field was undefined we don't
// want our app to run if it can't connect to DB and ensure
// that these fields are accessible. If all is good return
// it as Config which just removes the undefined from our type
// definition.

const getSanitzedConfig = (config: ENV): Config => {
  for (const [key, value] of Object.entries(config)) {
    if (value === undefined) {
      throw new Error(`Missing key ${key} in .env`);
    }
  }
  return config as Config;
};

const config = getConfig();

const sanitizedConfig = getSanitzedConfig(config);

export default sanitizedConfig;
