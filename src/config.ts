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
  google_client_id: process.env.GOOGLE_CLIENT_ID,
  google_client_secret: process.env.GOOGLE_SECRET,
  jwtSecret: process.env.JWT_SECRET,
  jwtExpireTime: process.env.JWT_EXPIRE_TIME,
  stripe_key: process.env.STRIPE_SECRET,
  stripe_currency: process.env.STRIPE_CURRENCY,
});
export default config;
