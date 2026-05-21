exports.handler = async (event) => {
  const id = event.queryStringParameters?.id;
  if (!id) return { statusCode: 400, body: 'Missing playlist id' };

  const res = await fetch(`https://api.deezer.com/playlist/${id}/tracks?limit=100`);
  const data = await res.json();

  return {
    statusCode: 200,
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  };
};
