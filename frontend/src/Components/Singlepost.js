import React, { useEffect, useState } from 'react'
import {Box,HStack,Heading,Input ,Image,Label,Text,Textarea,Button,extendTheme,ChakraProvider,FormControl,FormLabel,FormHelperText,FormErrorMessage} from '@chakra-ui/react'
import { useSelector } from 'react-redux'
import axios from 'axios'
import { useLocation } from 'react-router-dom'
const Singlepost = () => {
  const activeLabelStyles = {
    transform: "scale(0.85) translateY(-24px)"
  };
  const [firstname,setfirstname]=useState('');
  const [lastname,setlastname]=useState('');
  const [content,setcontent]=useState('');
  const [email,setemail]=useState('');
  const handlefirstname=(e)=>{
    setfirstname(e.target.value)
    console.log(firstname)
  }
  const handlelastnname=(e)=>{
    setlastname(e.target.value)
    console.log(lastname)
  }
  const handleemail=(e)=>{
    setemail(e.target.value)
    console.log(email)
  }
  const handlecontent=(e)=>{
    setcontent(e.target.value)
    console.log(content)
  }
  
  const theme = extendTheme({
    components: {
      Form: {
        variants: {
          floating: {
            container: {
              _focusWithin: {
                label: {
                  ...activeLabelStyles
                }
              },
              "input:not(:placeholder-shown) + label, .chakra-select__wrapper + label, textarea:not(:placeholder-shown) ~ label": {
                ...activeLabelStyles
              },
              "textarea:not(:placeholder-shown) + label, .chakra-select__wrapper + label, textarea:not(:placeholder-shown) ~ label": {
                ...activeLabelStyles
              },
              label: {
                top: 0,
                left: 0,
                zIndex: 2,
                position: "absolute",
                backgroundColor: "white",
                pointerEvents: "none",
                mx: 3,
                px: 1,
                my: 2,
                transformOrigin: "left top"
              }
            }
          }
        }
      }
    }
  });
    const id=useSelector(state=>state.userdata.postid)
    const location=useLocation()
    const [post,setpost]=useState([])
    let _id='';
    console.log(post)
    const findpost=async()=>{
      let res=await axios.get( `http://localhost:8080/api/v2/getthispost/${_id}`).catch((error)=>console.log(error))
      let data=res.data.post
      return data
    }
    const submithandler=async()=>{
      let arr=location.pathname.split('/')
      _id=arr[2]
      console.log(_id)
      await axios.post(`http://localhost:8080/api/v3/createapplication`,{
        firstname:firstname,
        lastname:lastname,
        content:content,
        email:email,
        postid:_id
      }).catch((err)=>console.log(err))
      setfirstname('');
      setlastname('');
      setemail('');
      setcontent('');
    }
    useEffect(()=>{
      console.log(location.pathname.split('/'))
      let arr=location.pathname.split('/')
      _id=arr[2]
      console.log(_id)
      findpost().then((data)=>setpost(data))
    },[])
  return (
    <HStack p={8}>
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
        <Box width="50%">
        <ChakraProvider theme={theme}>
      <Box width="50%" m={3}>
        <FormControl variant="floating" id="first-name" isRequired isInvalid>
          <Input value={firstname} onChange={handlefirstname} placeholder="  " />
          <FormLabel>First name</FormLabel>
        </FormControl>
      </Box>
      <Box width="50%" m={3}>
        <FormControl variant="floating" id="first-name" isRequired isInvalid>
        <Input value={lastname} onChange={handlelastnname} placeholder="  " />
          <FormLabel>Lastname</FormLabel>
        </FormControl>
      </Box>
      <Box width="100%" m={3}>
        <FormControl variant="floating" id="first-name" isRequired isInvalid>
        <Input value={email} onChange={handleemail} placeholder="  " />
          <FormLabel>Email</FormLabel>
        </FormControl>
      </Box>
      <Box width="100%" m={3}>
        <FormControl variant="floating" id="first-name" isRequired isInvalid>
        <Input value={content} onChange={handlecontent} placeholder="  " />
          <FormLabel>Application</FormLabel>
        </FormControl>
      </Box>
      <Button onClick={submithandler}>Submit</Button>
    </ChakraProvider>
        </Box>
    </HStack>
  )
}

export default Singlepost