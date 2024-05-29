import { Container, Stack, Text } from "@chakra-ui/react";
import Navbar from "./components/Navbar";
import UserGrid from "./components/UserGrid";

export const BASE_URL =
  import.meta.env.MODE === "development" ? "http://127.0.0.1:5000/api" : "/api";
function App() {
  return (
    <Stack minH="100vh">
      <Navbar />
      <Container maxW={"1200px"} my={4}>
        <Text
          fontSize={{ base: "3xl", md: "50" }}
          fontWeight={"bold"}
          letterSpacing="2px"
          textTransform="uppercase"
          textAlign="center"
          mb={8}
        >
          <Text
            as="span"
            bgGradient="linear(to-l, blue.500, purple.500)"
            bgClip="text"
          >
            My Friends
          </Text>
          🚀
        </Text>
        <UserGrid />
      </Container>
    </Stack>
  );
}

export default App;
