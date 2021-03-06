import dotenv from 'dotenv';

dotenv.config();

const MONGO_OPTIONS = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  socketTimeoutMS: 30000,
  keepAlive: true,
  poolSize: 50,
  useCreateIndex: true,
  autoIndex: true,
  retryWrites: false,
};

const MONGO_USERNAME = process.env.MONGO_USERNAME || '';
const MONGO_PASSWORD = process.env.MONGO_PASSWORD || '';
const MONGO_HOST = process.env.MONGO_URL || '';

const MONGO = {
  host: MONGO_HOST,
  username: MONGO_USERNAME,
  password: MONGO_PASSWORD,
  options: MONGO_OPTIONS,
  url: `mongodb+srv://${MONGO_USERNAME}:${MONGO_PASSWORD}@${MONGO_HOST}`,
};

const AUTH_SECRET_KEY = process.env.SECRET_KEY || 'unique-secret-key';
const AUTH_SALT_ROUNDS = process.env.SALT_ROUNDS || 10;

const AUTH = {
  secret: AUTH_SECRET_KEY,
  salt_rounds: AUTH_SALT_ROUNDS,
};

const SERVER_HOSTNAME = process.env.HOSTNAME || 'localhost';
const SERVER_PORT = process.env.PORT || 3000;

const SERVER = {
  hostname: SERVER_HOSTNAME,
  port: SERVER_PORT,
  auth: AUTH,
};

const config = {
  server: SERVER,
  mongo: MONGO,
};

export default config;
