import React, { useEffect, useState } from "react";
import { Form } from "react-bootstrap";
import { foodProps } from "../interfaces/Food";
import ItemListUI from "./ItemListUI";
import {
    Box,
    HStack,
    Radio,
    RadioGroup,
    Tag,
    TagLabel
} from "@chakra-ui/react";
import { MenuList } from "../pages/AddFood";
import "./Styles.css";

export function SearchBar(): JSX.Element {
    const [foods, setFoods] = useState<foodProps[]>(MenuList());
    const [text, setName] = useState<string>("");
    const [list, setList] = useState<foodProps[]>(foods);
    const [spicy, setSpicy] = useState<boolean>(false);
    const [popular, setPopular] = useState<boolean>(false);
    const [high, setHigh] = useState<boolean>(false);
    const [low, setLow] = useState<boolean>(false);
    const [rating, setRating] = useState<boolean>(false);
    const [appetizer, setAppetizer] = useState<boolean>(false);
    const [entree, setEntree] = useState<boolean>(false);
    const [dessert, setDessert] = useState<boolean>(false);
    const [sort, setSort] = useState<string>("");

    function updateName(event: React.ChangeEvent<HTMLInputElement>) {
        setName(event.target.value);
    }

    useEffect(() => {
        setFoods(MenuList());
    }, []);

    useEffect(() => {
        setListHelper(text);
    }, [spicy, popular, high, low, rating, appetizer, entree, dessert]);

    function checkSorting(foods: foodProps[]) {
        if (!high && !low && !rating) {
            return checkFoodType(foods);
        } else if (rating) {
            const sortedFoods = [...foods].sort((a, b) => {
                return a.rating < b.rating ? 1 : -1;
            });
            return checkFoodType(sortedFoods);
        }
        const sortedFoods = [...foods].sort((a, b) => {
            if (high) {
                return a.price < b.price ? 1 : -1;
            } else if (low) {
                return a.price > b.price ? 1 : -1;
            }
            return 0;
        });
        return checkFoodType(sortedFoods);
    }

    function checkFoodType(foods: foodProps[]) {
        if (!appetizer && !entree && !dessert) {
            return foods;
        }
        const resorted = [...foods].filter((x: foodProps): boolean => {
            const isAppetizer = appetizer && x.type.includes("Appetizer");
            const isEntree = entree && x.type.includes("Entree");
            const isDessert = dessert && x.type.includes("Dessert");

            return isAppetizer || isEntree || isDessert;
        });

        return resorted;
    }

    function setListHelper(text: string) {
        if (text === "" && !spicy && !popular) {
            setList(checkSorting(foods));
        } else {
            text = text.toLowerCase();
            console.log(foods);
            setList(
                checkSorting(
                    foods.filter((x: foodProps): boolean => {
                        const name = x.name.toLowerCase();
                        const desc = x.desc.toLowerCase();
                        const ingredients = x.ingredients.map((x) =>
                            x.toLowerCase()
                        );
                        const type = x.type.map((y) => y.toLowerCase());
                        if (spicy && popular) {
                            return (
                                (name.includes(text) ||
                                    desc.includes(text) ||
                                    ingredients.find((z) =>
                                        z.includes(text)
                                    ) !== undefined ||
                                    type.find((z) => z.includes(text)) !==
                                        undefined) &&
                                x.spicy === true &&
                                x.popular === true
                            );
                        } else if (spicy) {
                            return (
                                (name.includes(text) ||
                                    desc.includes(text) ||
                                    ingredients.find((z) =>
                                        z.includes(text)
                                    ) !== undefined ||
                                    type.find((z) => z.includes(text)) !==
                                        undefined) &&
                                x.spicy === true
                            );
                        } else if (popular) {
                            return (
                                (name.includes(text) ||
                                    desc.includes(text) ||
                                    ingredients.find((z) =>
                                        z.includes(text)
                                    ) !== undefined ||
                                    type.find((z) => z.includes(text)) !==
                                        undefined) &&
                                x.popular === true
                            );
                        } else {
                            return (
                                name.includes(text) ||
                                desc.includes(text) ||
                                ingredients.find((z) => z.includes(text)) !==
                                    undefined ||
                                type.find((z) => z.includes(text)) !== undefined
                            );
                        }
                    })
                )
            );
        }
    }

    return (
        <div>
            <Form.Group controlId="formCorrectAnswer">
                <Form.Label style={{ color: "white" }}>
                    Search for Food
                </Form.Label>
                <Form.Control
                    value={text}
                    onChange={(e) => {
                        updateName(e as React.ChangeEvent<HTMLInputElement>);
                        setListHelper(e.target.value);
                    }}
                />
            </Form.Group>
            <HStack pl={6} mt={1} spacing={5}>
                <Box textColor="white" fontWeight="bold">
                    Filter:{" "}
                </Box>
                <Tag
                    className="tag"
                    backgroundColor={spicy ? "#f56565" : "#f1f1f166"}
                    onClick={() => {
                        setSpicy(!spicy);
                        setListHelper(text);
                    }}
                >
                    <TagLabel>Spicy</TagLabel>
                </Tag>
                <Tag
                    className="tag"
                    backgroundColor={popular ? "#f56565" : "#f1f1f166"}
                    onClick={() => {
                        setPopular(!popular);
                        setListHelper(text);
                    }}
                >
                    <TagLabel>Popular</TagLabel>
                </Tag>
                <Tag
                    className="tag"
                    backgroundColor={appetizer ? "#f56565" : "#f1f1f166"}
                    onClick={() => {
                        setAppetizer(!appetizer);
                        setListHelper(text);
                    }}
                >
                    <TagLabel>Appetizers</TagLabel>
                </Tag>
                <Tag
                    className="tag"
                    backgroundColor={entree ? "#f56565" : "#f1f1f166"}
                    onClick={() => {
                        setEntree(!entree);
                        setListHelper(text);
                    }}
                >
                    <TagLabel>Entree</TagLabel>
                </Tag>
                <Tag
                    className="tag"
                    backgroundColor={dessert ? "#f56565" : "#f1f1f166"}
                    onClick={() => {
                        setDessert(!dessert);
                        setListHelper(text);
                    }}
                >
                    <TagLabel>Dessert</TagLabel>
                </Tag>
            </HStack>
            <RadioGroup>
                <HStack pl={6} mt={1} spacing={5}>
                    <Box textColor="white" fontWeight="bold">
                        Sort By:{" "}
                    </Box>
                    <Radio
                        colorScheme="red"
                        value="high"
                        textColor="white"
                        onChange={() => {
                            setHigh(true);
                            setLow(false);
                            setRating(false);
                            setListHelper(text);
                            setSort("high");
                        }}
                        hidden
                    >
                        <Box
                            color={sort === "high" ? "white" : "#f1f1f199"}
                            className="radio"
                        >
                            Price: High to Low
                        </Box>
                    </Radio>
                    <Radio
                        colorScheme="red"
                        value="low"
                        textColor="white"
                        onChange={() => {
                            setHigh(false);
                            setLow(true);
                            setRating(false);
                            setListHelper(text);
                            setSort("low");
                        }}
                        hidden
                    >
                        <Box
                            color={sort === "low" ? "white" : "#f1f1f199"}
                            className="radio"
                        >
                            Price: Low to High
                        </Box>
                    </Radio>
                    <Radio
                        colorScheme="red"
                        value="rating"
                        textColor="white"
                        onChange={() => {
                            setHigh(false);
                            setLow(false);
                            setRating(true);
                            setListHelper(text);
                            setSort("rating");
                        }}
                        hidden
                    >
                        <Box
                            color={sort === "rating" ? "white" : "#f1f1f199"}
                            className="radio"
                        >
                            Rating
                        </Box>
                    </Radio>
                </HStack>
            </RadioGroup>

            <div>
                <ItemListUI foodData={list}></ItemListUI>
            </div>
        </div>
    );
}
