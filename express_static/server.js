const Express = require("express");
const Path = require("path");

let app = Express();

app.use(Express.static(Path.join(__dirname, "static")));

app.use((req, res, next) => {
    res.status(404);
    res.sendFile(Path.join(__dirname, "static", "404.html"));
});

app.listen(8000, () => {
    console.log("Server listening at port 8000");
});