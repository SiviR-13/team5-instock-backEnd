import "dotenv/config";
import express from "express";
import cors from 'cors';

//Initializing Express APP
const app = express();
const PORT=process.env.PORT || 8080;