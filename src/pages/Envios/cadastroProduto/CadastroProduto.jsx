import React, { useRef } from "react";
import s from "./Cadastro.module.css";

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
            <input id="nome" type="text" ref={nome} />
        </div>

        <div >
            <label htmlFor="preco">Preço do produto:</label>
            <input id="preco" type="number" ref={preco} />
        </div>

        </div>

        <label htmlFor="descricao">Descrição:</label>
        <textArea id="descricao" className={s.textos} ref={descricao} />

        <label htmlFor="url">URL da imagem</label>
        <input id="url" type="text" className={s.textos} ref={imagem} />

        <div className={s.btn}>
            <button type="submit">Cadastrar</button>
        </div>
    </form>
    </section>)
}





async function requisitar(body) {
  let url = "http://localhost:3000/produtos";

  let geral = {
    method: "POST",

    body: JSON.stringify(body),

    headers: {
      "Content-Type": "application/json",
    },
  };

  try{
    let response = await fetch(url, geral);

    if(response.ok){
        let json = await response.json();
        return json;
    }
  throw new Error(response)
  
  }catch(e){
    console.log(e);

    return null;
  }


}