import {
  Avatar,
  Box,
  Card,
  CardBody,
  Flex,
  Heading,
  IconButton,
  Text,
  useToast,
} from "@chakra-ui/react";
import { BiTrash } from "react-icons/bi";
import EditModal from "./EditModal";
import { BASE_URL } from "../App";

const UserCard = ({ user, setUsers }) => {
  const toast = useToast();
  const handleDeleteUser = async () => {
    try {
      const res = await fetch(BASE_URL + "/friends/" + user.id, {
        method: "DELETE",
      });
      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.error);
      }
      setUsers((prevUsers) => prevUsers.filter((u) => u.id !== user.id));
      toast({
        status: "success",
        title: "Success",
        description: "Friend deleted successfully.",
        duration: 2000,
        position: "top-center",
      });
    } catch (error) {
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
    <Card variant="outline" borderColor="gray.200" bgColor="gray.100">
      <CardBody>
        <Flex alignItems="center" justifyContent="space-between">
          <Flex flex={1} direction="column" alignItems="flex-start">
            <Heading size="sm">{user.name}</Heading>
            <Text color="gray.500">{user.role}</Text>
          </Flex>
          <Flex alignItems="center">
            <Avatar size="xs" src={user.imgUrl} mr={4} />
          </Flex>
        </Flex>
        <Flex alignItems="center" justifyContent="space-between">
          <Text>{user.description}</Text>
          <Flex alignItems="center" flex={1} justifyContent="flex-end">
            <EditModal user={user} setUsers={setUsers} />
            <IconButton
              variant="ghost"
              colorScheme="red"
              size={"sm"}
              aria-label="Delete"
              icon={<BiTrash size={20} />}
              onClick={handleDeleteUser}
            />
          </Flex>
        </Flex>
      </CardBody>
    </Card>
  );
};
export default UserCard;
