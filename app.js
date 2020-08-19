require("dotenv").config();

const connection = require("./model");
const express = require("express");
const app = express();
const cors = require('cors');
const { authRoute, postRoute } = require('./routes');
const authenticate = require("./routes/auth-token");
const PORT = process.env.PORT || 5000;


app.use(express.json());
app.use(cors());
app.use(express.urlencoded({ extended: false }));
app.use("/api/auth", authRoute);
app.use(authenticate);
app.use('/api/posts', postRoute);

app.listen(PORT, () => console.log(`Now Listening d(^_^)b on port: ${PORT}`));
