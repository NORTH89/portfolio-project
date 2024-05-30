import { Flex, SimpleGrid, Box, Spinner, Text } from "@chakra-ui/react";

import UserCard from "./UserCard";
import { useEffect, useState } from "react";
import { BASE_URL } from "../App";

const UserGrid = ({ users, setUsers }) => {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const getUsers = async () => {
      try {
        const res = await fetch(BASE_URL + "/friends");
        const data = await res.json();

        if (!res.ok) {
          throw new Error(data.error);
        }
        setUsers(data);
      } catch (error) {
        console.error(error);
      } finally {
        setIsLoading(false);
      }
    };
    getUsers();
  }, [setUsers]);

  console.log(users);
  return (
    <Box mt={12} textAlign="center">
      <Flex justifyContent={"center"}>
        {isLoading && (
          <Spinner size={"xl"} />
        )}
        {!isLoading && users.length === 0 && (
          <Text fontSize={"2xl"}>
            <Text as={"span"} fontSize={"4xl"} fontWeight={"bold"} mr={2}>
              Poor you! 🥺
            </Text>
            No friends found.
          </Text>
        )}
      </Flex>
      <SimpleGrid
        columns={{ base: 1, md: 2, lg: 3 }}
        spacing={4}
        mt={isLoading ? "0" : "4"}
      >
        {users.map((user) => (
          <UserCard key={user.id} user={user} setUsers={setUsers} />
        ))}
      </SimpleGrid>
    </Box>
  );
};
export default UserGrid;
