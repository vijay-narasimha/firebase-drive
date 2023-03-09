import React,{useState} from 'react';

import { Card, Button ,Alert } from 'react-bootstrap';
import {useAuth} from '../contexts/AuthContext'
import {Link,useNavigate} from 'react-router-dom'
import Centered from './authentication/centered'

export default function Profile() {
  const [error,setError]=useState('')
const {currentUser,logout}=useAuth()
const history=useNavigate()
async function handleLogout(){
setError("")
try{
await logout()
history('/login')

}catch{
  setError('failed to logout')
}
}

  return (
    <>
    <Centered>

   
      <Card>
        <Card.Body>
          <h2 className='text-center mb-4'>Profile</h2>
          {error && <Alert variant='danger'>{error}</Alert>}
<strong>Email:</strong> {currentUser.email}
  <Link to='/' className='btn btn-primary w-100 mt-3'>update</Link>
        </Card.Body>
      </Card>
      <div className='w-100 text-center mt-2'>
        <Button variant='link' onClick={handleLogout}>Logout</Button>
      </div>
      </Centered>
    </>
  );
}
