const Customer = require("../models/customer");
const axios = require("axios");
require("dotenv").config();

class Controller {
  async AllCustomer(req, res, next) {
    Customer.find({}, (error, result) => {
      if (error) return next(error);
      res.send(result);
    });
  }
  async OneCustomer(req, res, next) {
    let { id } = req.params;
    Customer.findById(id, (error, result) => {
      if (error) return next(error);
      res.send(result);
    });
  }
  async AddCustomer(req, res, next) {
    const phone = req.body.phone;

    const api_key = process.env.REACT_APP_API_KEY;

    const config = {
      headers: { "X-RapidAPI-Key": api_key },
    };
    axios
      .get(`https://veriphone.p.rapidapi.com/verify?phone=${phone}`, config)
      .then((response) => {
       
          let numberData = {
            countryCode: response.data.country_code,
            countryName: response.data.country,
            operatorName: response.data.carrier,
          };if(response.data.carrier===""){numberData={errorNumber:'invalid number'}}
          const mv = new Customer({
            name: req.body.name,
            address: req.body.address,
            phone,
          });
          mv.save({}, (error, result) => {
            if (error) return next(error);
            res.send({result, numberData});
          });
        
      })
      .catch((error) => {
        console.log(error);
      });


  }
  async DeleteCustomer(req, res, next) {
    let { id } = req.params;
    Customer.deleteOne({ _id: id }, (error, result) => {
      if (error) return next(error);
      res.send(result);
    });
  }
  async UpdateCustomer(req, res, next) {
    const newCustomer = {
      name: req.body.name,
      address: req.body.address,
      phone: req.body.phone,
    };
    let { id } = req.params;
    Customer.updateOne({ _id: id }, { $set: newCustomer }, (error, result) => {
      if (error) return next(error);
      res.send(result);
    });
  }
}
const controller = new Controller();
module.exports = controller;
