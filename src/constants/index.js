import path from 'node:path';

const TEMPLATES_DIR = path.resolve('src', 'templates');

export const passwordTemplatesPath = path.join(
  TEMPLATES_DIR,
  'reset-password.html',
);

export const TEMP_UPLOADS_DIR = path.resolve('temp');
