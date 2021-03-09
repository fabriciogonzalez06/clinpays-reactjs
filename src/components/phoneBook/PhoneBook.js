import React, { useContext, useEffect } from "react";
import { Form, Button, Row, Col, Alert, Spinner } from "react-bootstrap";

import {  toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import { savePhoneBook, updatePhoneBook } from "./../../api/phoneBookApi";
import { PhoneBookContext } from "../../context/phoneBook/PhoneBookContext";
import {
  types,
  initialState as initialStatePhoneBook,
} from "../../context/phoneBook/PhoneBookReducer";
import { UseForm } from "../../hooks/useForm";
import { configNotify } from "../../utils/configNotify";


export const PhoneBook = () => {
  const { dispatch, messageError, loading, selectedPhoneBook } = useContext(
    PhoneBookContext
  );
  const [values, handleInputChange, reset, setNewState] = UseForm({
    firstName: "",
    lastName: "",
    phone: "",
  });

  const { firstName, lastName, phone } = values;

  useEffect(() => {
    if (JSON.stringify(values) !== JSON.stringify(selectedPhoneBook)) {
      setNewState(selectedPhoneBook);
      dispatch({ type: types.resetMessageError });
    }
  }, [selectedPhoneBook]);

  const handleAddNewPhoneBook = (e) => {
    e.preventDefault();

    //validacion rapida
    if (!firstName || firstName === "") {
      dispatch({
        type: types.setMessageError,
        payload: "firstname is required",
      });

      return;
    } else if (!lastName || lastName === "") {
      dispatch({
        type: types.setMessageError,
        payload: "lastname is required",
      });

      return;
    } else if (!phone || phone === "") {
      dispatch({
        type: types.setMessageError,
        payload: "phone number  is required",
      });

      return;
    }
    const newRecord = {
      type: types.addPhoneBook,
      payload: {
        firstName,
        lastName,
        phone,
      },
    };
    dispatch({ type: types.startLoading });
    savePhoneBook(newRecord.payload)
      .then((res) => {
        dispatch({ type: types.finishLoading });
        dispatch({ type: types.addPhoneBook, payload: res.data });
        toast("Created successfully", {...configNotify});
        reset();
      })
      .catch((e) => {
        dispatch({ type: types.finishLoading });
        dispatch({ type: types.setMessageError, payload: e.message });
      });
  };

  const handleUpdatePhoneBook = () => {
    dispatch({ type: types.startLoading });

    updatePhoneBook(selectedPhoneBook._id, { ...values })
      .then((res) => {
        dispatch({
          type: types.setSelectedPhoneBook,
          payload: { ...initialStatePhoneBook.selectedPhoneBook },
        });

        dispatch({ type: types.finishLoading });
        dispatch({ type: types.updatePhoneBook, payload: { ...res.data } });
        toast("Updated successfully", {...configNotify});

      })
      .catch((e) => {
        dispatch({ type: types.finishLoading });
        dispatch({ type: types.setMessageError, payload: e.message });
      });
  };

  const handleReset = () => {
    dispatch({
      type: types.setSelectedPhoneBook,
      payload: { ...initialStatePhoneBook.selectedPhoneBook },
    });
    dispatch({ type: types.resetMessageError });
  };

  return (
    <Form>
      {messageError && (
        <Alert className="text-center" variant="warning">
          <p> {messageError} </p>
        </Alert>
      )}
      <Row className="center">
        <Col md={6} xs={12} lg={4}>
          <Form.Group controlId="firstName">
            <Form.Label>First Name </Form.Label>
            <Form.Control
              maxLength="30"
              name="firstName"
              onChange={handleInputChange}
              value={firstName}
              type="text"
              placeholder="Enter first name"
            />
          </Form.Group>

          <Form.Group controlId="lastName">
            <Form.Label>Last name</Form.Label>
            <Form.Control
              maxLength="30"
              type="text"
              name="lastName"
              onChange={handleInputChange}
              value={lastName}
              placeholder="Enter last name"
            />
          </Form.Group>

          <Form.Group>
            <Form.Label>Phone</Form.Label>
            <Form.Control
              maxLength="12"
              type="text"
              name="phone"
              onChange={handleInputChange}
              value={phone}
              placeholder="Enter your Phone number"
            />
          </Form.Group>

          <div
            className="col-xs-12 "
            style={{
              display: "flex",
              width: "100%",
              flexDirection: "row-reverse",
            }}
          >
            <Button
              hidden={loading}
              className="show-block"
              variant="primary"
              type="button"
              onClick={
                selectedPhoneBook._id === ""
                  ? handleAddNewPhoneBook
                  : handleUpdatePhoneBook
              }
            >
              <i className="far fa-save"></i>{" "}
              {selectedPhoneBook._id === "" ? "Save" : "Update"}
            </Button>
            <Button
              onClick={handleReset}
              hidden={selectedPhoneBook._id === "" && true}
              className="mr-2 show-block"
            >
              {" "}
              <i className="fal fa-eraser"></i> reset{" "}
            </Button>
          </div>

          <div
            style={{
              display: "flex",
              width: "100%",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <Spinner hidden={!loading} animation="border" variant="primary" />
          </div>
        </Col>
      </Row>
    </Form>
  );
};

export default PhoneBook;
