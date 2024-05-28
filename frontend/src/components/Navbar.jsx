import {
  Box,
  Button,
  Container,
  Flex,
  Text,
  useColorModeValue,
  useColorMode,
} from "@chakra-ui/react";
import { IoMoon } from "react-icons/io5";
import { LuSun } from "react-icons/lu";
import Create_User_Model from "./Create_User_Model";

const Navbar = () => {
  const { colorMode, toggleColorMode } = useColorMode();
  return (
    <Container maxW={"900px"}>
      <Box
        px={4}
        my={4}
        borderRadius={5}
        bg={useColorModeValue("gray.200", "gray.700")}
      >
        <Flex h="50px" alignItems={"center"} justifyContent={"space-between"}>
          {/* Left side */}
          <Flex
            alignItems={"center"}
            justifyContent={"center"}
            gap={3}
            display={{ base: "none", sm: "flex" }}
          >
            <img
              src="/react.png"
              alt="React logo"
              width={30}
              height={30}
              style={{ objectFit: "contain" }}
            />
            <Text fontSize={"20px"}>+</Text>
            <img
              src="/python.png"
              alt="Python logo"
              width={30}
              height={30}
              style={{ objectFit: "contain" }}
            />
            <Text fontSize={"20px"}>=</Text>
            <img
              src="/explode.png"
              alt="Explode head"
              width={40}
              height={40}
              style={{ objectFit: "contain" }}
            />
          </Flex>
          {/* Right side */}
          <Flex gap={3} alignItems={"center"}>
            <Text
              fontSize={"lg"}
              fontWeight={500}
              display={{ base: "none", md: "block" }}
            >
              BFFship 🔥
            </Text>
            <Button onClick={toggleColorMode}>
              {colorMode === "light" ? <IoMoon /> : <LuSun size={20} />}
            </Button>
            <Create_User_Model />
          </Flex>
        </Flex>
      </Box>
    </Container>
  );
};

export default Navbar;
