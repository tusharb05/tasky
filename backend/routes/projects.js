const express = require("express");
const z = require("zod");
const User = require("../models/User");
const jwt = require("jsonwebtoken");
const fetchUser = require("../middlewares/fetchUser");
require('dotenv').config();