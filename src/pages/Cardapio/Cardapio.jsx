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
	const [loading, setLoading] = useState(true);
    const url = window.location.href;
    const idDetalhes = url.split("/")[4];
    

	useEffect(() => {
        getDetalhes(idDetalhes).then((response) => {
          setCardapio(response)
          setNome(response.nome)
          setDescricao(response.descricao)
          setDistancia(response.distancia)
          setLoading(false);
        })
      }, );

      console.log(cardapio)

	return (

        <p>{cardapio.descricao} e {cardapio.distancia}</p>
		
	);
}

export default CardapioPage;
