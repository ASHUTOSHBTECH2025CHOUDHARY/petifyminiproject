import React, { useState } from 'react';
import {
  Box,
  Flex,
  Input,
  Button,
  VStack,
  Text,
  Divider,
} from '@chakra-ui/react';

const Chatbox = () => {
  const [messages, setMessages] = useState([]);
  const [inputValue, setInputValue] = useState('');

  const handleSendMessage = () => {
    if (inputValue.trim() !== '') {
      setMessages([...messages, inputValue]);
      setInputValue('');
    }
  };

  return (
    <Flex
      direction="column"
      w="400px"
      h="600px"
      border="1px solid #ccc"
      borderRadius="md"
      overflow="hidden"
    >
      <Box flex="1" overflowY="auto" p="4">
        <VStack spacing="4" align="flex-start">
          {messages.map((message, index) => (
            <Box key={index} borderRadius="md" bg="gray.100" p="2">
              <Text>{message}</Text>
            </Box>
          ))}
        </VStack>
      </Box>
      <Divider />
      <Flex p="4">
        <Input
          flex="1"
          variant="filled"
          placeholder="Type your message..."
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
        />
        <Button ml="2" colorScheme="blue" onClick={handleSendMessage}>
          Send
        </Button>
      </Flex>
    </Flex>
  );
};

export default Chatbox;
