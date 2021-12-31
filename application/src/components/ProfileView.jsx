import { useCallback, useEffect, useState } from "react";
import { Modal, Spinner, Table } from "react-bootstrap";
import facade from "../Facade";

export default function ProfileView({ user }) {
  const init = {
    firstname: <Spinner animation="border" />,
    middlename: <Spinner animation="border" />,
    lastname: <Spinner animation="border" />,
    email: <Spinner animation="border" />,
  };
  const [profileDetails, setProfileDetails] = useState(init);
  const [upcoming, setUpcoming] = useState(<Spinner animation="border" />);
  const [previous, setPrevious] = useState(<Spinner animation="border" />);

  const getProfileDetails = useCallback(() => {
    facade
      .getProfileDetails(user)
      .then((response) => {
        setProfileDetails({
          firstname: response.person.firstname,
          middlename: response.person.middlename,
          lastname: response.person.lastname,
          email: response.email,
        });
      })
      .catch((err) => {
        if (err.status) {
          err.fullError.then((e) => {
            setProfileDetails({
              firstname: e.message,
              middlename: e.message,
              lastname: e.message,
              email: e.message,
            });
          });

          return;
        }

        setProfileDetails({
          firstname: "Kunne ikke indlæses",
          middlename: "Kunne ikke indlæses",
          lastname: "Kunne ikke indlæses",
          email: "Kunne ikke indlæses",
        });
      });
  }, [setProfileDetails]);

  const getUpcoming = useCallback(() => {
    facade
      .getUpcomingInterviewsByUser(user)
      .then((response) => {
        setUpcoming(
          <Table striped bordered hover>
            <thead>
              <tr>
                <th>Dato</th>
                <th>type</th>
                <th>Ledere</th>
                <th>Medarbejdere</th>
              </tr>
            </thead>
            <tbody>
              {response.map((data) => {
                return (
                  <tr key={data.id}>
                    <td key="held">{data.held}</td>
                    <td key="type">{data.interview_template.name}</td>
                    <td key="managers">
                      {data.managers.map((manager) => {
                        return manager.person.fullname;
                      })}
                    </td>
                    <td key="employees">
                      {data.employees.map((employee) => {
                        return employee.person.fullname;
                      })}
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
            setUpcoming(e.message);
            return;
          });

          setUpcoming("Kunne ikke indlæses");
        }
      });
  }, [setUpcoming]);

  const getPrevious = useCallback(() => {
    facade
      .getPreviousInterviewsByUser(user)
      .then((response) => {
        setPrevious(
          <Table striped bordered hover>
            <thead>
              <tr>
                <th>Dato</th>
                <th>Type</th>
                <th>Ledere</th>
                <th>Medarbejdere</th>
              </tr>
            </thead>
            <tbody>
              {response.map((data) => {
                return (
                  <tr key={data.id}>
                    <td key="held">{data.held}</td>
                    <td key="type">{data.interview_template.name}</td>
                    <td key="managers">
                      {data.managers.map((manager) => {
                        return manager.person.fullname + ", ";
                      })}
                    </td>
                    <td key="employees">
                      {data.employees.map((employee) => {
                        return employee.person.fullname + ", ";
                      })}
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
            setPrevious(e.message);
            return;
          });

          setPrevious("Kunne ikke indlæses");
        }
      });
  }, [setPrevious]);

  useEffect(() => {
    getProfileDetails({ user });
    getUpcoming({ user });
    getPrevious({ user });
  }, [getProfileDetails, getUpcoming, getPrevious]);

  return (
    <>
      <Modal.Header></Modal.Header>
      <Modal.Body>
        <Modal.Title>Profil Oplysninger</Modal.Title>
        <Table borderless striped hover>
          <tbody>
            <tr>
              <td>Fornavn(e):</td>
              <td>{profileDetails.firstname}</td>
            </tr>
            <tr>
              <td>Mellemnavn(e):</td>
              <td>{profileDetails.middlename}</td>
            </tr>
            <tr>
              <td>Efternavn(e):</td>
              <td>{profileDetails.lastname}</td>
            </tr>
            <tr>
              <td>E-mail:</td>
              <td>{profileDetails.email}</td>
            </tr>
          </tbody>
        </Table>
        <Modal.Title>Kommende Samtaler</Modal.Title>
        {upcoming}
        <Modal.Title>Tidligere Samtaler</Modal.Title>
        {previous}
      </Modal.Body>
      <Modal.Footer />
    </>
  );
}
