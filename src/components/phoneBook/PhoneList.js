import React, { useContext, useEffect } from "react";
import { Table, Button, Alert } from "react-bootstrap";
import { PhoneBookContext } from "../../context/phoneBook/PhoneBookContext";
import { types } from "../../context/phoneBook/PhoneBookReducer";

import {  toast } from "react-toastify";

import {
  getPhoneBook,
  deletePhoneBook
} from "./../../api/phoneBookApi";
import { configNotify } from "../../utils/configNotify";

export const PhoneList = () => {
  const { phoneBooks, dispatch } = useContext(PhoneBookContext);

  useEffect(() => {
    dispatch({ type: types.startLoading });

    getPhoneBook()
      .then((res) => {
        //falta optimizar
        dispatch({ type: types.finishLoading });
        dispatch({ type: types.setPhoneBooks, payload: res.data });
      })
      .catch((e) => {
        dispatch({ type: types.finishLoading });
        dispatch({ type: types.setMessageError, payload: e.message });
      });
  }, []);

  const handleDeletePhoneBook = (id) => {
    dispatch({ type: types.startLoading });

    deletePhoneBook(id)
      .then((res) => {
        dispatch({ type: types.finishLoading });
        dispatch({ type: types.deletePhoneBook, payload: id });
        toast("deleted successfully", {...configNotify});
        
      })
      .catch((e) => {
        dispatch({ type: types.finishLoading });
        dispatch({ type: types.setMessageError, payload: e.message });
      });
  };

  const handleUpdatePhoneBook = (phoneBook) => {
    dispatch({ type: types.setSelectedPhoneBook, payload: { ...phoneBook } });
    window.scrollTo(0,0);
  };

  return (
    <>
      {phoneBooks.length === 0 && (
        <Alert
          className="mt-5 text-center animate__animated animate__bounce "
          variant="info"
        >
          add a record
        </Alert>
      )}

      <Table
        className="animate__animated animate__bounce"
        hidden={phoneBooks.length === 0}
        responsive
        className="mt-5"
      >
        <thead>
          <tr>
            <th>First name</th>
            <th>Last name</th>
            <th>Phone number</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {phoneBooks.map((p, i) => (
            <tr key={i}>
              <td> {p.firstName} </td>
              <td> {p.lastName} </td>
              <td> {p.phone} </td>
              <td>
                <Button
                  variant="warning"
                  className="mr-2"
                  onClick={() => {
                    handleUpdatePhoneBook(p);
                  }}
                >
                  <i className="far fa-edit"></i>{" "}
                </Button>
                <Button
                  onClick={() => handleDeletePhoneBook(p._id)}
                  variant="danger"
                >
                  <i className="far fa-trash"></i>{" "}
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
    </>
  );
};

export default PhoneList;
