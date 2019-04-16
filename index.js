const express = require('express');

const app = express();
require('./startup/logging');
require('./startup/routes')(app);
require('./startup/db')();
require('./startup/config')();

//defining port and listening on defined port
const port = process.env.PORT || 4000;
app.listen(port, () => console.log(`listening on port ${port}`));
