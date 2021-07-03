import React, { useEffect, useState } from "react";
import { api } from "../../config";
import { Link } from "react-router-dom";
import { Container, Table, Alert } from "reactstrap";
import axios from "axios";

export const Home = () => {
  const [data, setData] = useState([]);
  const [status, setStatus] = useState({
    formSave: false,
    type: "",
    mensagem: "",
  });

  const getAnuncios = async () => {
    await axios
      .get(api)
      .then((response) => {
        setData(response.data.anuncios);
      })
      .catch((err) => {
        setStatus({
          type: "error",
          mensagem: "Erro: Tente mais tarde!",
        });
      });
  };

  useEffect(() => {
    getAnuncios();
  }, []);

  const apagarAnuncio = async (idAnuncio) => {
    console.log(idAnuncio);

    setStatus({ formSave: true });

    const headers = {
      "Content-Type": "application/json",
    };
    await axios
      .delete(api + "/apagar/" + idAnuncio, { headers })
      .then((response) => {
        if (response.data.error) {
          setStatus({
            formSave: false,
            type: "error",
            mensagem: response.data.message,
          });
        } else {
          setStatus({
            formSave: false,
            type: "success",
            mensagem: response.data.message,
          });
        }
        getAnuncios();
      })
      .catch((err) => {
        setStatus({
          formSave: false,
          type: "error",
          mensagem: "Erro: Tente mais tarde!",
        });
      });
  };

  return (
    <div>
      <Container>
        <div className="d-flex">
          <div className="mr-auto p-2">
            <h1>Anúncios</h1>
          </div>
          <div className="p-2">
            <Link
              to="/cadastrar-anuncio"
              className="btn btn-outline-success btn-sm"
            >
              Cadastrar
            </Link>
          </div>
        </div>

        {status.type === "error" ? (
          <Alert color="danger">{status.mensagem}</Alert>
        ) : (
          ""
        )}
        {status.type === "success" ? (
          <Alert color="success">{status.mensagem}</Alert>
        ) : (
          ""
        )}

        <Table striped hover>
          <thead>
            <tr>
              <th>ID</th>
              <th>Título</th>
              <th className="text-center">Ações</th>
            </tr>
          </thead>

          <tbody>
            {data.map((item) => {
              return (
                <tr key={item.id}>
                  <td>{item.id}</td>
                  <td>{item.titulo}</td>
                  <td className="text-center">
                    <Link
                      to={"/visualizar-anuncio/" + item.id}
                      className="btn btn-outline-primary btn-sm mr-1"
                    >
                      Visualizar
                    </Link>

                    <Link
                      to={"/editar-anuncio/" + item.id}
                      className="btn btn-outline-warning btn-sm mr-1"
                    >
                      Editar
                    </Link>
                    <span
                      className="btn btn-outline-danger btn-sm mr-1"
                      onClick={() => apagarAnuncio(item.id)}
                    >
                      Apagar
                    </span>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </Table>
      </Container>
    </div>
  );
};
