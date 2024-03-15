const request = require("request");

module.exports = (req, res) => {
  const targetUrl =
    "https://our.sqorz.com/json/region/au" +
    req.url.replace("/api/reqion_au", "");

  req
    .pipe(request(targetUrl))
    .on("error", (err) => {
      console.error(err);
      res.status(500).send("Proxy error");
    })
    .pipe(res);
};
