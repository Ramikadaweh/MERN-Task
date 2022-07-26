import { useEffect, useState, React } from "react";
import axios from "axios";

import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";

export default function Customer() {
  const [customers, setCustomers] = useState([]);
  const [oneCustomer, setOneCustomer] = useState("");
  const [newCustomer, setNewCustomer] = useState({});

  const [open, setOpen] = useState(false);

  const handleClickOpen = (customer) => {
    setOneCustomer(customer);
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  function getCustomers() {
    axios
      .get("http://localhost:4000/customers/")
      .then((response) => {
        setCustomers(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }

  function onAddCustomer(e) {
    e.preventDefault();

    axios
      .post("http://localhost:4000/customers/", newCustomer)
      .then((Response) => {
        if (Response.status === 200) {
          setCustomers([...customers, Response.data.result]);
          setNewCustomer({});
        }
        console.log(Response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }

  const deleteCustomer = (_id) => {
    axios
      .delete(`http://localhost:4000/customers/${_id}`)
      .then((Response) => {
        console.log(Response);
        getCustomers();
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const editCustomer = (_id) => {
    axios
      .put(`http://localhost:4000/customers/${_id}`, oneCustomer)
      .then((Response) => {
        console.log(Response);
        getCustomers();
      })
      .catch((error) => {
        console.log(error);
      });
    setOpen(false);
  };

  useEffect(() => {
    getCustomers();
  }, []);

  const handleChange = (e) => {
    setOneCustomer({ ...oneCustomer, [e.target.id]: e.target.value });
  };

  const handleNewCostumerFields = (e) => {
    setNewCustomer({ ...newCustomer, [e.target.name]: e.target.value });
  };

  return (
    <div>
      <form id="cus">
        <Box
          sx={{
            "& > :not(style)": { m: 1, width: "25ch" },
          }}
          noValidate
          autoComplete="off"
        >
          <TextField
            id="customerName"
            label="name"
            variant="filled"
            name="name"
            value={newCustomer.name || ""}
            onChange={handleNewCostumerFields}
          />
          <TextField
            id="customerAddress"
            label="address"
            variant="filled"
            name="address"
            value={newCustomer.address || ""}
            onChange={handleNewCostumerFields}
          />
          <TextField
            id="customerPhone"
            label="number"
            variant="filled"
            name="phone"
            value={newCustomer.phone || ""}
            onChange={handleNewCostumerFields}
          />
        </Box>
        <Button name="addCustomer" variant="contained" onClick={onAddCustomer}>
          add customer
        </Button>
      </form>
      {customers.map((item, index) => {
        return (
            <div
              key={index}
              style={{ display: "flex", gap: "5%", justifyContent:"center" }}
            >
              <p>{item.name}</p>
              <p>{item.address}</p>
              <p>{item.phone}</p>
              <Button onClick={() => handleClickOpen(item)} name="editbtn">
                edit
              </Button>
              <Button onClick={() => deleteCustomer(item._id)} name="dltbtn">
                delete
              </Button>
            </div>
        );
      })}
      <Dialog open={open} onClose={handleClose}>
        <DialogContent>
          <TextField
            id="name"
            label="name"
            variant="filled"
            name="customerNamee"
            value={oneCustomer.name}
            onChange={handleChange}
          />
          <br />
          <TextField
            id="address"
            label="address"
            variant="filled"
            name="customerAddresss"
            value={oneCustomer.address}
            onChange={handleChange}
          />
          <br />
          <TextField
            id="phone"
            label="number"
            variant="filled"
            name="customerPhonee"
            value={oneCustomer.phone}
            onChange={handleChange}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>cancel</Button>
          <Button onClick={() => editCustomer(oneCustomer._id)} name="savebtn">
            save
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
