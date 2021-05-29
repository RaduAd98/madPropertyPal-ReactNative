//SQL phrase that is parametrized using $value and it is intercepted by the pg library and maps it to the postgresql db server

const text =
  'INSERT INTO properties(propertyname, locationname, psize, price, yearofconstruction,numberoffloors, description, numberofbedrooms, numberofbathrooms, localamenities,propertytype, leasetype) VALUES($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12) RETURNING id';

//Export this route to be used in main.js

module.exports = (app, addQuery) => {
  //Add a post route to get data from client and then execute the add query
  app.post('/property/add', async (req, res) => {
    const {data} = req.body;
    const values = Object.values(data);
    values.id = addQuery(text, values);
    res.send('Successfully added.');
  });
};
