import { PathLike, unlinkSync, writeFileSync } from 'fs';
import { join } from 'path';
import { EnvironmentService } from '../src/infrastructure/config/environment/environment.service';
import { getTypeOrmMigrationsOptions } from '../src/infrastructure/config/typeorm/typeorm-config.module';

const TypeOrmConfigFilePath: PathLike = join(__dirname, '../ormconfig.json');
const TypeOrmMigrationsOptions = getTypeOrmMigrationsOptions(
  new EnvironmentService(),
);

try {
  unlinkSync(TypeOrmConfigFilePath);
} catch (e) {
  console.log(
    `Falha ao deletar o arquivo ${TypeOrmConfigFilePath}. Provavelmente ele nem existe`,
  );
}
writeFileSync(
  TypeOrmConfigFilePath,
  JSON.stringify([TypeOrmMigrationsOptions], null, 2),
);
