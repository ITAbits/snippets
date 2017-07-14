const Express = require("express");
const BodyParser = require("body-parser");
const Multer = require("multer");

let app = Express();
let upload = Multer();

app.use(BodyParser.urlencoded({ extended: false }));

app.post("/upload", upload.single("file"), (req, res) => {
    console.log(req.body);
    console.log(req.file);
});

app.use((req, res, next) => {
    res.status(404);
    res.send("404 Not Found")
});

app.listen(8000, () => {
    console.log("Server listening at port 8000");
});