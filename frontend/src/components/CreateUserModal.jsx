import {
  Button,
  Flex,
  FormControl,
  FormLabel,
  Input,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Radio,
  RadioGroup,
  Textarea,
  useDisclosure,
  useToast,
} from "@chakra-ui/react";
import { useState } from "react";
import { BiAddToQueue } from "react-icons/bi";
import { BASE_URL } from "../App";

/**
 * Component for creating a new user.
 *
 * @param {Object} props - The component props.
 * @param {Function} props.setUsers - The function to update the list of users.
 * @return {JSX.Element} The CreateUserModal component.
 */
const CreateUserModal = ({ setUsers }) => {
  // State variables
  const { isOpen, onOpen, onClose } = useDisclosure(); // Modal state
  const [isLoading, setIsLoading] = useState(false); // Loading state
  const [inputs, setInputs] = useState({
    name: "", // User name
    role: "", // User role
    description: "", // User description
    gender: "", // User gender
  });
  const toast = useToast(); // Toast notification

  /**
   * Handles the creation of a new user.
   * Prevents page refresh and shows a success or error toast message.
   * Clears the inputs after successful creation.
   *
   * @param {Event} e - The form submission event.
   * @return {Promise<void>} - A promise that resolves when the user is created.
   */
  const handleCreateUser = async (e) => {
    e.preventDefault(); // prevent page refresh
    setIsLoading(true);
    try {
      // Send a POST request to create a new friend
      const res = await fetch(BASE_URL + "/friends", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(inputs),
      });

      const data = await res.json(); // Parse the response data
      if (!res.ok) {
        throw new Error(data.error); // Throw an error if the response is not ok
      }

      toast({
        // Show a success toast message
        status: "success",
        title: "Yayy! 🎉",
        description: "Friend created successfully.",
        duration: 2000,
        position: "top-center",
      });
      onClose(); // Close the modal
      setUsers((prevUsers) => [...prevUsers, data]); // Update the users state

      setInputs({
        // Clear the inputs
        name: "",
        role: "",
        description: "",
        gender: "",
      });
    } catch (error) {
      toast({
        // Show an error toast message
        status: "error",
        title: "An error occurred.",
        description: error.message,
        duration: 4000,
      });
    } finally {
      setIsLoading(false); // Set isLoading to false
    }
  };

  // Render the component
  return (
    <>
      {/* Button to open the modal */}
      <Button onClick={onOpen}>
        <BiAddToQueue size={20} />
      </Button>

      {/* Modal for creating a new user */}
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <form onSubmit={handleCreateUser}>
          <ModalContent>
            <ModalHeader> Create new friend </ModalHeader>
            <ModalCloseButton />

            <ModalBody pb={6}>
              <Flex alignItems={"center"} gap={4}>
                {/* Left */}
                <FormControl>
                  <FormLabel>Full Name</FormLabel>
                  <Input
                    placeholder="John Doe"
                    value={inputs.name}
                    onChange={(e) =>
                      setInputs({ ...inputs, name: e.target.value })
                    }
                  />
                </FormControl>

                {/* Right */}
                <FormControl>
                  <FormLabel>Role</FormLabel>
                  <Input
                    placeholder="Software Engineer"
                    value={inputs.role}
                    onChange={(e) =>
                      setInputs({ ...inputs, role: e.target.value })
                    }
                  />
                </FormControl>
              </Flex>

              <FormControl mt={4}>
                <FormLabel>Description</FormLabel>
                <Textarea
                  resize={"none"}
                  overflowY={"hidden"}
                  placeholder="He's a software engineer who loves to code and build things."
                  value={inputs.description}
                  onChange={(e) =>
                    setInputs({ ...inputs, description: e.target.value })
                  }
                />
              </FormControl>

              <RadioGroup mt={4}>
                <Flex gap={5}>
                  <FormLabel>Gender</FormLabel>
                  <Radio
                    value="male"
                    onChange={(e) =>
                      setInputs({ ...inputs, gender: e.target.value })
                    }
                  >
                    Male
                  </Radio>
                  <Radio
                    value="female"
                    onChange={(e) =>
                      setInputs({ ...inputs, gender: e.target.value })
                    }
                  >
                    Female
                  </Radio>
                </Flex>
              </RadioGroup>
            </ModalBody>

            <ModalFooter>
              <Button
                colorScheme="blue"
                mr={3}
                type="submit"
                isLoading={isLoading}
              >
                Add
              </Button>
              <Button onClick={onClose}>Cancel</Button>
            </ModalFooter>
          </ModalContent>
        </form>
      </Modal>
    </>
  );
};
export default CreateUserModal;
