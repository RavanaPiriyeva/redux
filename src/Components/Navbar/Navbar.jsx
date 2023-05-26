import React, { useContext } from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import { Link } from "react-router-dom";
import LocalMallIcon from "@mui/icons-material/LocalMall";
import "./navbar.css";
import { BasketContext } from "../../Pages/Basket/BasketContext";
import { LoginContext } from "../../Pages/Login/LoginContext";
import { useDispatch, useSelector } from "react-redux";

const Navbar = () => {
  const { users, setUsers } = useContext(LoginContext);
  // const { basketItems } = useContext(BasketContext);
  const user = users.find((user) => user.islogin === true);
  const logout = () => {
    user.islogin = false;
    setUsers([...users]);
  };

  let basketProducts = useSelector((state) => state);

  console.log(basketProducts);
  let dispatch = useDispatch();
  const remove = (id) => {
    dispatch({ type: "REMOVE_FROM_BASKET", payload: id });
  };

  return (
    <div>
      {" "}
      <Box sx={{ flexGrow: 1 }}>
        <AppBar position="fixed" style={{ backgroundColor: "black" }}>
          <Toolbar style={{ alignItems: "baseline" }}>
            <h1>E-commerce</h1>
            <Typography variant="h6" component="div" sx={{ flexGrow: 1 }} style={{ padding: '0 20px' }}>
              <Link to="/products"> Products </Link>
            </Typography>
            <Link to="/basket">
              <Button color="inherit" className="basket">
                <p>{basketProducts.length}</p>
                <LocalMallIcon />
              </Button>
            </Link>

            {user ? (
              <div style={{ paddingLeft: 40, textTransform: "uppercase" }}>
                {user.name}
                <Link to="/" className="login" onClick={logout}>
                  {" "}
                  <Button color="inherit">Logout</Button>
                </Link>
              </div>
            ) : (
              <Link to="/" className="login">
                {" "}
                <Button color="inherit">Login</Button>
              </Link>
            )}          </Toolbar>
        </AppBar>
      </Box>
    </div>
  );
};

export default Navbar;
