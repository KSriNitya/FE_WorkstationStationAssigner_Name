import React from "react";
import { ReactDOM } from "react";
import {render,screen} from "@testing-library/react";
import Homepage from "./HomePage";
import { BrowserRouter } from "react-router-dom";
describe("homepage buttons",()=>{
    it("should display create booking button",()=>{
        const {getByTestId}=render(<BrowserRouter><Homepage /></BrowserRouter>)
        const button=getByTestId("workstationbooking")
        expect(button).toBeTruthy()
    //     render(<BrowserRouter><Homepage/></BrowserRouter>);
    //     const wElement=screen.getByText("Workstation Assigner");
    //    expect(wElement).toBeInTheDocument();
    }) ;
    // it("should display Login message",()=>{
    //     const {getByTitle}=  render(<BrowserRouter><Login/></BrowserRouter>);
    //     const loginElement=screen.getByText("LOGIN");
    //    expect(loginElement).toBeInTheDocument();
    // }) ;
});