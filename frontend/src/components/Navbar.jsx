import {
  Box,
  Container,
  Flex,
  Heading,
  IconButton,
  useColorMode,
  useColorModeValue,
} from "@chakra-ui/react";
import { IoMoon, IoSunny } from "react-icons/io5";
import CreateUserModal from "./CreateUserModal";

const Navbar = ({ setUsers }) => {
  const { colorMode, toggleColorMode } = useColorMode();
  const navBg = useColorModeValue("gray.200", "gray.700");
  const navText = useColorModeValue("gray.900", "gray.200");
  const navShadow = useColorModeValue("lg", "dark-lg");
  return (
    <Container maxW={"900px"} mt={8}>
      <Box
        p={4}
        borderRadius={5}
        bg={navBg}
        boxShadow={navShadow}
        textAlign={"center"}
      >
        <Flex alignItems={"center"} justifyContent={"space-between"}>
          {/* Left side */}
          <Flex alignItems={"center"}>
            <Heading size={"lg"} color={navText}>
              React + Python = 💥
            </Heading>
          </Flex>
          {/* Right side */}
          <Flex gap={3} alignItems={"center"}>
            <IconButton
              onClick={toggleColorMode}
              variant="ghost"
              colorScheme="blue"
              aria-label="Toggle color mode"
              icon={colorMode === "light" ? <IoMoon /> : <IoSunny />}
            />
            <CreateUserModal setUsers={setUsers} />
          </Flex>
        </Flex>
      </Box>
    </Container>
  );
};
export default Navbar;
