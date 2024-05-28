import {
  Avatar,
  Box,
  Card,
  CardHeader,
  Flex,
  Heading,
  Text,
  IconButton,
  CardBody,
} from "@chakra-ui/react";
import { BiTrash } from "react-icons/bi";
import EditModal from "./EditModal";

const UserCard = ({ user }) => {
  return (
    <Card
      padding={4}
      borderWidth={"1px"}
      borderRadius={"lg"}
      marginBottom={4}
      marginRight={4}
      marginLeft={4}
    >
      <CardHeader>
        <Flex gap={4} alignItems={"center"}>
          <Flex flex={"1"} gap={"4"}>
            <Avatar src="https://avatar.iran.liara.run/public" size={"sm"} />
            <Box>
              <Heading size="sm">{user.name}</Heading>
              <Text fontSize={"sm"}>{user.role}</Text>
            </Box>
          </Flex>
          <Flex>
            <EditModal />
            <IconButton
              variant="Ghost"
              size="sm"
              color={"red.500"}
              icon={<BiTrash size={20} />}
            ></IconButton>
          </Flex>
        </Flex>
      </CardHeader>
      <Box marginTop={4}>
        <CardBody>
          <Text>{user.description}</Text>
        </CardBody>
      </Box>
    </Card>
  );
};

export default UserCard;
