import { parseResponseError } from "../utils/parseResponseError";
import { Request } from "./base";

export const getPhoneBook = () => {
  const request = new Request("/api/v1/phoneBook");

  return new Promise((resolve, reject) => {
    request
      .get()
      .then((res) => {
        resolve(res);
      })
      .catch((e) => {
        reject(parseResponseError(e));
      });
  });
};
export const savePhoneBook = (phoneBook) => {
  const request = new Request("/api/v1/phoneBook");

  return new Promise((resolve, reject) => {
    request
      .post(phoneBook)
      .then((res) => {
        resolve(res);
      })
      .catch((e) => {
        reject(parseResponseError(e));
      });
  });
};


export const updatePhoneBook = (id,phoneBook) => {
  const request = new Request("/api/v1/phoneBook");

  return new Promise((resolve, reject) => {
    request
      .put(phoneBook,id)
      .then((res) => {
        resolve(res);
      })
      .catch((e) => {
        reject(parseResponseError(e));
      });
  });
};


export const deletePhoneBook = (id) => {
  const request = new Request("/api/v1/phoneBook");

  return new Promise((resolve, reject) => {
    request
      .delete(id)
      .then((res) => {
        resolve(res);
      })
      .catch((e) => {
        reject(parseResponseError(e));
      });
  });
};
