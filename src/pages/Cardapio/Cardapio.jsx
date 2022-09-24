import {
	CircularProgress,
	Container,
	Grid,
	Typography,
} from "@material-ui/core";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getAllCategorias } from "../../services/categorias.service";

import "./styles.css";

function CardapioPage() {
	const navigate = useNavigate();
	const [categorias, setCategorias] = useState([]);
	const [loading, setLoading] = useState(true);

	const getCategorias = async () => {
		const result = await getAllCategorias();
		setCategorias(result.data);
		setLoading(false);
	};

	useEffect(() => {
		getCategorias();
	}, []);
	return (
		<Container className="categorias">
			<Typography variant="h5" align="center" color="primary" className="title">
				RESTAURANTES
			</Typography>
			{loading && (
				<div className="loading">
					<CircularProgress color="primary" />
				</div>
			)}

			<Grid container spacing={1} className="gridContainer">
				{categorias.map((categoria) => (
					<Grid item xs={4} key={categoria.ID}>
						<div
							className="containerCategorias"
							onClick={() => navigate(`/restaurantes/${categoria.ID}`)}
						>
							<img
								src={categoria.image + '.png'}
								alt={categoria.name}
								className="imgCategory"
							/>
							<div className="name_total_card">
								<Typography id="name" className="textNames">{categoria.name}</Typography>
								<Typography id="total" className="textNames">{categoria.total}</Typography>
							</div>
						</div>
					</Grid>
				))}
			</Grid>
		</Container>
	);
}

export default CardapioPage;
