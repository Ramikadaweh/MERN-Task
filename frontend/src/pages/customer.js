import { useEffect, useState, React } from "react";
import axios from "axios";

import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import { styled } from "@mui/material/styles";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";

export default function Customer() {
  const [customers, setCustomers] = useState([]);
  const [oneCustomer, setOneCustomer] = useState("");
  const [newCustomer, setNewCustomer] = useState({});
  console.log("costumer:::", oneCustomer);

  const [open, setOpen] = useState(false);

  const StyledTableCell = styled(TableCell)(({ theme }) => ({
    [`&.${tableCellClasses.head}`]: {
      backgroundColor: theme.palette.common.black,
      color: theme.palette.common.white,
    },
    [`&.${tableCellClasses.body}`]: {
      fontSize: 14,
    },
  }));

  const StyledTableRow = styled(TableRow)(({ theme }) => ({
    "&:nth-of-type(odd)": {
      backgroundColor: theme.palette.action.hover,
    },
    // hide last border
    "&:last-child td, &:last-child th": {
      border: 0,
    },
  }));

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
      <TableContainer component={Paper} style={{ boxShadow: "none" }}>
        <Table
          sx={{
            width: "55%",
            marginLeft: "auto",
            marginRight: "auto",
            marginTop: "5%",
          }}
          aria-label="customized table"
        >
          <TableBody>
            {customers.map((item, index) => {
              return (
                <>
                  <StyledTableRow key={index}>
                    <StyledTableCell component="th" scope="row">
                      {item.name}
                    </StyledTableCell>
                    <StyledTableCell align="right">
                      {item.address}
                    </StyledTableCell>
                    <StyledTableCell align="right">
                      {item.phone}
                    </StyledTableCell>
                    <EditIcon onClick={() => handleClickOpen(item)} name="editbtn"/>
                    <DeleteIcon
                      style={{ marginTop: "10%", marginLeft: "15%" }}
                      onClick={() => deleteCustomer(item._id)}
                      name="dltbtn"
                    />
                  </StyledTableRow>
                </>
              );
            })}
          </TableBody>
        </Table>
      </TableContainer>
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
