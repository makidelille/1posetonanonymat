const express = require("express");
const ImposeService = require("./impose");

const PORT = process.env.PORT || 3000;
const app =  express();


app.set('view engine', 'ejs');
app.use(express.urlencoded());

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
app.get("/home", renderFactory("posts.ejs"));
app.get("/about", renderFactory("about.ejs"));


app.listen(PORT, () => {
    console.log(`listening on port ${PORT}`);
});