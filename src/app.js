const path = require("path");
const express = require("express");
const hbs = require("hbs");
const geocode = require("./utils/geocode");
const forecast = require("./utils/forecast.js");
const app = express();

const port = process.env.PORT || 3000;

//setup path for express config
const publicPathDirectory = path.join(__dirname, "../public");
const viewPath = path.join(__dirname, "../template/views");
const partialPath = path.join(__dirname, "../template/partials");

//setup habndlebars engine and view location
//Note handlebars always trying to look into the views folder for the files keep in mind
app.set("view engine", "hbs");
app.set("views", viewPath);
hbs.registerPartials(partialPath);

//setup static directory to serve
app.use(express.static(publicPathDirectory));

// app.get("/help", (req, res) => {
//   //   res.send("<h1>Help Page</h1>");
//   res.send({
//     name: "Kapil",
//     age: 22,
//   });
// });

// app.get("/about", (req, res) => {
//   res.send("About Page");
// });

app.get("", (req, res) => {
  res.render("index", {
    title: "Weather App",
    name: "Kapil Kawathekar",
  });
});

app.get("/about", (req, res) => {
  res.render("about", {
    title: "About me",
    name: "Kapil Kawathekar",
  });
});

app.get("/help", (req, res) => {
  res.render("help", {
    message: "This is the Help Section 😀😀 ",
    title: "Help",
    name: "Kapil Kawathekar",
  });
});
app.get("/weather", (req, res) => {
  if (!req.query.address) {
    return res.send({ error: "You must provide an address" });
  }
  console.log(req.query.address);

  geocode(req.query.address, (error, { lat, lng, location } = {}) => {
    if (error) {
      return res.send({ error });
    }
    console.log(lat, lng);
    forecast(lat, lng, (error, forecastedData) => {
      if (error) {
        return res.send({ error });
      }
      console.log(forecastedData);
      res.send({
        forecaste: forecastedData,
        location,
        address: req.query.address,
      });
    });
  });

  // res.send("Welcome to Weather Application");
});
app.get("/help/*", (req, res) => {
  res.render("404", {
    title: "404",
    name: "Kapil",
    errormessage: "Help article not found",
  });
});
app.get("*", (req, res) => {
  res.render("404", {
    errormessage: "Page not found",
    name: "Kapil",
    title: "404",
  });
});

app.listen(port, () => {
  console.log("Server started successfully !!");
});
