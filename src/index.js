import { setupServer } from './server.js';
import { iMondoDB } from './db/iMongoDB.js';

import { createDirIfNotExist } from './utils/createDirIfNotExist.js';

import { TEMP_UPLOADS_DIR } from './constants/index.js';

const bootstrap = async () => {
  await createDirIfNotExist(TEMP_UPLOADS_DIR);
  await iMondoDB();
  setupServer();
};

bootstrap();
