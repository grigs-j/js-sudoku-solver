const PORT = 8000;
const axios = require("axios").default;
const express = require("express");
const cors = require("cors");
require("dotenv").config();
const app = express();

app.use(cors());
app.use(express.json());

app.listen(PORT, () => console.log(`server listening on PORT ${PORT}`));

//post request for express
app.post("/solve", (req, res) => {
    const options = {
        method: "POST",
        url: "https://solve-sudoku.p.rapidapi.com/",
        headers: {
            "content-type": "application/json",
            "x-rapidapi-host": "solve-sudoku.p.rapidapi.com",
            //hidden api key
            "x-rapidapi-key": process.env.RAPID_API_KEY,
        },
        data: {
            //finding body in the req so we have that info to pass
            puzzle: req.body.numbers,
        },
    };

    axios
        .request(options)
        .then(function (response) {
            console.log(response.data);
            res.json(response.data);
        })
        .catch(function (error) {
            console.error(error);
        });
});
