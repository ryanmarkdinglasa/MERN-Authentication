
//  IMPORT APP
const app = require('./appExpress');
const port = 4000;

//  LISTING TO PORT
app.listen(port, () => {
  console.log('Server is running on port ' + port);
});
