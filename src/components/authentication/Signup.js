import React, { useRef,useState } from 'react';
import { Form, Button, Card,Alert } from 'react-bootstrap';
import { useAuth } from '../../contexts/AuthContext';
import {Link,useNavigate} from 'react-router-dom'
import Centered from './centered'

export default function Signup() {
  const emailRef = useRef();
  const passwordRef = useRef();
  const confirmpasswordRef = useRef();
  const { signup } = useAuth();
  const [error,setError]=useState('')
  const [loading,setLoading]=useState(false)
  const history=useNavigate()
  async function handlesubmit(e) {
    e.preventDefault();
    if (passwordRef.current.value !== confirmpasswordRef.current.value) {
      return setError('password does not match')
    }
    try {
      setError('')
      setLoading(true)
      await signup(emailRef.current.value, passwordRef.current.value);
      history('/')
    } catch {
      setError('Failed to create account')
    }
    setLoading(false)
   
  }

  return (
    <>
    <Centered>

   
      <Card>
        <Card.Body>
          <h2 className='text-center mb-4'>Sign Up </h2>
          {error && <Alert variant='danger'>{error}</Alert>}
          <Form onSubmit={handlesubmit}>
            <Form.Group id='email'>
              <Form.Label>Email</Form.Label>
              <Form.Control type='email' ref={emailRef} required />
            </Form.Group>
            <Form.Group id='password'>
              <Form.Label>Password</Form.Label>
              <Form.Control type='password' ref={passwordRef} required />
            </Form.Group>
            <Form.Group id='confirmpassword'>
              <Form.Label>Confirm Password</Form.Label>
              <Form.Control type='password' ref={confirmpasswordRef} required />
            </Form.Group>
            <Button type='submit' disabled={loading} className='w-100 mt-4' >
              Sign Up
            </Button>
          </Form>
        </Card.Body>
      </Card>
      <div className='w-100 text-center mt-2'>
        
        Already have an account? <Link to='/login'>Login</Link>
      </div>
      </Centered>
    </>
  );
}
