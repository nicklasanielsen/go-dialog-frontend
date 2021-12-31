import { useEffect } from "react";
import { useCallback, useState } from "react";
import { Modal, Spinner, Table } from "react-bootstrap";
import { Icon } from "semantic-ui-react";
import facade from "../Facade";

export default function EditEmployee({ user }) {
  const currentManagers = [];
  const [managers, setManagers] = useState(<Spinner animation="border" />);

  const addManager = (manager) => {
    facade.addManager(manager, user).then(() => {
      currentManagers.push(manager);
      getManagers();
    });
  };

  const getManagers = () => {
    facade.getManagersByCompany().then((response) => {
      setManagers(
        <Table borderless striped hover>
          <thead>
            <tr>
              <th>Navn</th>
              <th>Handling</th>
            </tr>
          </thead>
          <tbody>
            {response.map((manager) => {
              if (currentManagers.includes(manager.id)) {
                return;
              }

              return (
                <tr key={manager.id}>
                  <td key="name">{manager.person.fullname}</td>
                  <td key="action" align="center">
                    <Icon
                      bordered
                      name="add user"
                      onClick={() => {
                        addManager(manager.id);
                      }}
                    />
                  </td>
                </tr>
              );
            })}
          </tbody>
        </Table>
      );
    });
  };

  const getCurrentManagers = useCallback(() => {
    facade
      .getManagersByUser(user)
      .then((response) => {
        response.map((manager) => {
          currentManagers.push(manager.id);
        });
      })
      .then(() => {
        console.log(currentManagers);
        getManagers();
      })
      .catch((err) => {
        if (err.status) {
          err.fullError.then((e) => {
            setManagers(e.message);
          });

          return;
        }

        setManagers("Der opstod en uventet fejl, prøv igen om lidt");
      });
  }, []);

  useEffect(() => {
    getCurrentManagers();
  }, [getCurrentManagers]);

  return (
    <>
      <Modal.Header>
        <Modal.Title>Tildel Leder</Modal.Title>
      </Modal.Header>
      <Modal.Body>{managers}</Modal.Body>
      <Modal.Footer></Modal.Footer>
    </>
  );
}
