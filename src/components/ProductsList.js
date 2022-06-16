import React, { useEffect, useState } from "react";
import { Grid, GridItem } from "@chakra-ui/react";
import { Form } from "react-bootstrap";
import ProductItem from "./ProductItem";
import axios from "axios";
import { Skeleton, Stack } from "@chakra-ui/react";

export default function ProductsList() {
  const [loading, setLoading] = useState(true);
  const [prods, setProds] = useState([]);
  const [prodsList, setProdsList] = useState([]);
  const [filterVal, setFilterVal] = useState("");

  // getting data from API
  useEffect(() => {
    axios
      .get("https://62286b649fd6174ca82321f1.mockapi.io/case-study/products/")
      .then((res) => {
        const allData = res.data
        const myOwnData = allData.filter(item=>item.developerEmail === "monirsaffor@gmail.com")
          setProds(myOwnData)
          setProdsList(myOwnData)
          setLoading(false)
        });
  }, []);
  
  // Handling Filters
  function handleFilter(e){
    console.log(e.target.value)
    setFilterVal(e.target.value)
    if(e.target.value === "All"){
    setProdsList(prods)
    }else{
    const filterdData = prods.filter(item=>item.category === e.target.value);
    setProdsList(filterdData)
    }
  }

  return (
      <div>
          {loading ? (
        <Stack>
          <Skeleton height="20px"/>
          <Skeleton height="20px"/>
          <Skeleton height="20px"/>
        </Stack>
      ) : (
        <div>

          {/* Category Filter */}
          <Form.Group className="mb-3">
            <Form.Label htmlFor="category">Filter by category</Form.Label>
            <Form.Select
              id="category"
              onChange={(e) => handleFilter(e)}
              value={filterVal}
            >
              <option>All</option>
              <option>Electronic</option>
              <option>Furnitures</option>
              <option>Clothing</option>
              <option>Accessories</option>
            </Form.Select>
          </Form.Group>

          <Grid templateColumns="repeat(4, 1fr)" gap={4} className="mb-5">
       { prodsList.map((prod) => (
          <GridItem w="100%" className="d-flex align-items-stretch">
            <ProductItem key={prod.id} productdata={prod} />
          </GridItem>
        ))}
        </Grid>
        </div>
      )}
      </div>
    
  );
}
