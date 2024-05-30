import {
  Box,
  Button,
  Container,
  Flex,
  Input,
  InputGroup,
  InputLeftElement,
  useColorMode,
  useColorModeValue,
} from "@chakra-ui/react";
import { IoMoon } from "react-icons/io5";
import { LuSun } from "react-icons/lu";
import CreateUserModal from "./CreateUserModal";
import { BiSearch } from "react-icons/bi";

const Navbar = ({ setUsers }) => {
  const { colorMode, toggleColorMode } = useColorMode();
  return (
    <Container maxW={"900px"}>
      <Box
        px={4}
        my={4}
        borderRadius={5}
        bg={useColorModeValue("gray.200", "gray.700")}
      >
        <Flex h="16" alignItems={"center"} justifyContent={"space-between"}>
          {/* Left side */}
          <Flex
            alignItems={"center"}
            justifyContent={"center"}
            gap={3}
            display={{ base: "none", sm: "flex" }}
          >
            <InputGroup>
              <InputLeftElement pointerEvents="none">
                <BiSearch />
              </InputLeftElement>
              <Input
                placeholder="Search for users"
                onChange={(e) => setUsers(e.target.value)}
              />
            </InputGroup>
          </Flex>
          {/* Right side */}
          <Flex gap={3} alignItems={"center"}>
            <Button onClick={toggleColorMode}>
              {colorMode === "light" ? <IoMoon /> : <LuSun size={20} />}
            </Button>
            <CreateUserModal setUsers={setUsers} />
          </Flex>
        </Flex>
      </Box>
    </Container>
  );
};
export default Navbar;
