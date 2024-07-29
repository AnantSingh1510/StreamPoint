// src/LandingPage.js
import React from 'react';
import {
  Box,
  Flex,
  Heading,
  Text,
  Button,
  Image,
  VStack,
  Container,
} from '@chakra-ui/react';
import { useNavigate } from 'react-router-dom';
import StreamPoint from '../imgs/StreamPoint.png'

const LandingPage = () => {
  const navigate = useNavigate();

  const handleGetStarted = () => {
    navigate("/videos");
  }

  return (
    <Container maxWidth="container.xl">

      <Box display={{base: 'none', md: 'block'}} marginTop={{ md:150, sm:0 }}>
        <Flex
          direction={{ base: 'column', md: 'row' }}
          align="center"
          justify="space-between"
          px="8"
          py="16"
        >
          <VStack spacing="8" align="start" maxW="lg">
            <Heading as="h1" size="2xl">
              Welcome to StreamPoint
            </Heading>
            <Text fontSize="lg" marginBottom={5}>
              Your ultimate destination for high-quality video streaming. Explore, watch, and enjoy your favorite videos seamlessly.
            </Text>
            <Button colorScheme="teal" size="lg" onClick={handleGetStarted}>
              Start watching
            </Button>
          </VStack>
          <Image
            src= {StreamPoint}
            alt="Streaming"
            borderRadius="md"
            mt={{ base: '8', md: '0' }}
          />
        </Flex>
      </Box>

      <Box display={{base: 'block', md: 'none'}} marginTop={{ md:150, sm:0 }}>
        <Flex
          direction={{ base: 'column', md: 'row' }}
          align="center"
          justify="space-between"
          px="8"
          py="16"
        >
          <VStack spacing="8" align="start" maxW="lg">
            <Image
              src= {StreamPoint}
              alt="Streaming"
              borderRadius="md"
              margin={10}
              maxWidth={300}
              mt={{ base: '8', md: '0' }}
            />
            <Heading as="h1" size="xl">
              Welcome to StreamPoint
            </Heading>
            <Text fontSize="lg" marginBottom={5}>
              Your ultimate destination for high-quality video streaming. Explore, watch, and enjoy your favorite videos seamlessly.
            </Text>
            <Button colorScheme="teal" size="lg" onClick={handleGetStarted}>
              Start watching
            </Button>
          </VStack>
        </Flex>
      </Box>
    </Container>
  );
};

export default LandingPage;
