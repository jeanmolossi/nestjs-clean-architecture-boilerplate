import { copyFileSync, PathLike, unlinkSync } from 'fs';
import { join } from 'path';

(() => {
  const envFile: PathLike = join(__dirname, '..', '..', '.env');

  const destination: PathLike = join(__dirname, '..', '.env.development');

  try {
    unlinkSync(destination);
  } catch {
    console.log('Não há um arquivo .env.development, será criado um novo');
  }

  copyFileSync(envFile, destination);
})();
