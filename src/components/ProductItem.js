import React, {useState, useEffect} from 'react'
import {Card} from 'react-bootstrap';
import { Link } from 'react-router-dom';


export default function ProductItem({productdata}){

    return (
        <Card style={{ width: '18rem' }} className="cardBody">
        <Card.Img variant="top" width="100" className='cardImg' src={productdata.avatar} />
        <Card.Body>
          <Card.Title>{productdata.name}</Card.Title>
          <Card.Text className='text-danger h5'>{productdata.price}$</Card.Text>
          <Card.Text className='my-3'>
          {`${productdata.description?.substring(0,50)}...`}
          </Card.Text>
          <Link className="btn btn-primary" to={{
            pathname: `/products/${productdata.id}`,
            state: productdata
          }}>Show Details</Link>
        </Card.Body>
      </Card>
    )
}
