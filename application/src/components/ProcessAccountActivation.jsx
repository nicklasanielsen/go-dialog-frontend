import { useCallback } from "react";
import { useEffect } from "react";
import { useState } from "react";
import { useParams } from "react-router-dom";
import { Dimmer, Loader } from "semantic-ui-react";
import facade from "../Facade";

export default function ProcessAccountActivation() {
  let { userID, activationCode } = useParams();

  const [status, setStatus] = useState(
    <Dimmer active inverted>
      <Loader size="massive">Aktiverer konto, vent venligst..</Loader>
    </Dimmer>
  );

  const activateAccount = useCallback(() => {
    facade
      .accountActivation(userID, activationCode)
      .then((response) => {
        setStatus(response.message);
      })
      .catch((err) => {
        if (err.status) {
          err.fullError.then((e) => {
            setStatus(e.message);
            return;
          });

          setStatus("Der opstod en uventet fejl. Prøv igen senere.");
        }
      });
  }, [setStatus, userID, activationCode]);

  useEffect(() => {
    activateAccount();
  }, [activateAccount]);

  return <>{status}</>;
}
