import { Container, Stack, Text } from "@chakra-ui/react";
import Navbar from "./components/Navbar";
import UserGrid from "./components/UserGrid";
import { useState } from "react";

// updated this after recording. Make sure you do the same so that it can work in production
export const BASE_URL =
  import.meta.env.MODE === "development" ? "http://127.0.0.1:5000/api" : "/api";

/**
 * Main App component.
 * Renders the Navbar and UserGrid components.
 * Updates the list of users using the setUsers function.
 */
function App() {
  // State to hold the list of users
  const [users, setUsers] = useState([]);

  return (
    <Stack minH="100vh">
      {/* Navbar component to display the app's name and a button to create a new user */}
      <Navbar setUsers={setUsers} />

      <Container maxW="1200px" my={4}>
        {/* Heading with a gradient background */}
        <Text
          fontSize={{ base: "3xl", md: "50" }}
          fontWeight="bold"
          letterSpacing="2px"
          textTransform="uppercase"
          textAlign="center"
          mb={8}
        >
          <Text
            as="span"
            bgGradient="linear(to-r, blue.400, purple.500)"
            bgClip="text"
          >
            Todo
          </Text>
          📝
        </Text>

        {/* UserGrid component to display the list of users */}
        <UserGrid users={users} setUsers={setUsers} />
      </Container>
    </Stack>
  );
}

export default App;
