const express = require("express");
const cors = require("cors");
const fetch = require("node-fetch");
const MongoClient = require("mongodb").MongoClient;

const app = express();
const port = 3001;

let corsOptions = {
	"origin": "http://localhost:3000"
};

MongoClient.connect('mongodb://localhost:27017/yeethay', function(err, client) {
	if(err) throw err;

	let db = client.db('yeethay');

	app.use(cors(corsOptions));

	app.get("/", (req, res) => res.send("Hello World!"));

	app.get("/rest/ratingOptions", (req, res) => {
		db.collection('rating_options')
			.find({}, {
				"sort": {
					"value": 1
				}
			})
			.toArray(function (err, result) {
				if (err) throw err;
				res.send(result);
			});
	});

	app.get("/rest/getItem", (req, res) => {
		db.collection('rating_items')
			.find(req.query, {
				"limit": 1
			})
			.next(function (err, result) {
				if (err) throw err;
				res.send(result);
			});
	});

	app.get("/rest/getItems", (req, res) => {
		db.collection('rating_items')
			.find(req.query)
			.toArray(function (err, result) {
				if (err) throw err;
				res.send(result);
			});
	});

	app.get("/rest/unratedItem", (req, res) => {
		db.collection('rating_items')
			.find({
				"name": "Lychee"
			}, {
				"limit": 1
			})
			.next(function (err, result) {
				if (err) throw err;
				res.send(result);
			});
	});

	app.get("/rest/randomItem", (req, res) => {
		db.collection('rating_items')
			.aggregate([{ $sample: { size: 1 } }])
			.next(function (err, result) {
				if (err) throw err;
				res.send(result);
			});;
	});

	app.listen(port, () => console.log(`Yeet Hay listening at http://localhost:${port}`));
});
