const express = require("express");
const ImposeService = require("./impose");

const PORT = process.env.PORT || 3000;
const app =  express();


app.set('view engine', 'ejs');
app.use(express.urlencoded());

app.use("/", express.static("./static"));


function renderFactory(page){
    return (req, res) => res.render(page, {impose: ImposeService.getInstance() })
}

app.get("/image/:img", (req, res, next) => {
    var imgName = req.params.img;
    res.sendFile(ImposeService.getInstance().resolveFileName(imgName));
});

app.get("/", renderFactory("home.ejs"));
app.get("/home", renderFactory("home.ejs"));
app.get("/about", renderFactory("about.ejs"));


app.listen(PORT, () => {
    console.log(`listening on port ${PORT}`);
});