import axios from "axios";
import { useEffect, useRef, useState } from "react"
import React from "react";
import e from "./telaListagem.module.css";
import { Outlet, useLocation, useNavigate } from "react-router-dom";

export function TelaListagem(){

    const [lista, setLista] = useState([]);
    const [deletar, setDeletar] = useState("");
    const divDelete = useRef();
    const edicao = useRef();
    const navigate = useNavigate();
    const location = useLocation();
    const barra = useRef();


    useEffect(()=>{
        listar();

        function handleclickOutside(e){
            if(e.target.tagName == "BUTTON"){
                    return
                }
            if(divDelete.current && !divDelete.current.contains(e.target)){
                setDeletar("");
            }
            if(edicao.current && !edicao.current.contains(e.target)){
                navigate("");
            }
        }

        window.addEventListener("click", handleclickOutside )
        return () => {
            window.removeEventListener("click", handleclickOutside);
        }
    }, []);

    useEffect(()=>{
        if(location.state?.atualizado){
            listar();
        }
    },[location.state])




    async function listar(){
        let lista = await requisitar();
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


                <button className={e.bPreto}
                onClick={()=>{navigate(`editar/${item.id}`)}}>Editar</button>
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

            let lista = await requisitar();
            setLista(lista);
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

    async function pesquisa(e){
        e.preventDefault();
        
        let lista = await requisitar();
        let array = [];

        let busca = barra.current.value.toUpperCase();

        if(!busca){
            setLista(lista);
            return;
        }


        for(let i=0;i<lista.length;i++){

            let nome = lista[i].nome.toUpperCase();
            if(nome.includes(busca)){
                array.push(lista[i]);
            }
        }

        setLista(array);
    }


    return (
        <main>

             <section ref={edicao} className={e.edicao}>
            <Outlet />
        </section>

    <form className={e.barra} onSubmit={pesquisa}>
            <input type="text" ref={barra} placeholder="caneca..." />
            <button>ok</button>
    </form>
        
        <section className={e.container}>
                 {lista.map((item) =>{
                    return render(item)
                })}
        </section>
       

        <div ref={divDelete}>
            {deletar}
        </div>

        
        </main>
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


