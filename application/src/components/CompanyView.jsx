import { useEffect } from "react";
import { useCallback, useState } from "react";
import { Modal, Spinner, Table } from "react-bootstrap";
import facade from "../Facade";

export default function CompanyView({ company }) {
  const init = {
    name: <Spinner animation="border" />,
    cvr: <Spinner animation="border" />,
    status: <Spinner animation="border" />,
  };
  const [companyDetails, setCompanyDetails] = useState(init);

  const getCompanyDetails = useCallback(() => {
    facade
      .getCompanyById(company)
      .then((response) => {
        setCompanyDetails({
          name: response.name,
          cvr: response.cvr,
        });
      })
      .catch((err) => {
        if (err.status) {
          err.fullError.then((e) => {
            setCompanyDetails({
              name: e.message,
              cvr: e.message,
              status: e.message,
            });

            return;
          });

          setCompanyDetails({
            name: "Der er opstået en uventet fejl, prøv igen senere",
            cvr: "Der er opstået en uventet fejl, prøv igen senere",
            status: "Der er opstået en uventet fejl, prøv igen senere",
          });
        }
      });
  }, [setCompanyDetails]);

  useEffect(() => {
    getCompanyDetails();
  }, [getCompanyDetails]);

  return (
    <>
      <Modal.Header></Modal.Header>
      <Modal.Body>
        <Modal.Title>Virksomhedsoplysninger</Modal.Title>
        <Table borderless striped hover>
          <tbody>
            <tr>
              <td>Navn:</td>
              <td>{companyDetails.name}</td>
            </tr>
            <tr>
              <td>CVR:</td>
              <td>{companyDetails.cvr}</td>
            </tr>
            <tr>
              <td>Status:</td>
              <td>{companyDetails.status}</td>
            </tr>
          </tbody>
        </Table>
      </Modal.Body>
      <Modal.Footer></Modal.Footer>
    </>
  );
}
