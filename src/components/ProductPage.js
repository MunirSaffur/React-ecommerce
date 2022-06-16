import React, { Component } from "react";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import { useLocation } from 'react-router-dom';
import { Tag } from '@chakra-ui/react'




const ProductPage= ()=>{
  const location = useLocation();
  const data = location.state;
  console.log(data)

    return (
      <Container>
        <Row>
          <Col lg={4}>
            <img src={data.avatar} />
          </Col>
          <Col lg={8} className="text-start">
            <h1 className="h1 bold">{data.name}</h1>
            <h3 className="my-3 h5">Price: <span className="text-danger h3">{data.price}$</span></h3>
            <h3 className="my-3 h5">Category <Tag className="">{data.category}</Tag></h3>
            <p className="text-dark p-3 bg-light border rounded">{data.description}</p>
          </Col>
        </Row>
      </Container>
    );
  }

export default  ProductPage;