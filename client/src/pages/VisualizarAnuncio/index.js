import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

import { Container, Alert } from "reactstrap";

import { api } from "../../config";

export const VisualizarAnuncio = (props) => {
  //console.log(props.match.params.id);
  const [data, setData] = useState([]);
  const [dataImg, setDataImg] = useState();
  const [id] = useState(props.match.params.id);

  const [status, setStatus] = useState({
    type: "",
    mensagem: "",
  });

  useEffect(() => {
    const getAnuncio = async () => {
      try {
        const { data } = await axios.get(api + "/visualizar/" + id);
        setData(data.anuncio);
        setDataImg(data.endImagem);
      } catch (err) {
        setStatus({
          type: "error",
          mensagem: "Erro: Tente mais tarde!",
        });
      }
    };

    getAnuncio();
  }, [id]);

  return (
    <div>
      <Container>
        <div className="d-flex">
          <div className="mr-auto p-2">
            <h1>Visualizar o Anúncios</h1>
          </div>
          <div className="p-2">
            <Link to="/" className="btn btn-outline-info btn-sm mr-1">
              Listar
            </Link>
            <Link
              to={"/editar-anuncio/" + data.id}
              className="btn btn-outline-warning btn-sm mr-1"
            >
              Editar
            </Link>
            <Link
              to={"/editar-anuncio-img/" + data.id}
              className="btn btn-outline-warning btn-sm mr-1"
            >
              Editar Imagem
            </Link>
          </div>
        </div>

        <hr className="m-1" />

        {status.type === "error" ? (
          <Alert color="danger">{status.mensagem}</Alert>
        ) : (
          ""
        )}

        <dl className="row">
          <dt className="col-sm-3">Imagem</dt>
          <dd className="col-sm-9">
            {
              <img
                src={dataImg}
                alt="Imagem do anuncio"
                width="150"
                height="150"
              />
            }
          </dd>

          <dt className="col-sm-3">ID</dt>
          <dd className="col-sm-9">{data.id}</dd>

          <dt className="col-sm-3">Título</dt>
          <dd className="col-sm-9">{data.titulo}</dd>

          <dt className="col-sm-3">Descrição</dt>
          <dd className="col-sm-9">{data.descricao}</dd>
        </dl>
      </Container>
    </div>
  );
};
