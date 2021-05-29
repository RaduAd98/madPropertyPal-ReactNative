//Export this route to be used in main.js

module.exports = (app, deleteQuery) => {
  //Add a post route that takes the data from frontend and then executes a delete query
  app.post('/property/delete', async (req, res) => {
    const {id} = req.body;
    deleteQuery(id);
    return res.send('Deleted successfully');
  });
};
