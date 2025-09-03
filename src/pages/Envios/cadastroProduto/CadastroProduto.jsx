import React, { useRef } from "react";
import s from "./Cadastro.module.css";
import axios from "axios";

export function CadastroProduto(){

    const nome = useRef();
    const preco = useRef();
    const descricao = useRef();
    const imagem = useRef();

    function body (){

    return{
        nome: nome.current.value,
        preco: preco.current.value,
        descricao: descricao.current.value,
        imagem: imagem.current.value
    }
};

async function handleSubmit(e){
    e.preventDefault();

    let post = await requisitar(body());

    if(post){
        nome.current.value = "";
        preco.current.value = "";
        descricao.current.value = "";
        imagem.current.value = "";
        alert("produto cadastrado com sucesso!");
    }else{
        alert("não foi possível cadastrar seu produto");
    }
}

    return (
    <section className={s.form}>
        <h1>Cadastro do produto</h1>
    <form onSubmit={handleSubmit}>

        <div className={s.nomePreco}>
            
        <div>
            <label htmlFor="nome">Nome do produto:</label>
            <input id="nome" type="text" ref={nome} required />
        </div>

        <div >
            <label htmlFor="preco">Preço do produto:</label>
            <input id="preco" type="number" ref={preco} required />
        </div>

        </div>

        <label htmlFor="descricao">Descrição:</label>
        <textArea id="descricao" className={s.textos} ref={descricao} required />

        <label htmlFor="url">URL da imagem</label>
        <input id="url" type="text" className={s.textos} ref={imagem} required />

        <div className={s.btn}>
            <button type="submit">Cadastrar</button>
        </div>
    </form>
    </section>)
}

async function requisitar(body) {
  const url = "http://localhost:3001/produtos";

  return axios.post(url, body, {
    headers: {
      "Content-Type": "application/json",
    },
  })
  .then(response => {
    return response.data;
  })
  .catch(error => {
    console.log(error);
    return null;
  });
}
