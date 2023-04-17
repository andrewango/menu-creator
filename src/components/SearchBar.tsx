/* eslint-disable indent */
import React, { useState } from "react";
import { Form } from "react-bootstrap";
import { foodProps } from "../interfaces/Food";
import foodList from "../data/foods.json";
import ItemListUI from "./ItemListUI";

export function SearchBar(): JSX.Element {
    const temp = sessionStorage.getItem("menu");
    const foodlist =
        temp === null || temp === undefined ? foodList.FOODS : JSON.parse(temp);
    const [foods, setFoods] = useState<foodProps[]>(foodlist);

    function updateName(event: React.ChangeEvent<HTMLInputElement>) {
        setName(event.target.value);
    }
    function setListHelper(text: string) {
        text === ""
            ? setList(foods)
            : setList(
                  foods.filter(
                      (x: foodProps): boolean =>
                          x.name.includes(text) ||
                          x.desc.includes(text) ||
                          x.ingredients.includes(text) ||
                          x.type.includes(text)
                  )
              );
    }
    const [text, setName] = useState<string>("");
    const [list, setList] = useState<foodProps[]>(foods);
    return (
        <div>
            <Form.Group controlId="formCorrectAnswer">
                <Form.Label>Search for Food</Form.Label>
                <Form.Control
                    value={text}
                    onChange={(e) => {
                        const menu = sessionStorage.getItem("menu");
                        const menuToParse =
                            menu !== null && menu !== undefined ? menu : "";
                        setFoods(JSON.parse(menuToParse));
                        updateName(e as React.ChangeEvent<HTMLInputElement>);
                        setListHelper(e.target.value);
                    }}
                />
            </Form.Group>
            <div>
                <ItemListUI foodData={list}></ItemListUI>
            </div>
        </div>
    );
}
