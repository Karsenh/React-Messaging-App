import React, { useRef } from 'react';
import { Container, Form, Button } from 'react-bootstrap';
import { v4 as uuidV4 } from 'uuid';

export default function Login({ onIdSubmit }) {
  // useRef for form inputs instead of onChange handlers
  const idRef = useRef();

  function handleSubmit(e) {
    e.preventDefault();

    onIdSubmit(idRef.current.value);
  }

  //   Triggered by Button's onClick
  function createNewId() {
    //   Create a new Unique User ID (Uuid) and pass into onIdSubmit to set state within App component
    onIdSubmit(uuidV4());
  }

  return (
    <Container
      className='align-items-center d-flex'
      style={{ height: '100vh' }}
    >
      <Form onSubmit={handleSubmit} className='w-100'>
        <Form.Group>
          <Form.Label>Enter your User ID</Form.Label>
          <Form.Control type='text' ref={idRef} required></Form.Control>
        </Form.Group>
        <Button className='mt-3' type='submit'>
          Login
        </Button>
        <Button
          className='mt-3'
          variant='secondary'
          style={{ marginLeft: '2rem' }}
          onClick={createNewId}
        >
          Create a New ID
        </Button>
      </Form>
    </Container>
  );
}
