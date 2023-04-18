import React from "react";
import { VStack } from "@chakra-ui/react";
import { foodProps } from "../interfaces/Food";
//import { DeliveryDropDown } from "./DeliveryDropDown";
import FoodItem from "./FoodItem";
export default function ItemListUI({
    foodData
}: {
    foodData: foodProps[];
}): JSX.Element {
    const foodList = foodData.map((foodProps) => {
        return {
            ...foodProps,
            type: [...foodProps.type],
            ingredients: [...foodProps.ingredients],
            price: foodProps.price
        };
    });
    // Maps each food in our list to a box with food details
    return (
        <VStack spacing="3px" mt={100}>
            {foodList.map((food) => {
                return (
                    <FoodItem
                        key={food.name}
                        name={food.name}
                        image={food.image}
                        desc={food.desc}
                        ingredients={food.ingredients}
                        price={food.price}
                    ></FoodItem>
                );
            })}
        </VStack>
    );
}
