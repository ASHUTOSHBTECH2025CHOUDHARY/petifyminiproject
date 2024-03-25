import {
  Avatar,
  Box,
  Button,
  Flex,
  HStack,
  Image,
  Heading,
  Text,
  VStack,
} from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { addtoken } from "../Store/Slice/Userslice";
const Myposts = () => {
  const [post, setPost] = useState([]);
  const token=localStorage.getItem("token");
  const dispatch=useDispatch();
  dispatch(addtoken(token));
  const {_id}=useSelector((state)=>{
    return state.userdata
  })
  console.log( _id)
  const navigation = useNavigate();
  async function findPosts() {
    try {
      const res = await axios
        .get(
          ` http://localhost:8080/api/v2/getMyPosts/${_id}`,
          { withCredentials: true }
        )
        .catch((err) => console.log(err));
      if (!res) {
        navigation("/login");
      }
      const data = res.data.posts;
      return data;
    } catch (error) {
      console.log(error);
      return [];
    }
  }
  const handleclick=(id)=>{
    console.log("mypost chla")
    navigation(`/mysinglepost/${id}`)
  }
  const handlecreatepost=(id)=>{
    navigation(`/createpost/${_id}`)
  }
  const handledelete=async(id)=>{
    console.log(_id)
    console.log(id)
    await axios.delete(`http://localhost:8080/api/v2/deletemypost/${_id}/${id}`).catch((err)=>console.log(err))
    findPosts().then((data) => setPost(data));
  }
  useEffect(() => {
    console.log("lag gaye")
    findPosts().then((data) => setPost(data));
  },[]);
  return (
    <HStack width="100%" height="100vh" marginTop={5}>
      <VStack width="20%" height="100%">
        <Flex
          align="center"
          justify="space-between"
          bg="gray.100"
          p={4}
          borderRadius="md"
        >
          <Avatar name="John Doe" src="https://via.placeholder.com/150" />
          <Box ml={4}>
            <Text fontSize="xl">John Doe</Text>
            <Text fontSize="sm" color="gray.600">
              Frontend Developer
            </Text>
          </Box>
          <Button colorScheme="teal" variant="outline" size="sm">
            Edit Profile
          </Button>
        </Flex>
      </VStack>

      <VStack
        id="add"
        width="60%"
        height="100%"
        overflowY="auto"
        css={{ "&::-webkit-scrollbar": { display: "none" } }}
      >
        <Button onClick={handlecreatepost}>createpost</Button>
        {post.map((posts, index) => (
  <Box
    key={index}
    direction={{ base: "column", sm: "row" }}
    boxShadow="md"
    borderRadius="lg"
    overflow="visible"
    variant="outline"
    width="100%"
    position="relative"
    minW="400px"
    maxW="full"
    maxH="200px"
    minH="200px" // Set maximum width
    height="200px" // Set fixed height
  >
    <HStack px={4} py={2} spacing={4} width="100%" height="100%"> {/* Specify height for HStack */}
      <Image
        objectFit="cover"
        maxW={{ base: "100%", sm: "200px" }}
        minW={{ base: "100%", sm: "200px" }}
        maxH="100%" // Set maximum height
        src="https://t4.ftcdn.net/jpg/02/26/53/33/360_F_226533348_TiIz0m2dU4dBXC6yFJrNOfXfh5YcEecY.jpg"
        alt="Caffe Latte"
      />
      <VStack align="start" spacing={2} flex="1" maxW="calc(100% - 200px)" py={4}> {/* Subtract Image width from max width */}
        <Heading size="md">{posts.name}</Heading>
        <Heading size="md">{posts.categories}</Heading>
        <Text>
          {posts.content.split(" ").slice(0, 10).join(" ")}
          {/* text is your input string */}...
        </Text>
      </VStack>
    </HStack>
    <Button
      variant="solid"
      colorScheme="blue"
      position="absolute"
      bottom="4"
      right="32"
      fontSize="sm" // Set font size
      width="100px" // Set fixed width
      height="40px" // Set fixed height
      lineHeight="40px" // Center button content vertically
      borderRadius="md" // Apply border radius
      onClick={() => handleclick(posts._id)}
    >
      View Requests
    </Button>
    <Button
      variant="solid"
      colorScheme="red"
      position="absolute"
      bottom="4"
      right="4"
      fontSize="sm" // Set font size
      width="100px" // Set fixed width
      height="40px" // Set fixed height
      lineHeight="40px" // Center button content vertically
      borderRadius="md" // Apply border radius
      onClick={() => handledelete(posts._id)}
    >
      Delete
    </Button>
  </Box>
))}

      </VStack>
    </HStack>
  );
};

export default Myposts;
