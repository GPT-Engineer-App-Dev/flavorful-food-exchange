import { Container, VStack, Heading, Text, Box, Image, SimpleGrid, Button, HStack } from "@chakra-ui/react";
import { StarIcon } from "@chakra-ui/icons";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";

const Index = () => {
  const [recipes, setRecipes] = useState([]);
  const [ratings, setRatings] = useState({});

  useEffect(() => {
    const storedRecipes = JSON.parse(localStorage.getItem("recipes")) || [];
    const storedRatings = JSON.parse(localStorage.getItem("ratings")) || {};
    setRecipes(storedRecipes);
    setRatings(storedRatings);
  }, []);

  const handleRating = (recipeIndex, rating) => {
    const newRatings = { ...ratings, [recipeIndex]: rating };
    setRatings(newRatings);
    localStorage.setItem("ratings", JSON.stringify(newRatings));
  };

  const getAverageRating = (recipeIndex) => {
    const recipeRatings = ratings[recipeIndex] || [];
    if (recipeRatings.length === 0) return 0;
    const total = recipeRatings.reduce((acc, rating) => acc + rating, 0);
    return total / recipeRatings.length;
  };

  return (
    <Container maxW="container.xl" py={10}>
      <VStack spacing={8}>
        <Heading as="h1" size="2xl">Recipe Sharing Website</Heading>
        <Text fontSize="xl">Discover and share your favorite recipes!</Text>
        <Button as={Link} to="/submit-recipe" colorScheme="teal" size="lg">Submit a Recipe</Button>
        <SimpleGrid columns={{ base: 1, md: 2, lg: 3 }} spacing={10}>
          {recipes.map((recipe, index) => (
            <Box key={index} borderWidth="1px" borderRadius="lg" overflow="hidden">
              <Image src={recipe.image} alt={recipe.title} />
              <Box p={6}>
                <Heading as="h3" size="lg" mb={2}>{recipe.title}</Heading>
                <Text>{recipe.description}</Text>
                <HStack spacing={1}>
                  {[1, 2, 3, 4, 5].map((star) => (
                    <StarIcon
                      key={star}
                      color={star <= (ratings[index] || 0) ? "teal.500" : "gray.300"}
                      cursor="pointer"
                      onClick={() => handleRating(index, star)}
                    />
                  ))}
                </HStack>
                <Text mt={2}>Average Rating: {getAverageRating(index).toFixed(1)}</Text>
              </Box>
            </Box>
          ))}
        </SimpleGrid>
      </VStack>
    </Container>
  );
};

export default Index;