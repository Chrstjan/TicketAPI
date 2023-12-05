// Config file - change this to fit your DB
module.exports = {
  HOST: "localhost",
  USER: "root",
  PASSWORD: "password1234",
  DB: "tickets",
  dialect: "mysql",
  pool: {
    max: 5,
    min: 0,
    acquire: 30000,
    idle: 10000,
  },
};
