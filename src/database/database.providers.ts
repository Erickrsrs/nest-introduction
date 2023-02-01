import { CourseRefactoring1675255779013 } from 'src/migrations/1675255779013-CourseRefactoring';
import { DataSource } from 'typeorm';

export const databaseProviders = [
  {
    provide: 'DATA_SOURCE',
    useFactory: async () => {
      const dataSource = new DataSource({
        type: 'postgres',
        host: 'localhost',
        port: 5432,
        username: 'postgres',
        password: 'dockerpass',
        database: 'postgres',
        entities: [__dirname + '/../**/*.entity.js'],
        synchronize: false,
      });

      return dataSource.initialize();
    },
  },
];

export const dataSource = new DataSource({
  type: 'postgres',
  host: 'localhost',
  port: 5432,
  username: 'postgres',
  password: 'dockerpass',
  database: 'postgres',
  entities: [__dirname + 'dist/**/*.entity.js'],
  synchronize: false,
  migrations: [CourseRefactoring1675255779013], // Classes from migrations here
});
