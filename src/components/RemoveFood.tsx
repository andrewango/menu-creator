import React, { useState } from "react";
import {
    VStack,
    Flex,
    Grid,
    Image,
    Box,
    useMediaQuery,
    Accordion,
    AccordionItem,
    AccordionButton,
    AccordionIcon,
    AccordionPanel
} from "@chakra-ui/react";
import { Button } from "@chakra-ui/react";
import { foodProps } from "../interfaces/Food";
import { EditMenuList } from "./EditFoodList";
import { MenuList } from "../pages/AddFood";

export default function RemoveFood() {
    const [foodlist, setFoodlist] = useState<foodProps[]>(MenuList());

    const handleSubmit = (id: string) => {
        const newFoods: foodProps[] = foodlist.map(
            (food: foodProps): foodProps => ({
                ...food,
                type: [...food.type],
                ingredients: [...food.ingredients]
            })
        );
        const foodIndex = newFoods.findIndex(
            (food: foodProps): boolean => food.name === id
        );
        if (foodIndex > -1) {
            newFoods.splice(foodIndex, 1);
        }
        sessionStorage.setItem("menu", JSON.stringify(newFoods));
        setFoodlist(newFoods);

        const newEditFoods: foodProps[] = EditMenuList().map(
            (food: foodProps): foodProps => ({
                ...food,
                type: [...food.type],
                ingredients: [...food.ingredients]
            })
        );
        const removeFoodIndex = EditMenuList().findIndex(
            (food: foodProps): boolean => food.name === id
        );
        if (removeFoodIndex > -1) {
            newEditFoods.splice(removeFoodIndex, 1);
        }
        sessionStorage.setItem("editFoodList", JSON.stringify(newEditFoods));
    };

    const [isLargerThan2500] = useMediaQuery("(min-width: 2500px)");
    const [isLargerThan2200] = useMediaQuery("(min-width: 2200px)");
    const [isLargerThan1500] = useMediaQuery("(min-width: 1500px)");
    //const [isLargerThan1000] = useMediaQuery("(min-height: 1000px)");

    return (
        <VStack
            spacing="3px"
            mt={100}
            // //h={isLargerThan1000 ? window.innerHeight * 0.65 : "600px"}
            className="section remove-stack"
        >
            <Grid
                templateColumns={
                    isLargerThan1500
                        ? isLargerThan2200
                            ? isLargerThan2500
                                ? "repeat(4, 1fr)"
                                : "repeat(3, 1fr)"
                            : "repeat(2, 1fr)"
                        : "repeat(1, 1fr)"
                }
                gap={2}
            >
                {MenuList().map((food: foodProps) => {
                    return (
                        <Flex key={food.name} className="remove-flex">
                            <Accordion allowToggle textAlign="center" w="100%">
                                <AccordionItem>
                                    <h2>
                                        <AccordionButton>
                                            <Image
                                                src={food.image}
                                                alt={food.name}
                                                className="remove-image"
                                                boxSize="100px"
                                            />
                                            <Box
                                                className="remove-box"
                                                key={food.name}
                                            >
                                                <div className="foodtitle">
                                                    {food.name}
                                                </div>
                                            </Box>
                                            <Button
                                                className="remove-btn"
                                                id={food.name}
                                                onClick={() => {
                                                    handleSubmit(food.name);
                                                }}
                                            >
                                                remove
                                            </Button>
                                            <AccordionIcon />
                                        </AccordionButton>
                                    </h2>
                                    <AccordionPanel pb={4}>
                                        {food.desc}
                                        <hr></hr>
                                        <b>Type: </b> {food.type.join(", ")}
                                        <br></br>
                                        <b>Ingredients: </b>{" "}
                                        {food.ingredients.join(", ")}
                                        <br></br>
                                        <b>
                                            {food.popular
                                                ? food.spicy
                                                    ? "Popular, Spicy"
                                                    : "Popular"
                                                : ""}
                                            {!food.popular && food.spicy
                                                ? "Spicy"
                                                : ""}
                                        </b>
                                        {(food.popular || food.spicy) && (
                                            <>&emsp; | &emsp;</>
                                        )}
                                        <b>Rating: </b> {food.rating}
                                        <>&emsp;|&emsp;</>
                                        <b>Price: </b> <>$</>
                                        {food.price}
                                    </AccordionPanel>
                                </AccordionItem>
                            </Accordion>
                        </Flex>
                    );
                })}
            </Grid>
        </VStack>
    );
}