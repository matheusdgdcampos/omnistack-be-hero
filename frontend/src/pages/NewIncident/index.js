import React, { useState } from "react";
import { Link, useHistory } from "react-router-dom";
import LogoImg from "../../assets/logo.svg";
import { FiArrowLeft } from "react-icons/fi";

import Swal from "sweetalert2";

import api from "../../services/api";

import "./styles.css";

export default function NewIncident() {
  /**
   * Definindo estado de cada propriedade que será passado
   * na requisição.
   */
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [value, setValue] = useState("");

  const history = useHistory();

  const ongId = localStorage.getItem("ongId");

  async function handleNewIncident(e) {
    e.preventDefault(); //impede que a página carregue por completo a cada requisição.
    /**
     * Aqui é uma função do React para cadastrar um novo caso
     * para ser apoiado.
     */
    const data = {
      title,
      description,
      value,
    };

    try {
      await api.post("incidents", data, {
        headers: {
          Authorization: ongId, //Pegando o ID por parâmetro da ong cadastrada.
        },
      });

      Swal.fire({
        title: "Sucesso!",
        text: "Caso registrado com sucesso!",
        icon: "success",
        buttons: "Ok",
      }).then((resolve) => {
        if (resolve.value) history.push("/profile"); //Redirecionamento de rotas.
      });
    } catch (err) {
      Swal.fire({
        title: "Erro!",
        text: "Erro ao cadastrar o caso, tente novamente.",
        icon: "error",
      });
    }
  }

  return (
    <div className="new-incident-container">
      <div className="content">
        <section>
          <img src={LogoImg} alt="Be The Hero" />

          <h1>Cadastrar novo caso</h1>
          <p>
            Descreva o caso detalhadamente para encontrar um heroi para resolver
            isso.
          </p>

          <Link className="back-link" to="/profile">
            <FiArrowLeft size={16} color="#E02041" />
            Voltar para home
          </Link>
        </section>

        <form onSubmit={handleNewIncident}>
          <input
            placeholder="Título do caso"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
          <textarea
            placeholder="Descrição"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
          <input
            placeholder="Valor em reais"
            value={value}
            onChange={(e) => setValue(e.target.value)}
          />

          <button className="button" type="submit">
            Cadastrar
          </button>
        </form>
      </div>
    </div>
  );
}
