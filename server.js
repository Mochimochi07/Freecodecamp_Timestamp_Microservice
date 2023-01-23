const express = require("express");
const app = express();
const cors = require("cors");

app.use(cors({optionsSuccessStatus: 200}));

app.get("/api/", (req, res) => {
  res.json({ unix: Date.now(), utc: Date() });
});

app.get("/api/:date_string", (req, res) => {
  let dateString = req.params.date_string;
  if (/\d{5,}/.test(dateString)) {
    const dateInt = parseInt(dateString);
    res.json({ unix: dateInt, utc: new Date(dateInt).toUTCString() });
  } else {
    let dateObject = new Date(dateString);

    if (dateObject.toString() === "Invalid Date") {
      res.json({ error: "Invalid Date" });
    } else {
      res.json({ unix: dateObject.valueOf(), utc: dateObject.toUTCString() });
    }
  }
});

app.listen(5000);
