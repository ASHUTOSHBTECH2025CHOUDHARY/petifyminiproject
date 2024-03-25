import React, { useEffect, useState } from 'react'
import axios from 'axios';
import {HStack,Box,Image,Heading,Text,Button} from "@chakra-ui/react"
import { useLocation } from 'react-router-dom'

export const Mysinglepost = () => {
    const [post,setpost]=useState([])
    const [appliction,setapplication]=useState([])
    const location=useLocation()
    let _id='';
    console.log(post)
    const findpost=async()=>{
      let res=await axios.get( `http://localhost:8080/api/v2/getthispost/${_id}`).catch((error)=>console.log(error))
      let data=res.data.post
      return data
    }
    const findallplicatioins=async()=>{
        let res=await axios.get(`http://localhost:8080/api/v3/getapplicaton/${_id}`).catch((err)=>{
            console.log(err)
        })
        console.log(res.data.allapplication)
        return res.data.allapplication
    }
    useEffect(()=>{
        console.log(location.pathname.split('/'))
      let arr=location.pathname.split('/')
      _id=arr[2]
      console.log(_id)
      findpost().then((data)=>setpost(data))
      findallplicatioins().then((data)=>setapplication(data))
    },[])
    console.log(appliction)
    return (
    <HStack padding={2}>
        <Box
          direction={{ base: "column", sm: "row" }}
          boxShadow="md"
          borderRadius="lg"
          overflow="visible"
          variant="outline"
          width="50%"
        >
          <Image
            objectFit="cover"
            maxW={{ base: "100%", sm: "200px" }}
            src="https://images.unsplash.com/photo-1667489022797-ab608913feeb?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxlZGl0b3JpYWwtZmVlZHw5fHx8ZW58MHx8fHw%3D&auto=format&fit=crop&w=800&q=60"
            alt="Caffe Latte"
          />

          <HStack px={4} py={2} spacing={4} width="100%">
            <Heading size="md">{post._id}</Heading>
            <Text py="2">
              {post.content}
            </Text>
            
            <Button variant="solid" colorScheme="blue" >
              Buy Latte
            </Button>
          </HStack>
        </Box>
        {
            appliction.map((item,index)=>{
                return <Box
                direction={{ base: "column", sm: "row" }}
                boxShadow="md"
                borderRadius="lg"
                overflow="visible"
                variant="outline"
                width="50%"
                key={index}
              >
                <Image
                  objectFit="cover"
                  maxW={{ base: "100%", sm: "200px" }}
                  src="https://images.unsplash.com/photo-1667489022797-ab608913feeb?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxlZGl0b3JpYWwtZmVlZHw5fHx8ZW58MHx8fHw%3D&auto=format&fit=crop&w=800&q=60"
                  alt="Caffe Latte"
                />
      
                <HStack px={4} py={2} spacing={4} width="100%">
                  <Heading size="md">{item._id}</Heading>
                  <Text py="2">
                    {item.content}
                  </Text>
                  
                  <Button variant="solid" colorScheme="blue" >
                    Approve
                  </Button>
                </HStack>
              </Box>
            })
        }
    </HStack>
  )
}
