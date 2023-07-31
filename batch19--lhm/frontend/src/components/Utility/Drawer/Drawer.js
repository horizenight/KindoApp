import React from "react";
import {
  Button,
  Text,
  Divider,
  Heading,
  Image,
  Stack,
  Drawer,
  DrawerBody,
  DrawerHeader,
  DrawerContent,
  DrawerCloseButton,
  DrawerOverlay,
  DrawerFooter
} from "@chakra-ui/react";

const DrawerComponent = ({ isOpen, infoWindowData, onClose, onNext, onPrevious, toggleAudio, isPlaying }) => {
  return (
    <Drawer
      isOpen={isOpen}
      placement="right"
      onClose={onClose}
      zIndex={15} // Set the zIndex to a value greater than 10
    >
      <DrawerOverlay />
      <DrawerContent>
        <DrawerCloseButton />
        <DrawerHeader>{infoWindowData?.name}</DrawerHeader>
        <DrawerBody>
        {infoWindowData.imageUrl &&  <Image
            className="card-image"
            src={infoWindowData?.imageUrl}
          />}
          <Stack mt="6" spacing="3">
            <Heading size="md">{infoWindowData?.name}</Heading>
            {infoWindowData?.id == "bfdf6903-1631-4143-a1b7-24c532fad74e" && <Button variant="outline" mr={3} onClick={toggleAudio} > { isPlaying && "Pause Audioguide" }{ !isPlaying && "Play Audioguide" }</Button>}
            <Text>{infoWindowData?.description}</Text>
          </Stack>
        </DrawerBody>
        <Divider />
        <DrawerFooter>
          <Button variant="outline" mr={3} onClick={onPrevious}>
            Previous
          </Button>
          <Button variant="outline" mr={3} onClick={onNext}>
            Next
          </Button>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  );
};

export default DrawerComponent;
