import React, { useReducer } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { Container } from "react-bootstrap";
import { ToastContainer, toast } from "react-toastify";



import { PhoneBookContext } from "./context/phoneBook/PhoneBookContext";
import {
  PhoneBookReducer,
  initialState as initialStatePhoneBooks,
} from "./context/phoneBook/PhoneBookReducer";

import "./style.css";

import Navbar from "./components/shared/Navbar";
import PhoneBook from "./components/phoneBook/PhoneBook";
import PhoneList from "./components/phoneBook/PhoneList";

export default function App() {
  const [phoneBookState, dispatch] = useReducer(
    PhoneBookReducer,
    initialStatePhoneBooks
  );



      return (
        <div>
          <PhoneBookContext.Provider value={{...phoneBookState,dispatch}} >
            <Navbar />
            <Container  >
              <PhoneBook />
              <PhoneList />
            </Container>
          </PhoneBookContext.Provider>
          <ToastContainer  toastClassName="Toastify__toast--info" />

        </div>
      );
  
}
