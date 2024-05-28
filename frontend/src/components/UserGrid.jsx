import { Grid } from "@chakra-ui/react";
import UserCard from "./UserCard";
import { users } from "../dummy/dummy";

const UserGrid = () => {
  return (
    <Grid
      templateColumns={{
        base: "1fr",
        md: "repeat(2, 1fr)",
        lg: "repeat(2, 1fr)",
      }}
    >
      {users.map((user) => (
        <UserCard key={user.id} user={user} />
      ))}
    </Grid>
  );
};

export default UserGrid;
