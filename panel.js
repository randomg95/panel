const express = require("express");
const path = require("path");
const bodyParser = require("body-parser");
const { body, validationResult } = require("express-validator");
const app = express();
const PORT = 3000;
const fs = require("fs");
//get this data and put it in /config.json

//it'll get this from the public
let dummyData = {
	// test: "ss"
};
app.use(
	bodyParser.urlencoded({
		extended: true,
		limit: "50mb",
	})
);
//app.use(bodyParser.json());
//app.use(express.json({limit: '50mb'}));
//app.use(express.urlencoded({limit: '50mb'}));
app.use(bodyParser.json({ limit: "50mb" }));
//app.use(bodyParser.urlencoded({limit: '50mb', extended: true}));

//now it'll distrubute it

app.get("/config", (req, res) => {
	const fileName = `./config${Number(req.query.file) === 2 ? "2" : ""}.json`;
	console.log(fileName);
	console.log("i've been hit");
	// res.json(dummyData)
	fs.readFile(fileName, (err, json) => {
		let obj = JSON.parse(json);
		res.json(obj);
	});
});

app.get("/", function (req, res) {
	res.sendFile(path.join(__dirname, "./public/index.html"));
});
app.get("/fortest", function (req, res) {
	// res.send("testing");
	res.sendFile(path.join(__dirname, "./public/fortest.html"));
});

app.get("/public/bgWText.png", function (req, res) {
	res.sendFile(path.join(__dirname, "./public/bgWText.png"));
});

app.post("/submit", async (req, res) => {
	dummyData = await req.body;
	let fileName = `./config${dummyData.panel === "for testing" ? "2" : ""}.json`;
	console.log("llll", fileName);
	// get letter from already existing file
	const letter = JSON.parse(fs.readFileSync(fileName)).letter;
	// in case letter is empty refill it with last letter
	const body =
		dummyData.letter === "empty letter" ? { ...req.body, letter } : req.body;
	fs.writeFileSync(fileName, JSON.stringify(body));

	res.sendStatus(200);
});

app.listen(PORT, () => {
	console.log(`Example app listening on PORT ${PORT}`);
});
