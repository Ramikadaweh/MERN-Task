const Customer = require("../models/customer");
const numberValid = require("../validation/numberValid");

class Controller {
  AllCustomer(req, res, next) {
    Customer.find({}, (error, result) => {
      if (error) return next(error);
      res.send(result);
    });
  }
  OneCustomer(req, res, next) {
    let { id } = req.params;
    Customer.findById(id, (error, result) => {
      if (error) return next(error);
      res.send(result);
    });
  }
  async AddCustomer(req, res, next) {
    let body = req.body;
    let numberData = {};
    try {
      const response = await numberValid.numberValidation(body.phone);
      if (response.data.carrier === "") {
        res.status(200).send({ success: false, message: "Invalid number" });
      } else {
        numberData = {
          countryCode: response.data.country_code,
          countryName: response.data.country,
          operatorName: response.data.carrier,
        };
        let doc = new Customer(body);
        doc.save((err, response) => {
          if (err) return next(err);
          if (response === null) {
            res
              .status(404)
              .send({ success: false, message: "Customer not found" });
          }
          res.status(200).send({
            success: true,
            message: "Customer Successfully added",
            response,
            numberData,
          });
        });
      }
    } catch (err) {
      res.status(401).send({ success: false, error: err });
    }
  }
  DeleteCustomer(req, res, next) {
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
    let numberData = {};

    const response = await numberValid.numberValidation(newCustomer.phone);
    if (response.data.carrier === "") {
      res.status(200).send({ success: false, message: "Invalid number" });
    } else {
      numberData = {
        countryCode: response.data.country_code,
        countryName: response.data.country,
        operatorName: response.data.carrier,
      };
      Customer.updateOne(
        { _id: id },
        { $set: newCustomer },
        (error, result) => {
          if (error) return next(error);
          res.status(200).send({
            success: true,
            message: "Customer Successfully edited",
            result,
            numberData,
          });
        }
      );
    }
  }
}
const controller = new Controller();
module.exports = controller;
