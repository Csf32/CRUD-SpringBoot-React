import { useEffect } from "react";
import { useState } from "react";
import Formulario from "./Formulario";
import Tabela from "./Tabela";

function App(){
    
 
  const produto ={
    codigo: 0,
    nome: '',
    marca: ''
  }

  const[btnCadastrar, setBtnCadastrar] = useState(true)
  const[produtos, setProdutos] = useState([]);

  const[objProduto, setobjProduto] = useState(produto)

  useEffect(( ) => {
    
    fetch("http://localhost:8080/listar") 
    .then(retorno => retorno.json())
    .then(retorno_convertido => setProdutos(retorno_convertido))

  }, []) 

  const aoDigitar = (e) => {
    
    console.log(e.target)
    
    setobjProduto({
      ...objProduto,

      [e.target.name]:e.target.value
    })
  
  }


  const cadastrar = () => {
    fetch("http://localhost:8080/cadastrar",  { 

      body: JSON.stringify(objProduto), 
      headers: {
        'Content-type': 'application/json',
        'Accept': 'application/json'
      }
    }) 
    .then(retorno => retorno.json()) 
    .then(retorno_convertido =>  {
      console.log(retorno_convertido)

   
      if(retorno_convertido !== undefined) {
        alert(retorno_convertido.mensagem)
      }
      else{
        
        setProdutos([ ...produtos, retorno_convertido ])
        alert('Produto cadastrado com sucesso!')
      }

    })
  }


  return (
  <div className="">
    
   
    <Formulario botao = { btnCadastrar } eventoTeclado = { aoDigitar } cadastrarItens = { cadastrar }/>
    <Tabela vetor = { produtos }/>
  
  </div>
 
 )

}
export default App