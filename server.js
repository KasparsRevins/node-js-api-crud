const express = require('express');
const routes = require('./router/post');
const getroutes=require('./router/get');
const delroutes =require('./router/delete')
const putrouter =require('./router/update')

const app = express();
  
const PORT = 5000;

app.use('/', routes);
app.use('/', getroutes);
app.use('/',delroutes)
app.use('/',putrouter)



app.listen(PORT, () => console.log(`Server running on port ${PORT}`));