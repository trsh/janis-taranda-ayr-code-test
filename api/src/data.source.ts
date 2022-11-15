import { DataSource } from 'typeorm';

/**
 * Main database connect descriptor
 */
const AppDataSource = new DataSource({
  type: 'sqlite',
  database: './db/strains.sqlite3',
  synchronize: true,
  migrationsTableName: 'migrations',
  entities: ['src/**/*.entity.{ts,js}'],
  migrations: ['db/migrations/*.{ts,js}'],
});

export default AppDataSource;
