import React from "react";
import {
    Heading,
    Table,
    Thead,
    Tbody,
    Tr,
    Th,
    Td,
    TableContainer,
    Flex,
    Spacer,
    VStack,
    Button
} from "@chakra-ui/react";

import { userProps } from "../interfaces/User";
import { foodProps } from "../interfaces/Food";
import NavBar from "../components/NavBar";
import foodList from "../data/foods.json";
import { NavLink } from "react-router-dom";

function countOrders(list: userProps[], foodName: string): number {
    return list.reduce((count, user) => {
        return (
            count + user.order.filter((food) => food.name === foodName).length
        );
    }, 0);
}

export default function UserStats() {
    const customers: string | null = sessionStorage.getItem("customers");
    const storageCustomers: userProps[] = customers
        ? JSON.parse(customers)
        : [];
    const menu = sessionStorage.getItem("menu");
    const menuToParse = menu !== null && menu !== undefined ? menu : "";
    const foodlist = menuToParse ? JSON.parse(menuToParse) : foodList.FOODS;
    const foods: foodProps[] = foodlist.map(
        (foodItem: foodProps): foodProps => foodItem
    );
    return (
        <div style={{ padding: 10 }}>
            <Flex wrap="wrap">
                <Heading
                    display="flex"
                    justifyContent="center"
                    mt={8}
                    px={10}
                    fontSize="50px"
                    fontWeight="bold"
                    textAlign="center"
                >
                    stats
                </Heading>
                <Spacer></Spacer>
                <VStack mb="10px">
                    <Button
                        as={NavLink}
                        to="/AddFood"
                        colorScheme="red"
                        size="md"
                        variant="outline"
                    >
                        Add / Remove
                    </Button>
                    <Button
                        as={NavLink}
                        to="/EditFood"
                        colorScheme="red"
                        size="md"
                        variant="outline"
                    >
                        Edit Food
                    </Button>
                </VStack>
            </Flex>
            <div>
                <NavBar></NavBar>
            </div>
            <br></br>
            <hr></hr>
            <div>
                <TableContainer>
                    <Table variant="simple">
                        <Thead>
                            <Tr>
                                <Th>Item</Th>
                                <Th>Quantity in user carts</Th>
                            </Tr>
                        </Thead>
                        <Tbody>
                            {foods.map((food: foodProps) => (
                                <Tr key={food.name}>
                                    <Td fontWeight="semibold">{food.name}</Td>
                                    <Td>
                                        {countOrders(
                                            storageCustomers,
                                            food.name
                                        )}
                                    </Td>
                                </Tr>
                            ))}
                        </Tbody>
                    </Table>
                </TableContainer>
            </div>
        </div>
    );
}