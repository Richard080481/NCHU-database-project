const faker = require('faker');
const mysql = require('mysql2/promise');

const generateFakeUser = () => {
  return {
    username: faker.internet.userName(),
    email: faker.internet.email(),
    password: faker.internet.password(),
  };
};

const insertFakeUsers = async (numUsers) => {
  const connection = await mysql.createConnection({
    host: 'localhost',
    user: 'admin',
    password: 'admin',
    database: 'admin',
  });

  for (let i = 0; i < numUsers; i++) {
    const fakeUser = generateFakeUser();

    await connection.execute('INSERT INTO users (username, email, password) VALUES (?, ?, ?)', [
      fakeUser.username,
      fakeUser.email,
      fakeUser.password,
    ]);
  }

  connection.end();
};

insertFakeUsers(100);
