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
	const [loading, setLoading] = useState(true);
    const url = window.location.href;
    const idDetalhes = url.split("/")[4];
    console.log(cardapio.categoria)

	useEffect(() => {
        getDetalhes(idDetalhes).then((response) => {
          setCardapio(response.cardapio)
          setLoading(false);
        })
      }, );

	return (
		<Container className="detalhes">
			<Typography variant="h5" align="center" color="primary" className="title">
				RESTAURANTES:
            
			</Typography>
			{loading && (
				<div className="loading">
					<CircularProgress color="primary" />
				</div>
			)}

			<Grid container spacing={1} className="gridContainer">
				{cardapio.map((detalhes) => (
					<Grid item xs={4} key={cardapio.ID}>
						<div
							className="containerCategorias"
							onClick={() => navigate(`/restaurantes/${detalhes.ID}`)}
						>
							<img
								src={cardapio.image + '.png'}
								alt={detalhes.name}
								className="imgCategory"
							/>
							<div className="name_total_card">
								<Typography id="name" className="textNames">{cardapio.categoria}</Typography>
								<Typography id="total" className="textNames">{detalhes.total}</Typography>
							</div>
						</div>
					</Grid>
				))}
			</Grid>
		</Container>
	);
}

export default CardapioPage;
