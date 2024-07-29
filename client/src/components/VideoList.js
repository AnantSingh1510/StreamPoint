import React, { useState, useEffect } from "react";
import {
  Box,
  Container,
  Heading,
  Image,
  SimpleGrid,
  Spinner,
  Text,
  VStack,
} from "@chakra-ui/react";
import axios from "axios";
import useStore from "../utils/store";
import { useNavigate } from "react-router-dom";

const App = () => {
  const [videos, setVideos] = useState([]);
  const [loading, setLoading] = useState(true);

  const { setCurrentVideo } = useStore();
  const { setCurrentTitle } = useStore();
  const { setCurrentDesc } = useStore();

  const [imageLoaded, setImageLoaded] = useState({});

  const navigate = useNavigate();

  const handlePlay = (video) => {
    setCurrentVideo(video.url);
    setCurrentTitle(video.title);
    setCurrentDesc(video.description);
    navigate("/watch");
  };

  useEffect(() => {
    axios
      .get("http://172.16.100.81:8080/api/videos/list")
      .then((response) => {
        setVideos(response.data.reverse());
        // console.log(response.data);
        setLoading(false);
      })
      .catch((error) => {
        console.error("There was an error fetching the videos!", error);
      });
  }, []);

  const handleImageLoad = (index) => {
    setImageLoaded({ ...imageLoaded, [index]: true });
  };

  return (
    <Container maxW={1600} py={4}>
      <Heading mb={6}>Content for you to watch!</Heading>
      {loading ? (
        <Spinner
          size="xl"
          position="absolute"
          top="50%"
          left="50%"
          transform="translate(-50%, -50%)"
        />
      ) : (
        <VStack spacing={4}>
          <SimpleGrid columns={{ sm: 1, md: 3, lg: 4 }} spacing={5} w="100%">
            {videos.map((video, index) => (
              <Box
                position='relative'
                onClick={() => handlePlay(video)}
                borderWidth={1}
                cursor={"pointer"}
                key={index}
                padding={4}
                paddingStart={5}
                paddingEnd={5}
                borderRadius="lg"
              >
                {!imageLoaded[index] && (
                  <Spinner
                    size={"md"}
                    position="absolute"
                    top="50%"
                    left="50%"
                    transform="translate(-50%, -50%)"
                    zIndex={1}
                  />
                )}
                <Image
                  rounded={5}
                  fit={"cover"}
                  marginBottom={0}
                  marginTop={0}
                  src={`http://172.16.100.81:8080/api/videos/thumbnail/${video.thumbnailUrl}`}
                  onLoad={() => handleImageLoad(index)}
                  display={imageLoaded[index] ? "block" : "none"}
                  alt={video.title}
                />
                <Text
                  fontSize={{ base: 16, md: 20 }}
                  marginTop={{ base: 3, md: 0 }}
                  fontWeight={600}
                  paddingBottom={0}
                >
                  {video.title.length > 36
                    ? video.title.slice(0, 36) + "..."
                    : video.title}
                </Text>
              </Box>
            ))}
          </SimpleGrid>
        </VStack>
      )}
    </Container>
  );
};

export default App;
