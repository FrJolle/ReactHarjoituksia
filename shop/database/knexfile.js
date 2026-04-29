module.exports = {
  development: {
    client: 'mysql2',
    connection: {
      user: 'root',
      password: 'mypass123',
      database: 'shop'
    },
    migrations: {
      directory: './migrations', // Migrations directory
    },
    seeds: {
      directory: './seeds', // Seeds directory
    }
  }
};
