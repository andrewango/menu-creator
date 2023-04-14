/* eslint-disable indent */
import React, { useState } from "react";
import { Col, Form } from "react-bootstrap";
import { foodProps } from "../interfaces/Food";
import foodList from "../data/foods.json";

export function SearchBar(): JSX.Element {
    const foods: foodProps[] = foodList.FOODS;
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
                        updateName(e as React.ChangeEvent<HTMLInputElement>);
                        setListHelper(e.target.value);
                    }}
                />
            </Form.Group>
            <div>
                <Col>
                    {list.map((x: foodProps) => (
                        <li key={x.name}>{x.name}</li>
                    ))}
                </Col>
            </div>
        </div>
    );
}