//SQL phrase to get all properties from db

const text = 'SELECT * FROM properties';

//Export get all properties route

module.exports = (app, getQuery) => {
  app.get('/properties', (req, response) => {
    //Execute the get query and return the response back to the client
    getQuery(text).then((res) => {
      return response.json(res.rows);
    });
  });
};
