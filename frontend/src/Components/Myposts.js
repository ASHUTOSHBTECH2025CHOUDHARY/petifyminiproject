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
      // console.log(localStorage.getItem("token"))
      const res = await axios
        .get(
          ` http://localhost:8080/api/v2/getMyPosts/${_id}`,
          { withCredentials: true }
        )
        .catch((err) => console.log(err));
      // console.log(res);
      if (!res) {
        navigation("/login");
      }
      // console.log("aksdjfhaksdjfhakjsdhf");
      const data = res.data.posts;
      // console.log(data);
      return data;
    } catch (error) {
      console.log(error);
      return [];
    }
  }

  useEffect(() => {
    findPosts().then((data) => setPost(data));
  }, []);
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
        {post.map((posts, index) => (
          <Box
            key={index}
            direction={{ base: "column", sm: "row" }}
            boxShadow="md"
            borderRadius="lg"
            overflow="visible"
            variant="outline"
            width="100%"
          >
            <Image
              objectFit="cover"
              maxW={{ base: "100%", sm: "200px" }}
              src="https://images.unsplash.com/photo-1667489022797-ab608913feeb?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxlZGl0b3JpYWwtZmVlZHw5fHx8ZW58MHx8fHw%3D&auto=format&fit=crop&w=800&q=60"
              alt="Caffe Latte"
            />

            <HStack px={4} py={2} spacing={4} width="100%">
              <Heading size="md">The perfect latte</Heading>
              <Text py="2">{posts.content}</Text>

              <Button variant="solid" colorScheme="blue">
                Buy Latte
              </Button>
            </HStack>
          </Box>
        ))}
      </VStack>
    </HStack>
  );
};

export default Myposts;
