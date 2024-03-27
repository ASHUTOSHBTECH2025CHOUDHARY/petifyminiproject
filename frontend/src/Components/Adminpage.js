import React, { useEffect, useState } from 'react'
import {Container,Heading,Text,CardBody,CardFooter,Image,Stack,Button,Card,} from '@chakra-ui/react'
import axios from 'axios'
const Adminpage = () => {
  const [users,setusers]=useState([])
  const findusers=async()=>{
    let res=await axios.get(` http://localhost:8080/api/v1/getallusers`).catch((err)=>{
      console.log(err)
    })
    return res.data.users
  }
  const handledelete=async()=>{
    // let res=await axios.delete(`http://localhost:8080/api/v1/deleteuser/${id}`).catch((err)=>console.log(err))
    console.log("chala") 
  }
  const handlehllo=async(id)=>{
    let res=await axios.delete(`http://localhost:8080/api/v1/deleteuser/${id}`).catch((err)=>console.log(err))
    setusers(res.data.user)
  }
  useEffect(()=>{
    findusers().then((data)=>setusers(data)).catch((err)=>console.log("users set nhi hua"))
  },[])
  console.log(users)
  return (
    <Container padding={4} backgroundColor={"red"} minW="80%">
        {
          users.map((user,index)=>{
            return <Card key={index}
            m={2}
            direction={{ base: 'column', sm: 'row' }}
            overflow='hidden'
            variant='outline'
          >
            <Image
              objectFit='cover'
              maxW={{ base: '100%', sm: '200px' }}
              src='https://images.unsplash.com/photo-1667489022797-ab608913feeb?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxlZGl0b3JpYWwtZmVlZHw5fHx8ZW58MHx8fHw%3D&auto=format&fit=crop&w=800&q=60'
              alt='Caffe Latte'
            />
          
            <Stack>
              <CardBody>
                <Heading size='md'>{user.username}</Heading>
          
                <Text py='2'>
                 {user.email}
                </Text>
              </CardBody>
          
              <CardFooter>
                {/* <Button variant='solid' colorScheme='red' onClick={handledelete}>
                  Delete User
                </Button> */}
                <Button onClick={()=>handlehllo(user._id)}>
                  hllo
                </Button>
              </CardFooter>
            </Stack>
          </Card>
          })
        }
    </Container>
  )
}

export default Adminpage