import { Container, VStack,Card,Heading,Text,CardBody,Stack,Image,CardFooter,Button } from '@chakra-ui/react'
import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useLocation } from 'react-router-dom'

const Myapplications = () => {
    const [applications,setapplications]=useState([])
    const location=useLocation()
    let _id=''
    const findallplicatioins=async()=>{
        const res=await axios.get(`http://localhost:8080/api/v3/getmyapplication/${_id}`).catch((err)=>console.log(err))
        return res.data.myapplications
    }
    useEffect(()=>{
        let arr=location.pathname.split('/')
      _id=arr[2]
      console.log(_id)
        findallplicatioins().then((data)=>setapplications(data)).catch((err)=>console.log(err))
    },[])
  return (
   <Container>
    <VStack>
        {
            applications.map((item,index)=>{
                return <Card
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
                    <Heading size='md'>The perfect latte</Heading>
              
                    <Text py='2'>
                     {
                      item.content
                     }
                    </Text>
                  </CardBody>
              
                  <CardFooter>
                    <Button variant='solid' colorScheme='blue'>
                      View msg
                    </Button>
                  </CardFooter>
                </Stack>
              </Card>
            })
        }
    </VStack>
   </Container>
  )
}

export default Myapplications