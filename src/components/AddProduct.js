import React, { useEffect, useState } from "react";
import { Container, Form, Button } from "react-bootstrap";
import { useToast, Spinner } from "@chakra-ui/react";
import { Link, useHistory } from "react-router-dom";
import axios from "axios";

const AddProduct = () => {
  const navigate = useHistory();
  const [loading, setLoading] = useState(false)
  const [categories, setCategories] = useState([]);
  const [data, setData] = useState({
    name: "",
    price: 0,
    category: "",
    description: "",
    avatar: "",
    developerEmail: "monirsaffor@gmail.com"
  });

  // getting catgories from API
  const toast = useToast();
  useEffect(() => {
    axios
      .get("https://62286b649fd6174ca82321f1.mockapi.io/case-study/categories/")
      .then((res) => setCategories(res.data))
      .catch((err) =>
        toast({
          title: "Ops somthing went wrong!",
          description: `${err.message} | could not found categories`,
          status: "error",
          duration: 3000,
          isClosable: true
        })
      );
  }, []);

  // handling the form of adding product
  function handle(e) {
    const newData = { ...data };
    newData[e.target.id] = e.target.value;
    setData(newData);
  }

  // posting data to API
  function postData(e) {
    if (
      data.name === "" ||
      data.price == 0 ||
      data.category === "" ||
      data.description === "" ||
      data.avatar === ""
    ) {
      e.preventDefault();
      toast({
        title: "Ops somthing went wrong!",
        description: "Please fulfill all the inputs",
        status: "error",
        duration: 3000,
        isClosable: true
      });
    } else {
      axios.post(
        "https://62286b649fd6174ca82321f1.mockapi.io/case-study/products/",
        data
      );
      setTimeout(()=>{
        window.location.replace("/");
      }, 1000)
      localStorage.setItem("product", JSON.stringify(data))
      setLoading(true)
    }
  }
  return (
    <Container style={{ width: "50%" }}>
      {loading ? (
        <Spinner
          thickness="4px"
          speed="0.65s"
          emptyColor="gray.200"
          color="blue.500"
          size="xl"
        />
      ) : (
        <Form>
        <fieldset>
          {/* Product name */}
          <Form.Group className="mb-3">
            <Form.Label htmlFor="name">Product Name</Form.Label>
            <Form.Control
              id="name"
              placeholder="Add Name"
              onChange={(e) => handle(e)}
              value={data.name}
            />
          </Form.Group>

          {/* Price */}
          <Form.Group className="mb-3">
            <Form.Label htmlFor="price">Product Name</Form.Label>
            <Form.Control
              id="price"
              type="number"
              placeholder="Add Price"
              onChange={(e) => handle(e)}
              value={data.price}
            />
          </Form.Group>

          {/* Category name */}
          <Form.Group className="mb-3">
            <Form.Label htmlFor="category">Select Category</Form.Label>
            <Form.Select
              id="category"
              onChange={(e) => handle(e)}
              value={data.category}
            >
              <option>Select a category</option>
              {categories.map((cat) => (
                <option key={cat.id}>{cat.name}</option>
              ))}
            </Form.Select>
          </Form.Group>

          {/* Description */}
          <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
            <Form.Label htmlFor="description">Product Description</Form.Label>
            <Form.Control
              as="textarea"
              rows={3}
              id="description"
              placeholder="Add Description"
              onChange={(e) => handle(e)}
              value={data.description}
            />
          </Form.Group>

          {/* Image Url */}
          <Form.Group className="mb-3">
            <Form.Label htmlFor="avatar">Image Url</Form.Label>
            <Form.Control
              id="avatar"
              type="text"
              placeholder="Add Url"
              onChange={(e) => handle(e)}
              value={data.avatar}
            />
          </Form.Group>

          <a
            className="btn btn-primary"
            onClick={(e) => {
              postData(e);
            }}
          >
            Submit
          </a>
        </fieldset>
      </Form>
      )}
    </Container>
  );
};

export default AddProduct;
