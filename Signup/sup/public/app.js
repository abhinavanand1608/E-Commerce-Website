const express = require("express");
const path = require("path");
const app = express();


require("./db/mydb");
const Register = require("./models/registers");
const {json} = require("express");
const {log} = require("console");

const port = process.env.PORT || 3000;