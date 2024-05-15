const mongoose = require("mongoose");
const listings = require("./data.js");
const Listing = require("../models/listing.js");

const MONGO_URL = "mongodb://127.0.0.1:27017/wanderlust";

// console.log(listings);
main()
  .then(() => {
    console.log("connected to DB");
  })
  .catch((err) => {
    console.log(err);
  });

async function main() {
  await mongoose.connect(MONGO_URL);
}


const axios = require('axios');

const mapboxAccessToken = 'pk.eyJ1IjoiZGVsdGEtc3R1ZHVlbnQiLCJhIjoiY2xvMDk0MTVhMTJ3ZDJrcGR5ZDFkaHl4ciJ9.Gj2VU1wvxc7rFVt5E4KLOQ';

async function geocodeLocation(location) {
    try {
        const response = await axios.get(`https://api.mapbox.com/geocoding/v5/mapbox.places/${encodeURIComponent(location)}.json`, {
            params: {
                access_token: mapboxAccessToken
            }
        });
        const result = response.data.features[0];
        const coordinates = result.geometry.coordinates;
        return { type: "Point", coordinates };
    } catch (error) {
        console.error('Error geocoding location:', location, error);
        return null;
    }
}

async function addGeometryToEachListing(listings) {
    try {
        const updatedListings = [];
        for (const listing of listings) {
            const geometry = await geocodeLocation(listing.location);
            const updatedListing = { ...listing, geometry };
            updatedListings.push(updatedListing);
        }
        return updatedListings;
    } catch (error) {
        console.error('Error adding geometry to listings:', error);
    }
}


addGeometryToEachListing(listings.data)
    .then(updatedListings => initDB(updatedListings))
    .catch(error => console.error('Error:', error));

const initDB = async (initData) => {
    await Listing.deleteMany({});
    initData = initData.map((obj) => ({ ...obj ,  owner: "6638bab3ec669cf29985aa25"}));
    await Listing.insertMany(initData);
    console.log("Data was initializing");
};