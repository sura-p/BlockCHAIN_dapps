import React from 'react'
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
export default function CardUI() {
  return (
    <Card style={{ width: '18rem' }} className='main-card'>
    <Card.Img className='image' variant="top"  src={'https://images.unsplash.com/photo-1453728013993-6d66e9c9123a?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80'} />
    <Card.Body className='body'>
      <Card.Title className='title'>Card Title</Card.Title>
      <Card.Text className='text'>
        Some quick example text to build on the card title and make up the
        bulk of the card's content.
      </Card.Text>
      <Button variant="outline-success" className='button'>Success</Button>
    </Card.Body>
  </Card>
  )
}
