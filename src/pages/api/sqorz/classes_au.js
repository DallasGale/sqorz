import fetch from "node-fetch";

export default async function handler(req, res) {
  const targetUrl =
    "https://our.sqorz.com/json/event/" +
    req.query.id +
    req.url.replace("/api/sqorz/classes_au", "");

  try {
    const response = await fetch(targetUrl);
    if (!response.ok) {
      throw new Error(`Request failed with status ${response.status}`);
    }
    const data = await response.text(); // or response.json() if the API returns JSON
    // Set CORS headers
    // Allow any domain (*) or specify to only allow requests from specific origins
    res.setHeader("Access-Control-Allow-Origin", "http://localhost:3000");
    // Specify which headers can be used in the request
    res.setHeader(
      "Access-Control-Allow-Headers",
      "Origin, X-Requested-With, Content-Type, Accept"
    );

    res.status(200).send(data);
  } catch (error) {
    // Ensure CORS headers are set even on error responses
    res.setHeader("Access-Control-Allow-Origin", "http://localhost:3000");
    res.status(500).send("Proxy error");
  }
}
