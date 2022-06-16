import React, { useEffect, useState } from "react";
import "./asstes/App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { ChakraProvider } from "@chakra-ui/react";
import { Button } from "react-bootstrap";
import axios from "axios";
import { Switch, Route, Link } from "react-router-dom";
import { AddIcon } from '@chakra-ui/icons'
// components
import Header from "./components/Header";
import ProductsList from "./components/ProductsList";
import ProductPage from "./components/ProductPage";
import AddProduct from "./components/AddProduct";

function App() {
  return (
    <ChakraProvider>
      <Header />
      <div className="App container">
          <Switch>
            <Route exact path="/" component={ProductsList} />
            <Route path="/products/:id" component={ProductPage} />
            <Route path="/add-product" component={AddProduct} />
          </Switch>
        <Link to='./add-product'><AddIcon  className="addIcon"/></Link>
      </div>
    </ChakraProvider>
  );
}

export default App;
