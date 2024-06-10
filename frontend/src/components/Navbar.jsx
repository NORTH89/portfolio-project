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

/**
 * Navbar component that displays the app's name and a button to create a new user.
 * It also includes a button to toggle the color mode.
 *
 * @param {Object} props - Component props.
 * @param {Function} props.setUsers - Function to update the list of users.
 *
 * @returns {JSX.Element} - Navbar component.
 */
const Navbar = ({ setUsers }) => {
  // Hooks
  const { colorMode, toggleColorMode } = useColorMode(); // Color mode management
  const navBg = useColorModeValue("gray.200", "gray.700"); // Background color
  const navText = useColorModeValue("gray.900", "gray.200"); // Text color
  const navShadow = useColorModeValue("lg", "dark-lg"); // Box shadow

  return (
    <Container maxW={"900px"} mt={8}>
      <Box
        p={4}
        borderRadius={5}
        bg={navBg}
        boxShadow={navShadow}
        textAlign={"center"}
      >
        {/* App's name */}
        <Flex alignItems={"center"} justifyContent={"space-between"}>
          <Flex alignItems={"center"}>
            <Heading size={"lg"} color={navText}>
              React + Python = 💥
            </Heading>
          </Flex>
          {/* Buttons */}
          <Flex gap={3} alignItems={"center"}>
            {/* Toggle color mode button */}
            <IconButton
              onClick={toggleColorMode}
              variant="ghost"
              colorScheme="blue"
              aria-label="Toggle color mode"
              icon={colorMode === "light" ? <IoMoon /> : <IoSunny />}
            />
            {/* Create user modal button */}
            <CreateUserModal setUsers={setUsers} />
          </Flex>
        </Flex>
      </Box>
    </Container>
  );
};
export default Navbar;
