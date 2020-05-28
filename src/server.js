const express = require("express");
const morgan = require("morgan");
const ImposeService = require("./impose");

const PORT = process.env.PORT || 3000;
const app =  express();


app.set('view engine', 'ejs');
app.use(express.urlencoded());
app.use(morgan("short"))

app.use("/", express.static("./static"));

function renderFactory(page, optParser){
    return (req, res) => res.render(page, Object.assign({},  optParser ? optParser(req): {}, {impose: ImposeService.getInstance() }))
}

app.get("/image/:img", (req, res, next) => {
    var imgName = req.params.img;
    res.sendFile(ImposeService.getInstance().resolveFileName(imgName));
});

app.get("/", renderFactory("posts.ejs", req => ({page: 1})));
app.get("/post/:page", renderFactory("posts.ejs", req => ({page: +req.params.page})));
app.get("/random", renderFactory("random.ejs"));
app.get("/about", renderFactory("about.ejs"));
app.get("*", renderFactory("error.ejs"));
app.use((error, req, res, next) => {
    console.error(error);
    res.render("error.ejs", {impose: ImposeService.getInstance() });
});



app.listen(PORT, () => {
    console.log(`listening on port ${PORT}`);
});