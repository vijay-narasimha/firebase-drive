import React, { useRef,useState } from 'react';
import { Form, Button, Card,Alert } from 'react-bootstrap';
import { useAuth } from '../../contexts/AuthContext';
import Centered from './centered'

import {Link} from 'react-router-dom'
export default function Forgotpassword() {
  const emailRef = useRef();

  
  const { resetpassword} = useAuth();
  const [error,setError]=useState('')
  const [loading,setLoading]=useState(false)



  async function handlesubmit(e) {
    e.preventDefault();
    
    try {
      setError('')
      
      setLoading(true)
      await resetpassword(emailRef.current.value);
      
      
    } catch {
      setError('Failed to reset password')
    }
    setLoading(false)

  }

  return (
    <>
    <Centered>

   
      <Card>
        <Card.Body>
          <h2 className='text-center mb-4'>Reset password</h2>
          {error && <Alert variant='danger'>{error}</Alert>}
          <Form onSubmit={handlesubmit}>
            <Form.Group id='email'>
              <Form.Label>Email</Form.Label>
              <Form.Control type='email' ref={emailRef} required />
            </Form.Group>
           
            
            <Button type='submit' disabled={loading} className='w-100 mt-4' >
              Reset password
            </Button>
          </Form>
          <div className='w-100 text-center mt-4'><Link to='/login'>login</Link></div>
        </Card.Body>
      </Card>
      <div className='w-100 text-center mt-2'>
        Need an account? <Link to='/signup'>Signup</Link>
      </div>
      </Centered>
    </>
  );
}
