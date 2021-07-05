import path from 'path';

const tempFileFolder = path.resolve(__dirname, '../', '../', 'tmp');

interface ITempFileConfig {
  tempFileFolder: string;
}

export default {
  tempFileFolder,
} as ITempFileConfig;
