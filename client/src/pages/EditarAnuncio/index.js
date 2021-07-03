import React, { useEffect, useState } from "react";
import { api } from "../../config";
import { Link } from "react-router-dom";
import {
  Container,
  Form,
  FormGroup,
  Label,
  Input,
  Alert,
  Button,
  Spinner,
} from "reactstrap";
import axios from "axios";

export const EditarAnuncio = (props) => {
  const [id] = useState(props.match.params.id);
  const [titulo, setTitulo] = useState("");
  const [descricao, setDescricao] = useState("");
  const [status, setStatus] = useState({
    formSave: false,
    type: "",
    mensagem: "",
  });

  const editAnuncio = async (e) => {
    e.preventDefault();

    setStatus({ formSave: true });

    const headers = {
      "Content-Type": "application/json",
    };
    try {
      const { data } = await axios.put(
        api + "/editar",
        { id, titulo, descricao },
        { headers }
      );
      if (data.error) {
        setStatus({
          formSave: false,
          type: "error",
          mensagem: data.message,
        });
      } else {
        setStatus({
          formSave: false,
          type: "success",
          mensagem: data.message,
        });
      }
    } catch (err) {
      setStatus({
        formSave: false,
        type: "error",
        mensagem: "Error: Tente mais tarde!",
      });
    }
  };

  useEffect(() => {
    const getAnuncio = async () => {
      await axios
        .get(api + "/visualizar/" + id)
        .then((response) => {
          //console.log(response.data.anuncio);
          setTitulo(response.data.anuncio.titulo);
          setDescricao(response.data.anuncio.descricao);
        })
        .catch(() => {
          setStatus({
            type: "error",
            mensagem: "Erro: Tente mais tarde!",
          });
        });
    };

    getAnuncio();
  }, [id]);

  return (
    <div>
      <Container>
        <div className="d-flex">
          <div className="mr-auto p-2">
            <h1>Editar Anúncios</h1>
          </div>

          <div className="p-2">
            <Link to={"/"} className="btn btn-outline-info btn-sm mr-1">
              Listar
            </Link>
            <Link
              to={"/visualizar-anuncio/" + id}
              className="btn btn-outline-primary btn-sm"
            >
              Visualizar
            </Link>
          </div>
        </div>

        <hr className="m-1" />

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

        <Form onSubmit={editAnuncio}>
          <FormGroup>
            <Label>Título</Label>
            <Input
              autoFocus
              type="text"
              name="titulo"
              placeholder="Título do anúncio"
              value={titulo}
              onChange={(e) => setTitulo(e.target.value)}
            />
          </FormGroup>

          <FormGroup>
            <Label>Descrição</Label>
            <Input
              type="text"
              name="descricao"
              placeholder="Descrição do anúncio"
              value={descricao}
              onChange={(e) => setDescricao(e.target.value)}
            />
          </FormGroup>

          {status.formSave ? (
            <Button type="submit" outline color="warning" disabled>
              Salvando...
              <Spinner size="sm" color="warning" />
            </Button>
          ) : (
            <Button type="submit" outline color="warning">
              Salvar
            </Button>
          )}
        </Form>
      </Container>
    </div>
  );
};
