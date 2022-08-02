const axios = require("axios");
require("dotenv").config();

exports.numberValidation = async (phone) => {

    const api_key = process.env.REACT_APP_API_KEY;

  const config = {
    headers: { "X-RapidAPI-Key": api_key },
  };
  let response = axios.get(
    `https://veriphone.p.rapidapi.com/verify?phone=${phone}`,
    config
  );
  return response;
};