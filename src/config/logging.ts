const getTimeStamp = () => new Date().toISOString();

const info = (namespace: string, message: string, object?: unknown): void => {
  if (object) {
    // eslint-disable-next-line no-console
    console.log(`[${getTimeStamp()}] [INFO] [${namespace}] ${message}`, object);
  } else {
    // eslint-disable-next-line no-console
    console.log(`[${getTimeStamp()}] [INFO] [${namespace}] ${message}`);
  }
};

const warn = (namespace: string, message: string, object?: unknown): void => {
  if (object) {
    // eslint-disable-next-line no-console
    console.log(`[${getTimeStamp()}] [WARN] [${namespace}] ${message}`, object);
  } else {
    // eslint-disable-next-line no-console
    console.log(`[${getTimeStamp()}] [WARN] [${namespace}] ${message}`);
  }
};

const error = (namespace: string, message: string, object?: unknown): void => {
  if (object) {
    // eslint-disable-next-line no-console
    console.log(`[${getTimeStamp()}] [ERROR] [${namespace}] ${message}`, object);
  } else {
    // eslint-disable-next-line no-console
    console.log(`[${getTimeStamp()}] [ERROR] [${namespace}] ${message}`);
  }
};

const debug = (namespace: string, message: string, object?: unknown): void => {
  if (object) {
    // eslint-disable-next-line no-console
    console.log(`[${getTimeStamp()}] [DEBUG] [${namespace}] ${message}`, object);
  } else {
    // eslint-disable-next-line no-console
    console.log(`[${getTimeStamp()}] [DEBUG] [${namespace}] ${message}`);
  }
};

export default {
  info,
  warn,
  error,
  debug,
};
