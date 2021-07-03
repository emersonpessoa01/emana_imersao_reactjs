import React, { useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

import {
  Container,
  Alert,
  Form,
  FormGroup,
  Label,
  Input,
  Button,
  Spinner,
} from "reactstrap";

import { api } from "../../config";

export const CadastrarAnuncio = () => {
  const [anuncio, setAnuncio] = useState({
    titulo: "",
    descricao: "",
  });

  const [status, setStatus] = useState({
    formSave: false,
    type: "",
    mensagem: "",
  });

  const valorInput = (e) => {
    const { name, value } = e.target;
    // setAnuncio({ ...anuncio, [e.target.name]: e.target.value });
    setAnuncio({
      ...anuncio,
      [name]: value,
    });
  };

  const cadAnuncio = async (e) => {
    e.preventDefault();
    //console.log(anuncio);

    setStatus({ formSave: true });

    const headers = {
      "Content-Type": "application/json",
    };

    try {
      const { data } = await axios.post(api + "/cadastrar", anuncio, {
        headers,
      });
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
        mensagem: "Erro: Tente mais tarde!",
      });
    }
  };

  return (
    <div>
      <Container>
        <div className="d-flex">
          <div className="mr-auto p-2">
            <h1>Cadastrar o Anúncios</h1>
          </div>
          <div className="p-2">
            <Link to="/" className="btn btn-outline-info btn-sm">
              Listar
            </Link>
          </div>
        </div>

        <hr className="m-1" />

        {status.type === "error" ? (
          <span>
            <Alert color="danger">{status.mensagem}</Alert>
          </span>
        ) : (
          ""
        )}
        {status.type === "success" ? (
          <Alert color="success">{status.mensagem}</Alert>
        ) : (
          ""
        )}

        <Form onSubmit={cadAnuncio}>
          <FormGroup>
            <Label>Título</Label>
            <Input
              autoFocus
              type="text"
              name="titulo"
              placeholder="Título do anúncio"
              onChange={valorInput}
            />
          </FormGroup>

          <FormGroup>
            <Label>Descrição</Label>
            <Input
              type="text"
              name="descricao"
              placeholder="Descrição do anúncio"
              onChange={valorInput}
            />
          </FormGroup>

          {/*<Button type="submit" outline color="success">Cadastrar</Button>*/}

          {status.formSave ? (
            <Button type="submit" outline color="success" disabled>
              Salvando... <Spinner size="sm" color="success" />
            </Button>
          ) : (
            <Button type="submit" outline color="success">
              Cadastrar
            </Button>
          )}
        </Form>
      </Container>
    </div>
  );
};
