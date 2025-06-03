const axios = require('axios');

exports.handler = async (event, context) => {
  const API_KEY = process.env.SWEEPBRIGHT_API_KEY;
  const ESTATE_ID = event.queryStringParameters?.id;

  if (!API_KEY || !ESTATE_ID) {
    return {
      statusCode: 400,
      body: JSON.stringify({ error: 'Missing API key or estate ID' }),
    };
  }

  try {
    const res = await axios.get(`https://api.sweepbright.com/v1/estates/${ESTATE_ID}`, {
      headers: {
        Authorization: `Bearer ${API_KEY}`,
        Accept: 'application/vnd.sweepbright.v1+json',
      },
    });

    return {
      statusCode: 200,
      body: JSON.stringify(res.data),
    };
  } catch (error) {
    return {
      statusCode: error.response?.status || 500,
      body: JSON.stringify({ error: error.message }),
    };
  }
};