// src/ErrorPage.js
import React from 'react';
import { Box, Heading, Text, Button } from '@chakra-ui/react';
import { Link as RouterLink } from 'react-router-dom';

const ErrorPage = () => {
  return (
    <Box textAlign="center" py={10} px={6}>
      <Heading display="inline-block" as="h2" size="2xl" bgGradient="linear(to-r, teal.400, teal.600)" backgroundClip="text">
        Oops!
      </Heading>
      <Text fontSize="xl" mt={3} mb={2}>
        Something went wrong
      </Text>
      <Text color={'gray.500'} mb={6}>
        The page you are looking for might have been removed, had its name changed, or is temporarily unavailable.
      </Text>
      <Button
        colorScheme="teal"
        bgGradient="linear(to-r, teal.400, teal.500, teal.600)"
        color="white"
        variant="solid"
        as={RouterLink}
        to="/"
      >
        Go to Home
      </Button>
    </Box>
  );
};

export default ErrorPage;
