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

export const EditarAnuncioImg = (props) => {
  const [id] = useState(props.match.params.id);
  const [imagem, setImagem] = useState("");
  const [endImagem, setEndImagem] = useState("");
  const [status, setStatus] = useState({
    formSave: false,
    type: "",
    mensagem: "",
  });

  const editarAnuncioImg = async (e) => {
    e.preventDefault();

    setStatus({ formSave: true });

    const formData = new FormData();
    formData.append("imagem", imagem);

    const headers = {
      "Content-Type": "application/json",
    };

    try {
      const { data } = await axios.put(
        api + "/editar-anuncio-img/" + id,
        formData,
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
        mensagem: "Erro: Imagem do anúncio não editado com sucesso!",
      });
    }
  };

  useEffect(() => {
    const getAnuncio = async () => {
      await axios
        .get(api + "/visualizar/" + id)
        .then((response) => {
          setEndImagem(response.data.endImagem);
        })
        .catch((err) => {
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
            <h1>Editar Imagem Destroy Anúncios</h1>
          </div>

          <div className="p-2">
            <Link to="/" className="btn btn-outline-info mr-1">
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

        <Form onSubmit={editarAnuncioImg}>
          <FormGroup>
            <Label>Imagem</Label>
            <Input
              type="file"
              name="imagem"
              onChange={(e) => setImagem(e.target.files[0])}
            />
          </FormGroup>

          <FormGroup>
            {imagem ? (
              <img
                src={URL.createObjectURL(imagem)}
                alt="Imagem do anúncio"
                width="150"
                height="150"
              />
            ) : (
              <img
                src={endImagem}
                alt="Imagem do anúncio"
                width="150"
                height="150"

              />
            )}
          </FormGroup>

          {status.formSave ? (
            <Button type="submit" outline color="warning" disabled>
              Salvando... <Spinner color="warning" size="sm" />
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
