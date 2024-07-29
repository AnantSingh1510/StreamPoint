// src/Navbar.js
import React from 'react';
import {
  Box,
  Flex,
  HStack,
  IconButton,
  Button,
  useDisclosure,
  useColorMode,
  useColorModeValue,
  Stack,
  Link as ChakraLink,
  Heading,
  Image,
} from '@chakra-ui/react';
import { HamburgerIcon, CloseIcon, MoonIcon, SunIcon } from '@chakra-ui/icons';
import { Link as RouterLink, useNavigate } from 'react-router-dom';
import StreamPointLogo from '../imgs/StreamPointLogo.png'

const Navbar = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { colorMode, toggleColorMode } = useColorMode();
  const bgColor = useColorModeValue('gray.100', 'gray.900');
  const hoverBgColor = useColorModeValue('gray.200', 'gray.700');
  const icon = useColorModeValue(<MoonIcon />, <SunIcon />);

  const navigate = useNavigate();

  return (
    <Box bg={bgColor} px={4}>
      <Flex h={16} alignItems={'center'} justifyContent={'space-between'}>
        <IconButton
          size={'md'}
          icon={isOpen ? <CloseIcon /> : <HamburgerIcon />}
          aria-label={'Open Menu'}
          display={{ md: 'none' }}
          onClick={isOpen ? onClose : onOpen}
        />
        <HStack spacing={8} alignItems={'center'}>
          <HStack cursor={'pointer'} onClick={() => { navigate("/") }} marginLeft={8} spacing={2}>
            <Image maxWidth={8} src={StreamPointLogo} alt="logo" />
            <Heading size="md">StreamPoint</Heading>
          </HStack>
          <HStack
            as={'nav'}
            spacing={4}
            display={{ base: 'none', md: 'flex' }}
          >
            <ChakraLink as={RouterLink} to="/" px={2} py={1} rounded={'md'} _hover={{ textDecoration: 'none', bg: hoverBgColor }}>Home</ChakraLink>
            <ChakraLink as={RouterLink} to="/videos" px={2} py={1} rounded={'md'} _hover={{ textDecoration: 'none', bg: hoverBgColor }}>Videos</ChakraLink>
            <ChakraLink as={RouterLink} to="/upload" px={2} py={1} rounded={'md'} _hover={{ textDecoration: 'none', bg: hoverBgColor }}>Upload</ChakraLink>
          </HStack>
        </HStack>
        <Flex alignItems={'center'}>
          <Button onClick={toggleColorMode} variant="ghost" mr={4}>
            {icon}
          </Button>
        </Flex>
      </Flex>

      {isOpen ? (
        <Box pb={4} display={{ md: 'none' }}>
          <Stack as={'nav'} spacing={4}>
            <ChakraLink as={RouterLink} to="/" px={2} py={1} rounded={'md'} _hover={{ textDecoration: 'none', bg: hoverBgColor }} onClick={onClose}>Home</ChakraLink>
            <ChakraLink as={RouterLink} to="/videos" px={2} py={1} rounded={'md'} _hover={{ textDecoration: 'none', bg: hoverBgColor }} onClick={onClose}>Videos</ChakraLink>
            <ChakraLink as={RouterLink} to="/upload" px={2} py={1} rounded={'md'} _hover={{ textDecoration: 'none', bg: hoverBgColor }} onClick={onClose}>Upload</ChakraLink>
          </Stack>
        </Box>
      ) : null}
    </Box>
  );
};

export default Navbar;
