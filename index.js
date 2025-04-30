const express = require("express");
const app = express();

// app.use((req, res, next) => {
//     console.log("I am a middleware");
//     next();
// });

// app.use((req, res, next) => {
//     console.log("I am a 2nd middleware");
//     next();
// });

//logger
// app.use("/random", (req, res, next) => {
//     req.time = new Date(Date.now()).toString(); 
//     console.log(req.method, req.hostname, req.path, req.time);
//     next();
// });

//middleware authentication
// app.use("/api", (req, res, next)=> {
//     let {KEY} = req.query;
//     if(KEY === "AssKEY"){
//         next();
//     }
//     else{
//         res.send("ACCESS DENIED");
//     }

// });

//For passing multiple middleware
const apiAuth = (req, res, next) => {
    let {KEY} = req.query;
    if(KEY === "AssKEY"){
        next();
    } else{
        // res.send("ACCESS DENIED");
        throw new Error("ACCESS DENIED");
    }

}

app.get("/api",apiAuth, (req, res) => {
    res.send("data");
});

app.get("/",apiAuth, (req, res) => {
    res.send("Hi! I'm khairul Islam");
});

app.get("/random",apiAuth, (req, res) => {
    res.send("This is a random page");
});

//404
app.use((req, res) => {
    res.status(404).send("Page not found");
})

const port = 8080;
app.listen(port, () => {
    console.log(`Server is connected to: ${port}`);
});