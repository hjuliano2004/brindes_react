import axios from "axios";
import { useEffect, useRef, useState } from "react"
import React from "react";
import e from "./telaListagem.module.css";

export function TelaListagem(){

    const [lista, setLista] = useState([]);
    const [deletar, setDeletar] = useState("");
    const divDelete = useRef();

    useEffect(()=>{
        listar();

        function handleclickOutside(e){
            if(divDelete.current && !divDelete.current.contains(e.target)){

                if(e.target.tagName == "BUTTON"){
                    return
                }
                setDeletar("");
            }
        }

        window.addEventListener("click", handleclickOutside )

        return () => {
            window.removeEventListener("click", handleclickOutside);
        }
    }, []);

    async function listar(){
        let lista = await requisitar();
        console.log(lista);
        setLista(lista);
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
                <button className={e.bBranco}
                onClick={()=>{reqDeletar(item)}}>Deletar</button>


                <button className={e.bPreto}>Editar</button>
            </div>
        </div>
    )
}

    async function excluir(id, nome){
    let url = `http://localhost:3001/produtos/${id}`;

    try {
        let response = await fetch(url, {method: "DELETE"});

        if(!response.ok){
            alert("não foi possível excluir", nome);
            throw new Error(response.message)}else{
            alert(nome+" excluído com sucesso!");
            setDeletar("");
            return true;
        }
    } catch (e) {
        console.log(e);
    }

    return false;
}

    function reqDeletar(item){

        function limpa(){
            setDeletar("");
        }

        setDeletar(
        <div className={e.delete}>
            <h2>deletar {item.nome}?</h2>
            <button onClick={()=>{excluir(item.id, item.nome)}}>Deletar</button>
            <button onClick={limpa}>Cancelar</button>
        </div>);


    }

    return (
        <>
        <div ref={divDelete}>
            {deletar}
        </div>
        <section className={e.container}>


               
                 {lista.map((item) =>{
                    return render(item)
                })}
                

                

        </section>
        </>
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


