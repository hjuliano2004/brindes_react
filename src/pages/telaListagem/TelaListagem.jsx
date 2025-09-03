import axios from "axios";
import { useEffect, useState } from "react"
import React from "react";
import e from "./telaListagem.module.css";

export function TelaListagem(){

    const [lista, setLista] = useState([]);

    useEffect(()=>{
        listar();
    }, []);

    async function listar(){
        let lista = await requisitar();
        console.log(lista);
        setLista(lista);
    }

    return (
        <>
        <section className={e.container}>


               
                 {lista.map((item) =>{
                    return render(item)
                })}
                

                

        </section>
        </>
    )
}

function render(item){
    return(
        <div key={item.id} className={e.card}>

            <figure className={e.img}>
                <img src={item.imagem} />
            </figure>
            <h2>{item.nome}{" - R$"}
            {parseFloat(item.preco).toFixed(2).replace(".", ",")}</h2>
            <p>{item.descricao}</p>

            <div className={e.btns}>
                <button className={e.bBranco}>Deletar</button>
                <button className={e.bPreto}>Editar</button>
            </div>
        </div>
    )
}










async function requisitar() {
  const url = "http://localhost:3001/produtos";

  return axios.get(url)
  .then(response => {
    return response.data;
  })
  .catch(error => {
    console.log(error);
    return null;
  });
}
