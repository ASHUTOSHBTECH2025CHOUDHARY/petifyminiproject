import {
  Flex,
  Box,
  Text,
  Button,
  cookieStorageManager,
} from "@chakra-ui/react";
import axios from "axios";
import { GiSittingDog } from "react-icons/gi";
import { Link, useNavigate } from "react-router-dom";

const Navbar = () => {
  const navigate = useNavigate();
  const item=localStorage.getItem("token")
  console.log(item)
  const logout = async () => {
    let res = await axios.get("http://localhost:8080/api/v1/logout", {
      withCredentials: true,
    });
    localStorage.clear()
    navigate("/login");
    console.log(res);
  };
  return (
    <Flex
      align="center"
      justify="space-between"
      bg="teal.500"
      p={[10, 4]}
      color="white"
      position="sticky"
      top="0"
      zIndex="999" // Ensure the Navbar appears above other content
    >
      <Link to="/">
        <Flex align="center" mx={10}>
         <Link to='/dashboard'>
         <Box as={GiSittingDog} /></Link> 
         <Link to='/dashboard'> <Text fontSize="xl" ml={2} fontWeight="bold">
            PETIFY
          </Text>
          </Link>
        </Flex>
      </Link>
        {
      
          item===null?'':<Flex ><Link to="/mypost" ><Button>
            Myposts
              </Button></Link>
            <Button mx={"4px"} onClick={logout}>
            <Text>logout</Text>
          </Button>
        </Flex>
        }
    </Flex>
  );
};

export default Navbar;
