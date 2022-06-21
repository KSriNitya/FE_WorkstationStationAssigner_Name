import React from "react";
import { ReactDOM } from "react";
import {render,screen} from "@testing-library/react";
import Login from "./Loginpage"
import { BrowserRouter } from "react-router-dom";
describe("loginpage",()=>{
    it("should display Workstation Assigner message",()=>{
        render(<BrowserRouter><Login/></BrowserRouter>);
        const wElement=screen.getByText("Workstation Assigner");
       expect(wElement).toBeInTheDocument();
    }) ;
    it("should display Login message",()=>{
        const {getByTitle}=  render(<BrowserRouter><Login/></BrowserRouter>);
        const loginElement=screen.getByText("LOGIN");
       expect(loginElement).toBeInTheDocument();
    }) ;
});