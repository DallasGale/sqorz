const express = require("express");
const request = require("request");
const app = express();
const PORT = 3001;

// Enable CORS
app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  next();
});

// Proxy endpoint
app.use("/proxy", (req, res) => {
  // Modify the URL to the target API endpoint you wish to proxy to
  const url = "https://our.sqorz.com/json/region/au" + req.url;
  req.pipe(request(url)).pipe(res);
});

// Start the server
app.listen(PORT, () => {
  console.log(`Proxy server listening on port ${PORT}`);
});
