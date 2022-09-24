import {
	CircularProgress,
	Container,
	Grid,
	Typography,
} from "@material-ui/core";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getAllCategorias } from "../../services/categorias.service";
import { getDetalhes } from "../../services/cardapio.service";

import "./styles.css";

function CardapioPage() {
	const navigate = useNavigate();
    const [cardapio, setCardapio] = useState([])
    const [nome, setNome] = useState()
    const [descricao, setDescricao] = useState()
    const [distancia, setDistancia] = useState()
    const [endereco, setEndereco] = useState()
    const [imagem, setImagem] = useState()
	const [loading, setLoading] = useState(true);
    const url = window.location.href;
    const idDetalhes = url.split("/")[4];
    

	useEffect(() => {
        getDetalhes(idDetalhes).then((response) => {
          setCardapio(response)
          setNome(response.nome)
          setDescricao(response.descricao)
          setDistancia(response.distancia)
          setEndereco(response.endereco)
          setLoading(false);
        })
      }, );

      console.log(cardapio)

	return (
        <div>
            <p>{cardapio.descricao}</p> 
            <p>{cardapio.distancia} km</p>
            <p>{cardapio.endereco} </p>
            <p>{cardapio.descricao} </p>
            <p>{cardapio.descricao} </p>
            <p>{cardapio.descricao}</p>
        </div>
		
	);
}

export default CardapioPage;
