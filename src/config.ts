const config = () => ({
  NODE_ENV: process.env.NODE_ENV,
  port: Number(process.env.PORT),
  database: {
    url: process.env.DB_URL,
    type: 'postgres',
    ssl: {
      rejectUnauthorized: false,
    },
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
    autoLoadEntities: true,
  },
  google_client_id: process.env.GOOGLE_CLIENT_ID,
  google_client_secret: process.env.GOOGLE_SECRET,
  google_callback_url: process.env.GOOGLE_CALLBACK_URL,
  jwtSecret: process.env.JWT_SECRET,
  jwtExpireTime: process.env.JWT_EXPIRE_TIME,
  stripe_key: process.env.STRIPE_SECRET,
  stripe_currency: process.env.STRIPE_CURRENCY,
});
export default config;
