export default async function handler(req, res) {
  const { start, end } = req.query;

  if (!start || !end) {
    return res.status(400).json({
      error: "Missing start or end parameter"
    });
  }

  const url = `https://api.fingrid.fi/v1/variable/327/events/json?start_time=${start}&end_time=${end}`;

  try {
    const response = await fetch(url, {
      headers: {
        "x-api-key": "8e5ab1e0890d423f88ae8898f603a0d2"
      }
    });

    const text = await response.text();

    if (!response.ok) {
      return res.status(500).json({
        error: "Fingrid returned error",
        status: response.status,
        body: text
      });
    }

    res.setHeader("Content-Type", "application/json");
    return res.status(200).send(text);

  } catch (err) {
    return res.status(500).json({
      error: "Proxy fetch failed",
      details: err.toString()
    });
  }
}
