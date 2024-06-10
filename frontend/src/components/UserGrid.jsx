import { Flex, Grid, Spinner, Text } from "@chakra-ui/react";

import UserCard from "./UserCard";
import { useEffect, useState } from "react";
import { BASE_URL } from "../App";

/**
 * Component for rendering a grid of user cards.
 * @param {Object} props - The component props.
 * @param {Array} props.users - The list of users to render.
 * @param {Function} props.setUsers - The function to update the users list.
 * @returns {JSX.Element} - The rendered user grid.
 */
const UserGrid = ({ users, setUsers }) => {
  // State to track if the data is still loading
  const [isLoading, setIsLoading] = useState(true);

  /**
   * Fetches the list of users from the API and updates the state.
   */
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

  // Log the list of users
  console.log(users);

  // Render the user grid
  return (
    <>
      <Grid
        templateColumns={{
          base: "1fr",
          md: "repeat(2, 1fr)",
          lg: "repeat(3, 1fr)",
        }}
        gap={4}
      >
        {/* Render each user as a user card */}
        {users.map((user) => (
          <UserCard key={user.id} user={user} setUsers={setUsers} />
        ))}
      </Grid>

      {/* Show a loading spinner if the data is still loading */}
      {isLoading && (
        <Flex justifyContent={"center"}>
          <Spinner size={"xl"} />
        </Flex>
      )}

      {/* Show a message if there are no users found */}
      {!isLoading && users.length === 0 && (
        <Flex justifyContent={"center"}>
          <Text fontSize={"xl"}>
            <Text as={"span"} fontSize={"2xl"} fontWeight={"bold"} mr={2}>
              Poor you! 🥺
            </Text>
            No friends found.
          </Text>
        </Flex>
      )}
    </>
  );
};
export default UserGrid;
