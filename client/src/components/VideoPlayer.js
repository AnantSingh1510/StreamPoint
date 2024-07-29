import { Box, Button, HStack, Spinner, Text, VStack } from '@chakra-ui/react'
import React, { useRef, useState } from 'react'
import useStore from '../utils/store'

const VideoPlayer = ( {video} ) => {
  const { currentVideo } = useStore();
  const { currentTitle } = useStore();
  const { currentDesc } = useStore();
  const [isPlaying, setIsPlaying] = useState(true);
  const [loading] = useState(false)
  const videoRef = useRef(null)

  const handlePlayPause = () => {
    if(videoRef.current.paused){
      videoRef.current.play();
      setIsPlaying(true);
    } else {
      videoRef.current.pause();
      setIsPlaying(false);
    }
  }

  const handleForward = () => {
    videoRef.current.currentTime += 10; 
  }

  const handleRewind = () => {
    videoRef.current.currentTime -= 10;
  }

  return (
    <>
        {loading ? (
        <Spinner size="xl" />
      ) : (
        <VStack spacing={4}>
          {currentVideo && (
            <>
              <Box maxW="container.xl" w="100%" mb={6}>
                <Box padding={2} marginTop={5}>
                  <video ref={videoRef} controls autoPlay width="100%" height="auto">
                    <source src={currentVideo} type="video/mp4" />
                    Your browser does not support the video tag.
                  </video>
                  <HStack justify={'center'} mt={5} spacing={10}>
                    <Button onClick={handleRewind} >Rewind 10s</Button>
                    <Button onClick={handlePlayPause} >{ isPlaying?"Play":"Pause"}</Button>
                    <Button onClick={handleForward} >Forward 10s</Button>
                  </HStack>
                </Box>
                <Box backgroundColor="#2d384d" margin={5} rounded={15} padding={6} >
                  <Text color='#FFFFFF' fontSize={{ base:14, lg:22}} paddingBottom={6}>{currentTitle}</Text>
                  <Text color='#FFFFFF' backgroundColor='#35425c' paddingLeft rounded={12} padding={6} fontSize={{ base:12, lg:16}}>{currentDesc}</Text>
                </Box>
              </Box>
            </>
          )}
        </VStack>
      )}
    </>
  )
}

export default VideoPlayer