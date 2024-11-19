const config = {
  username: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  host: process.env.DB_HOST,
  dialect: "postgres",
};

module.exports = ["development", "test", "production"].reduce(
  (acc, env) => ({ ...acc, [env]: config }),
  {}
);
