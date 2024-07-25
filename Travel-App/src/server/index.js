var path = require("path");
const express = require("express");
const dotenv = require("dotenv");
dotenv.config();
const cors = require("cors");
const bodyParser = require("body-parser");
const { error } = require("console");

const app = express();

app.use(express.static("dist"));
app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

const GEONAMES_URL = "http://api.geonames.org/searchJSON?";
const WEATHERBIT_URL = "https://api.weatherbit.io/v2.0";
const PIXABAY_URL = "https://pixabay.com";

const API_KEY_WEATHERBIT = process.env.API_KEY_WEATHERBIT;
const API_KEY_PIXABAY = process.env.API_KEY_PIXABAY;

console.log(__dirname);

// designates what port the app will listen to for incoming requests
app.listen(8080, function () {
    console.log("Example app listening on port 8080!")
})

app.get("/getCity", async function (req, res) {
    try {
        const { city } = req.query;
        if (!city) {
            return res.status(400).send({ error: "City is required" });
        }

        const url = new URL(`${GEONAMES_URL}`);
        url.searchParams.append("name", city);
        url.searchParams.append("username", "namkaka");
        url.searchParams.append("maxRows", "1");

        const response = await fetch(url.toString());

        if (!response.ok) throw new Error("Failed to fetch data from external API");

        const data = await response.json();
        const cityGeoname = data?.geonames;

        if (!cityGeoname || cityGeoname.length === 0) {
            return res.status(404).send({ error: "City not found" });
        }

        res.send(cityGeoname);
    } catch (error) {
        console.log(`Error occurred: ${error}`);
        res.status(500).send({ error: "An error occurred while processing your request." });
    }
});

app.get("/getWeatherForecast", async function (req, res) {
    try {
        const { lat, lon } = req.query;
        if (!lat || !lon) {
            return res.status(400).send({ error: "Latitude and Longitude is required" })
        }

        const url = new URL(`${WEATHERBIT_URL}/forecast/daily`);
        url.searchParams.append("lat", lat);
        url.searchParams.append("lon", lon);
        url.searchParams.append("key", API_KEY_WEATHERBIT);
        url.searchParams.append("include", "minutely");

        const response = await fetch(url.toString());

        if (!response.ok) throw new Error("Failed to fetch data from external API");

        const data = await response.json();
        const forecastWeather = data;

        if (!forecastWeather || forecastWeather.length === 0) {
            return res.status(404).send({ error: "Forecast weather not found" });
        }

        res.send(forecastWeather);
    } catch (error) {
        console.log(`Error occurred: ${error}`);
        res.status(500).send({ error: "An error occurred while processing your request." });
    }
});

app.get("/cityImage", async function (req, res) {
    try {
        const { city } = req.query;
        if (!city) {
            return res.status(400).send({ error: "Latitude and Longitude is required" })
        }

        const url = new URL(`${PIXABAY_URL}/api`);
        url.searchParams.append("key", API_KEY_PIXABAY);
        url.searchParams.append("q", city);
        url.searchParams.append("image_type", "photo");

        const response = await fetch(url.toString());

        if (!response.ok) throw new Error("Failed to fetch data from external API");

        const data = await response.json();
        const cityImage = data?.hits[0];

        if (!cityImage || cityImage.length === 0) {
            return res.status(404).send({ error: "City Image not found" });
        }

        res.send(cityImage);
    } catch (error) {
        console.log(`Error occurred: ${error}`);
        res.status(500).send({ error: "An error occurred while processing your request." });
    }
});
