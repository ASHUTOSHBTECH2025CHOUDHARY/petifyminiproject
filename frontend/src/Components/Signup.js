import {
  Box,
  Input,
  FormControl,
  FormLabel,
  HStack,
  Heading,
  Text,
  VStack,
  Button,
} from "@chakra-ui/react";
import React from "react";
import { GiSittingDog } from "react-icons/gi";
import { Link } from "react-router-dom";

const Signup = () => {
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
      }}
    >
      <HStack spacing={10}>
        <Box display="flex" justifyContent="center" alignItems="center">
          <VStack>
            <GiSittingDog size={{ base: 25, md: 50, lg: 75, xl: 125 }} />
            <Text>petify</Text>
            <Text>Find Your New Friends</Text>
          </VStack>
        </Box>
        <Box
          w={["full", "md"]}
          p={[8, 8]}
          mt={[20, "10vh"]}
          border={["none", "1px"]}
          borderColor={["", "gray.300"]}
          borderRadius={10}
          boxShadow="lg"
        >
          <VStack spacing={4} align={"flex-start"} w={"full"}>
            <VStack align={["flex-start", "center"]} w={"full"}>
              <Heading>Register Yourself</Heading>
              <Text>Enter your e-mail and password to login</Text>
            </VStack>
            <FormControl>
              <FormLabel>UserName</FormLabel>
              <Input rounded="none" variant={"outline"} />
            </FormControl>
            <FormControl>
              <FormLabel>Email Address</FormLabel>
              <Input rounded="none" variant={"outline"} />
            </FormControl>
            <FormControl>
              <FormLabel>Password</FormLabel>
              <Input rounded={"none"} variant={"outline"} type="password" />
            </FormControl>
            <FormControl>
              <FormLabel>Address</FormLabel>
              <Input rounded="none" variant={"outline"} />
            </FormControl>
            <HStack w={"full"} justify={"space-between"}>
              <Button rounded={"none"}>Signup</Button>
              <Link to="/login">
                <Button variant={"Link"} colorScheme="blue">
                  Already have an account.
                </Button>
              </Link>
            </HStack>
          </VStack>
        </Box>
      </HStack>
    </div>
  );
};

export default Signup;
