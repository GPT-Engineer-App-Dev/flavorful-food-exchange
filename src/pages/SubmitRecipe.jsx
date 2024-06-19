import { useState } from "react";
import { Container, VStack, Heading, Input, Textarea, Button, FormControl, FormLabel } from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";

const SubmitRecipe = () => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [image, setImage] = useState("");
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    const newRecipe = { title, description, image };
    const existingRecipes = JSON.parse(localStorage.getItem("recipes")) || [];
    localStorage.setItem("recipes", JSON.stringify([...existingRecipes, newRecipe]));
    navigate("/");
  };

  return (
    <Container maxW="container.md" py={10}>
      <VStack spacing={8}>
        <Heading as="h1" size="2xl">Submit Your Recipe</Heading>
        <form onSubmit={handleSubmit}>
          <VStack spacing={4}>
            <FormControl id="title" isRequired>
              <FormLabel>Title</FormLabel>
              <Input value={title} onChange={(e) => setTitle(e.target.value)} />
            </FormControl>
            <FormControl id="description" isRequired>
              <FormLabel>Description</FormLabel>
              <Textarea value={description} onChange={(e) => setDescription(e.target.value)} />
            </FormControl>
            <FormControl id="image" isRequired>
              <FormLabel>Image URL</FormLabel>
              <Input value={image} onChange={(e) => setImage(e.target.value)} />
            </FormControl>
            <Button type="submit" colorScheme="teal" size="lg" width="full">Submit</Button>
          </VStack>
        </form>
      </VStack>
    </Container>
  );
};

export default SubmitRecipe;