const {Client} = require('pg');

//Create a client config object

const client = new Client({
  host: '127.0.0.1',
  port: 5432,
  user: 'postgres',
  password: 'password',
});

//Function that connects to the database

const connectToDb = async () => {
  console.log('connecting to db...');
  await client.connect();
};

//Export this connect function for other files to use it
//Export client object for it to be used for example to execute db queries

module.exports = {
  client,
  connectToDb,
};
