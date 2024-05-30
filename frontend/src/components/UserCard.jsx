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
  useColorModeValue,
} from "@chakra-ui/react";
import { BiTrash } from "react-icons/bi";
import EditModal from "./EditModal";
import { BASE_URL } from "../App";

const UserCard = ({ user, setUsers }) => {
  const { id, imgUrl, name, role, description } = user;
  const toast = useToast();
  const cardBg = useColorModeValue("white", "gray.700");
  const cardBorderColor = useColorModeValue("gray.200", "gray.600");

  const handleDeleteUser = async () => {
    try {
      const res = await fetch(`${BASE_URL}/friends/${id}`, {
        method: "DELETE",
      });
      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.error || "Failed to delete friend.");
      }
      setUsers((prevUsers) => prevUsers.filter((u) => u.id !== id));
      toast({
        status: "success",
        title: "Success",
        description: "Friend deleted successfully.",
        duration: 2000,
        position: "top",
      });
    } catch (error) {
      console.error("Delete user error:", error);
      toast({
        title: "An error occurred",
        description: error.message,
        status: "error",
        duration: 4000,
        isClosable: true,
        position: "top",
      });
    }
  };

  return (
    <Card
      sx={{
        borderWidth: "1px",
        borderRadius: "lg",
        overflow: "hidden",
        boxShadow: "lg",
        bg: cardBg,
        borderColor: cardBorderColor,
        _hover: {
          boxShadow: "xl",
        },
      }}
    >
      <CardHeader>
        <Flex gap={4}>
          <Flex flex={"1"} gap={"4"} alignItems={"center"}>
            <Avatar src={imgUrl} />
            <Box>
              <Heading size="sm">{name}</Heading>
              <Text>{role}</Text>
            </Box>
          </Flex>
          <Flex>
            <EditModal user={user} setUsers={setUsers} />
            <IconButton
              variant="ghost"
              colorScheme="red"
              size={"sm"}
              aria-label="Delete friend"
              icon={<BiTrash size={20} />}
              onClick={handleDeleteUser}
            />
          </Flex>
        </Flex>
      </CardHeader>
      <CardBody>
        <Flex alignItems="start">
          <Box pl={6}>
            <Text>{description}</Text>
          </Box>
        </Flex>
      </CardBody>
    </Card>
  );
};

export default UserCard;
