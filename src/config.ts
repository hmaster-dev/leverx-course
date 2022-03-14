const config = () => ({
  port: Number(process.env.PORT),
  database: {
    type: 'postgres',
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    username: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    entities: [__dirname + '/**/*.entity{.ts,.js}'],
    synchronize: false,
    migrations: [__dirname + '/migrations/*{.ts,.js}'],
    cli: {
      migrationsDir: 'src/migrations',
    },
  },
});
export default config;
