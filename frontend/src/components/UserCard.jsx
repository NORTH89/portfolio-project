import {
  Avatar,
  Box,
  Card,
  CardBody,
  CardHeader,
  Flex,
  Heading,
  IconButton,
  Text,
  useToast,
} from "@chakra-ui/react";
import { BiTrash } from "react-icons/bi";
import EditModal from "./EditModal";
import { BASE_URL } from "../App";

/**
 * Component for rendering a user card.
 * @param {Object} props - The component props.
 * @param {Object} props.user - The user object.
 * @param {Function} props.setUsers - The function to update the users list.
 * @returns {JSX.Element} - The rendered user card.
 */
const UserCard = ({ user, setUsers }) => {
  // Use the useToast hook to display toast notifications.
  const toast = useToast();

  /**
   * Handles the deletion of a user.
   * @returns {Promise<void>} - A promise that resolves when the user is deleted.
   */
  const handleDeleteUser = async () => {
    try {
      // Send a DELETE request to delete the user.
      const res = await fetch(`${BASE_URL}/friends/${user.id}`, {
        method: "DELETE",
      });
      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.error);
      }
      // Update the users list by removing the deleted user.
      setUsers((prevUsers) => prevUsers.filter((u) => u.id !== user.id));
      // Show a success toast notification.
      toast({
        status: "success",
        title: "Success",
        description: "Friend deleted successfully.",
        duration: 2000,
        position: "top-center",
      });
    } catch (error) {
      // Show an error toast notification if an error occurs.
      toast({
        title: "An error occurred",
        description: error.message,
        status: "error",
        duration: 4000,
        isClosable: true,
        position: "top-center",
      });
    }
  };

  return (
    <Card boxShadow="md" borderWidth="1px">
      <CardHeader>
        <Flex gap={4}>
          <Flex flex={"1"} gap={"4"} alignItems={"center"}>
            {/* Display the user's avatar */}
            <Avatar src={user.imgUrl} />

            <Box>
              {/* Display the user's name and role */}
              <Heading size="sm">{user.name}</Heading>
              <Text>{user.role}</Text>
            </Box>
          </Flex>

          <Flex>
            {/* Render the EditModal component */}
            <EditModal user={user} setUsers={setUsers} />
            {/* Render the delete button */}
            <IconButton
              variant="ghost"
              colorScheme="red"
              size={"sm"}
              aria-label="See menu"
              icon={<BiTrash size={20} />}
              onClick={handleDeleteUser}
            />
          </Flex>
        </Flex>
      </CardHeader>

      <CardBody>
        {/* Display the user's description */}
        <Text>{user.description}</Text>
      </CardBody>
    </Card>
  );
};
export default UserCard;
