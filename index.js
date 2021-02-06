const express = require("express");
const app = express();

require("./startup/config")();
require('./startup/logging')();
require('./startup/routes')(app);
require('./startup/db')();
require("./startup/validation")();
require("./startup/prod")(app);

const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Listening on port ${port}...`));
