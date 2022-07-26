## Starting with create express generator:
using these commands : 1- npx express-generator 2- npm install -g express-generator

## Create relation with mongoDB using mongoose:
mongoose
  .connect(process.env.CONNECTION_STRING, {
    dbName: process.env.DB_NAME,
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("successfully connected");
  })
  .catch(console.error);

## implementing HTTP requests for Customers:
# first with models by implementing the schema of Customer
const userSchema = new mongoose.Schema({

    name: {
        type: String,
        required: true
    },
    address: {
        type: String,
        required: true
    },
    phone: {
        type: Number,
        required: true,
    },

})

# Second with controller where there are all of customer functions:
-AllCustomers: to get all customers
-OneCustomer: to get specific customer
-addCustomer: to add new customer with API of validaton number called by axios in order to get some informations about the phone number of customer
-updateCustomer:to edit specific customer
deleteCustomer:to delete specific customer

# third with routes in order to put the endPoints of URL for each request
router.get('/', controller.AllCustomer)
router.get('/:id', controller.OneCustomer)
router.post('/', controller.AddCustomer)
router.delete('/:id', controller.DeleteCustomer)
router.put('/:id', controller.UpdateCustomer)

## the API Documentation contains all the requests informations in the Link below:


https://documenter.getpostman.com/view/22235951/UzR1LP2i


####

## code that are highly efficient
async AddCustomer(req, res, next) {
    const phone = req.body.phone;

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
          let numberData = {
            countryCode: response.data.country_code,
            countryName: response.data.country,
            operatorName: response.data.carrier,
          };
          const mv = new Customer({
            name: req.body.name,
            address: req.body.address,
            phone,
          });
          mv.save({}, (error, result) => {
            if (error) return next(error);
            res.send({result, numberData});
          });
        }
      })
      .catch((error) => {
        console.log(error);
      });

## parts that should be improved with more time investment
Create a seperate file for validationNumber API to make the code more clean , I tried it but I faced an issue with async function when I called it inside addCustomer function in controller

