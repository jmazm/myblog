module.exports = {
    server: {
      port: process.env.PORT || 3002,
      host: process.env.LOCALHOST || '127.0.0.1'
    },
    db: {
      host: process.env.DB_HOST || '127.0.0.1',
      port: process.env.DB_PORT || '3306',
      user: process.env.DB_USER || 'root',
      password: process.env.DB_PASSWORD || 'sz1997',
      database: process.env.DB_DATABASE || 'imgManagement'
    }
}