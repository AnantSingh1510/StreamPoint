import React, { useState } from 'react';
import { Box, Button, FormControl, FormLabel, Input, Textarea, useToast, VStack, Spinner } from '@chakra-ui/react';
import axios from 'axios';

const UploadVideo = () => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [videoFile, setVideoFile] = useState(null);
  const [thumbnail, setThumbnail] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const toast = useToast();

  const handleVideoFileChange = (e) => {
    setVideoFile(e.target.files[0]);
  };

  const handleThumbnailChange = (e) => {
    setThumbnail(e.target.files[0]);
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true)
    if (!videoFile) {
      setIsLoading(false)
      toast({
        title: "No video file selected.",
        status: "error",
        duration: 3000,
        isClosable: true,
      });
      return;
    }


    const formData = new FormData();
    formData.append('title', title);
    formData.append('description', description);
    formData.append('file', videoFile);
    formData.append('thumbnail', thumbnail);

    try {
      const response = await axios.post('http://172.16.100.81:8080/api/videos', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      if (response.status === 201) {
        setIsLoading(false);
        toast({
          title: "Video uploaded successfully.",
          status: "success",
          duration: 3000,
          isClosable: true,
        });

        setTitle('');
        setDescription('');
        setVideoFile(null);
        setThumbnail(null);
      } else {
        throw new Error("Upload failed");
      }
    } catch (error) {
      setIsLoading(false);
      toast({
        title: "Error uploading video.",
        description: error.message,
        status: "error",
        duration: 3000,
        isClosable: true,
      });
    }
  };

  return (
    <Box p={4} maxWidth="600px" mx="auto">
      {
        isLoading?
        <Spinner
          size="xl"
          position="absolute"
          top="50%"
          left="50%"
          transform="translate(-50%, -50%)"
        />
        :

      <form onSubmit={handleSubmit}>
        <VStack spacing={4}>
          <FormControl id="title" isRequired>
            <FormLabel>Title</FormLabel>
            <Input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              />
          </FormControl>
          <FormControl id="description" isRequired>
            <FormLabel>Description</FormLabel>
            <Textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              />
          </FormControl>
          <FormControl id='thumbnail' isRequired>
            <FormLabel>Video thumbnail</FormLabel>
            <Input
              type='file'
              accept='image/*'
              onChange={handleThumbnailChange} 
              />
          <FormControl id="videoFile" isRequired>
            <FormLabel>Video File</FormLabel>
            <Input
              type="file"
              accept="video/*"
              onChange={handleVideoFileChange}
              />
          </FormControl>
          </FormControl>
          <Button type="submit" colorScheme="blue" width="full">
            Upload Video
          </Button>
        </VStack>
      </form>
      }
    </Box>
  );
};

export default UploadVideo;
