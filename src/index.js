import { setupServer } from './server.js';
import { iMondoDB } from './db/iMongoDB.js';

const bootstrap = async () => {
  await iMondoDB();
  setupServer();
};

bootstrap();
