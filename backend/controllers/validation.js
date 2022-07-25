const axios = require("axios");
require("dotenv").config();

exports.validationNumber = async (phone) => {
  const api_key = process.env.REACT_APP_API_KEY;

  const config = {
    headers: { "X-RapidAPI-Key": api_key },
  };
  axios
    .get(`https://veriphone.p.rapidapi.com/verify?phone=${phone}`, config)
    .then((response) => {
      if (response.data.carrier.length === 0) {
        console.log("invalid number");
      } else {
          let numberData =  {
            countryCode: response.data.country_code,
            countryName: response.data.country,
            operatorName: response.data.carrier,
          }; 
        return numberData;
      }
    }).catch((error)=>{
        console.log(error);
    })
};
