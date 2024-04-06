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
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { addpostid, addtoken } from "../Store/Slice/Userslice";


const Dashboard = () => {
  const [post, setPost] = useState([]);
  const navigate = useNavigate();
  const [user,setuser]=useState([])
  const dispatch=useDispatch()
  let admin=''
  let token=localStorage.getItem("token")
  dispatch(addtoken(token))
  const id=useSelector(state=>state.userdata._id)
  let string="aldksjfjlka alsdkfjaslkdjf aldsfkjalsdjf alsdfjkalskdjf asldjfasdlfj alsdfjsdlajf aslkfjlasdkjf alksdjflksjdaf alsdfjalskdjf asdlkfjladskjf asldfjlaskjdf asldfjkslakdjf asldfjsldakfj asldfjkdslkjf asldfjsldkjf asldjflskdfj asdkfjlkjasdf asdlfkjaslkdjf alskdjfalksjdf asldkfjaldskfj"
  async function findPosts() {
    try {
      const res = await axios
        .get("http://localhost:8080/api/v2/getAllPosts")
        .catch((err) => console.log(err));
      if (!res) {
        navigate("/login");
      }
      const data = res.data.allposts;
      return data;
    } catch (error) {
      console.log(error);
      return [];
    }
  }
  const handleclick=(id)=>{
    dispatch(addpostid(id))
    navigate(`/singlepost/${id}`)
  }
  
  const findadmin=async()=>{
      let res=await axios.get(` http://localhost:8080/api/v1/getuser/${id}`).catch((error)=>console.log(error))
      let {role}=res.data.user
        return res.data.user
  }
  console.log(user)
  useEffect(() => {
    findadmin().then((data)=>setuser(data)).catch((error)=>console.log("Findamin nhi chala"))
    findPosts().then((data) => setPost(data)).catch((err)=>console.log("findposts nhi chala"));
    if(user.role=="admin"){
      admin="admin"
    }
  }, []);

  return (
    <HStack width="100%" height="100vh" marginTop={5} padding={3}>
      <VStack  height="100%" m={10}>
        <Flex
          align="center"
          justify="space-between"
          bg="gray.100"
          p={4}
          borderRadius="md"
        >
          <Avatar name="John Doe" src="https://via.placeholder.com/150" />

          <Box ml={4}>
            <Text fontSize="xl">{user.username}</Text>
            <Text fontSize="sm" color="gray.600">
             {user.email}
            </Text>
          </Box>
        {
          user.role==="admin"?<Link to='/adminpanel'><Button colorScheme="teal" variant="outline" size="sm">
          See all useres
        </Button></Link>:""
        }
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
            right="4"
            fontSize="sm" // Set font size
            width="100px" // Set fixed width
            height="40px" // Set fixed height
            lineHeight="40px" // Center button content vertically
            borderRadius="md" // Apply border radius
            onClick={() => handleclick(posts._id)}
          >
            Adopt it
          </Button>
        </Box>
              
        ))}
      </VStack>
    </HStack>
  );
};

export default Dashboard;
