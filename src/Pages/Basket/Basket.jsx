import React, { useEffect, useState, useContext } from "react";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import { Container, Grid } from "@mui/material";
import AddShoppingCartIcon from "@mui/icons-material/AddShoppingCart";
import { BasketContext } from "./BasketContext";
import RemoveShoppingCartIcon from "@mui/icons-material/RemoveShoppingCart";
import "./basket.css";
import Order from "../../Components/Order/Order";
import { LoginContext } from "../Login/LoginContext";
import { useDispatch, useSelector } from "react-redux";

const Basket = () => {
//  const [total, setTotal] = useState(0);
  const { users, addUser } = useContext(LoginContext);
  //const { addToBasket, removeFromBasket, basketItems, total } = useContext(BasketContext);

  // const handleClick = (product) => {
  //   if (!basketItems.some((item) => item.id === product.id)) {
  //     addToBasket(product);
  //   } else {
  //     removeFromBasket(product);
  //   }
  // };
  let basketProducts = useSelector((state) => state);
  const total = basketProducts.reduce((acc, item) => acc + item.price, 0);


  console.log(basketProducts);
  let dispatch = useDispatch();
  const remove = (id) => {
    dispatch({ type: "REMOVE_FROM_BASKET", payload: id });
    // basketProducts.forEach(element => {
    //   total += element.price
    //   setTotal(...total)
    // });
    // for(let i =0;i<basketProducts.length;i++){
    //   total = total + basketProducts[i].price
    //    setTotal(...total)
    // }
  };
  return (
    <div className="basket">
      <Container>
        <div className="top">
          <div className="total">Total Count :
          {


              total.toFixed(2)
            }$</div>
          <div>
            {
              // users.some((item) => item.islogin === true)? :<></>

            }
            <Order />
          </div>
        </div>

        <Grid
          container
          rowSpacing={1}
          columnSpacing={{ xs: 1, sm: 2, md: 3, lg: 4 }}
        >
          {basketProducts.map((product, index) => (
            <Grid item xs={3} style={{ padding: 20 }} key={index}>
              <Card
                sx={{ maxWidth: 345 }}
                style={{
                  height: "100%",
                  border: "1px solid gray ",
                  padding: 10,
                }}
              >
                <CardMedia
                  component="img"
                  alt="green iguana"
                  height="150px"
                  style={{ width: 200, margin: "0 auto", objectFit: "contain" }}
                  image={product.image}
                />
                <CardContent>
                  <Typography
                    gutterBottom
                    variant="h6"
                    component="div"
                    style={{
                      overflow: "hidden",
                      textOverflow: "ellipsis",
                      whiteSpace: "nowrap",
                      fontSize: 18,
                    }}
                  >
                    {product.title}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    {product.price}$
                  </Typography>
                </CardContent>
                <CardActions>
                  <Button
                    size="small"
                    variant="contained"
                    className={
                      basketProducts.some((item) => item.id === product.id)
                        ? "remove-btn"
                        : "add-btn"
                    }
                    onClick={() => remove(product.id)}
                  >
                    {!basketProducts.some((item) => item.id === product.id) ? (
                      <span className="btn-body">
                        Add Basket{" "}
                        <AddShoppingCartIcon style={{ paddingLeft: 10 }} />{" "}
                      </span>
                    ) : (
                      <span className="btn-body">
                        Remove Basket{" "}
                        <RemoveShoppingCartIcon style={{ paddingLeft: 10 }} />{" "}
                      </span>
                    )}
                  </Button>
                </CardActions>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Container>
    </div>
  );
};

export default Basket;
