import fetch from "node-fetch";

export default async function handler(req, res) {
  const targetUrl =
    "https://our.sqorz.com/json/region/au" +
    req.url.replace("/api/sqorz/region_au", "");

  try {
    const response = await fetch(targetUrl);
    if (!response.ok) {
      throw new Error(`Request failed with status ${response.status}`);
    }
    const data = await response.text(); // or response.json() if the API returns JSON
    res.status(200).send(data);
  } catch (error) {
    console.error(error);
    res.status(500).send("Proxy error");
  }
}
