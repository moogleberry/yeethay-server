const express = require("express");
const cors = require("cors");
const fetch = require("node-fetch");

const app = express();
const port = 3001;

let corsOptions = {
	"origin": "http://localhost:3000"
};

app.use(cors(corsOptions));

app.get("/", (req, res) => res.send("Hello World!"));

app.use('/static', express.static('public'));

app.listen(port, () => console.log(`Example app listening at http://localhost:${port}`));
