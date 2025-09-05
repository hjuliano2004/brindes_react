import React, { useEffect, useRef } from "react";
import s from "./Cadastro.module.css";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";

export function CadastroProduto(){

    const nome = useRef();
    const preco = useRef();
    const descricao = useRef();
    const imagem = useRef();
    const { id } = useParams();
    let idn = id && !isNaN(parseInt(id)) ? parseInt(id) : 0;
    console.log("id", id);

    const navigate = useNavigate();

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
    let sucesso = "produto cadastrado";
    let fracasso = "não foi possível cadastrar seu produto";

    if(idn){
        sucesso = "produto editado!"
        fracasso = "algo deu errado!"
    }

    let request = await requisitar(body(), idn);

    if(request){
        nome.current.value = "";
        preco.current.value = "";
        descricao.current.value = "";
        imagem.current.value = "";
        alert(sucesso);
    navigate("/telaListagem", {state: {atualizado: true} });
    }else{
        alert(fracasso);
    }
}

    useEffect(()=>{
        if(idn){
            buscaId();
        }
    }, []);

    async function buscaId(){
        let item = await getId(id);
        console.log("busca id", item)

        if(!item){
            navigate("");
            return 
        }

        nome.current.value = item.nome;
        preco.current.value = item.preco;
        descricao.current.value = item.descricao;
        imagem.current.value = item.descricao;
    }

    return (
    <section className={s.form}>
        <h1>descrição do produto</h1>
    <form onSubmit={handleSubmit}>

        <div className={s.nomePreco}>
            
        <div>
            <label htmlFor="nome">Nome do produto:</label>
            <input id="nome" type="text" ref={nome} required />
        </div>

        <div>
            <label htmlFor="preco">Preço do produto:</label>
            <input id="preco" type="number" ref={preco} required />
        </div>

        </div>

        <label htmlFor="descricao">Descrição:</label>
        <textArea id="descricao" className={s.textos} ref={descricao} required />

        <label htmlFor="url">URL da imagem</label>
        <input id="url" type="text" className={s.textos} ref={imagem} required />

        <div className={s.btn}>
            <button type="submit">Confirmar</button>
        </div>
    </form>
    </section>)
}

async function requisitar(body, id=0) {
  let url = "http://localhost:3001/produtos";

  if(id){
    url = `http://localhost:3001/produtos/${id}`;
    return axios.put(url, body, {
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


async function getId(id){
    
try {
    const response = await axios.get(`http://localhost:3001/produtos/${id}`);
    return response.data;
  } catch (error) {
    console.log("Erro ao buscar produto:", error.message);
    return null;
  }

}