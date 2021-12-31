import { useCallback } from "react";
import { useEffect } from "react";
import { useState } from "react";
import { Modal, Spinner, Table } from "react-bootstrap";
import { Icon } from "semantic-ui-react";
import facade from "../Facade";

export default function EditManager({ user, recaptchaRef }) {
  const [employees, setEmployees] = useState(<Spinner animation="border" />);

  const removeManager = (employee) => {
    recaptchaRef.current.executeAsync().then((recaptcha) => {
      facade
        .removeManager(user, employee, recaptcha)
        .then(() => {
          getEmployees();
        })
        .catch((err) => {
          if (err.status) {
            err.fullError.then((e) => {
              console.log(e.message);
            });

            return;
          }

          console.log(err);
        })
        .then(() => {
          recaptchaRef.current.reset();
        });
    });
  };

  const getEmployees = useCallback(() => {
    facade
      .getEmployeesByManager(user)
      .then((response) => {
        setEmployees(
          <Table borderless striped hover>
            <thead>
              <tr>
                <th>Navn</th>
                <th>Handlinger</th>
              </tr>
            </thead>
            <tbody>
              {response.map((data) => {
                return (
                  <tr key={data.id}>
                    <td key="name">{data.person.fullname}</td>
                    <td key="action" align="center">
                      <Icon
                        bordered
                        name="user delete"
                        onClick={() => {
                          removeManager(data.id);
                        }}
                      />
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </Table>
        );
      })
      .catch((err) => {
        if (err.status) {
          err.fullError.then((e) => {
            setEmployees(e.message);
          });

          return;
        }

        setEmployees("Der opstod en uventet fejl, prøv igen om lidt");
      });
  }, [setEmployees]);

  useEffect(() => {
    getEmployees({ user });
  }, [getEmployees]);

  return (
    <>
      <Modal.Header></Modal.Header>
      <Modal.Body>
        <Modal.Title>Håndtering Af Leders Medarbejdere</Modal.Title>
        {employees}
      </Modal.Body>
      <Modal.Footer></Modal.Footer>
    </>
  );
}
