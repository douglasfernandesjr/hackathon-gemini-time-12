import { Container, Typography, CircularProgress } from "@material-ui/core";
import { useEffect, useState } from "react";
import { getRestaurantes } from "../../services/restaurantes.service";
import { useNavigate } from "react-router-dom";
import "./style.css";

const url = "https://cdn-icons-png.flaticon.com/512/148/148841.png"

function RestaurantesPage() {
  const [nomeCategoria, setNomeCategoria] = useState([]);
  const [restaurantesBaratinho, setRestaurantesBaratinho] = useState();
  const [restaurantesNoPreco, setRestaurantesNoPreco] = useState([]);
  const [restaurantesCaro, setRestaurantesCaro] = useState([]);
  const [loading, setLoading] = useState(true);
  const url = window.location.href;
  const idCategoria = url.split("/")[4];
  const navigate = useNavigate();
  console.log(idCategoria);

  useEffect(() => {
    getRestaurantes(idCategoria).then((response) => {
      setNomeCategoria(response.categoria)
      setRestaurantesBaratinho(response.baratinho);
      setRestaurantesNoPreco(response.no_preco);
      setRestaurantesCaro(response.caro);
      setLoading(false);
    })
  }, []);

  return (
    <Container class="restaurantes">
      <Typography variant="h5" align="center" color="primary" className="title">
        RESTAURANTES: {nomeCategoria}
      </Typography>
      {loading && (
        <div className="loading">
          <CircularProgress color="primary" />
        </div>
      )}
      <div className="sub-header">
        <Typography className="titulo-preco" variant="body1" color="primary">
          Baratinho <span>(</span>$ <span>$ $ $ $)</span>
        </Typography>
      </div>
      {restaurantesBaratinho?.map(restaurante => (
        <div onClick={() => navigate(`/cardapio/${restaurante.id}`)} className="cardBoard" key={restaurante.id}>
          <img className="img" src={restaurante.imagem} alt="logo do restaurante" /> <br />
          <div className="format-back">{restaurante.nome} <br />
            {restaurante.distancia} km<br />
            <img className="star_logo" src="https://cdn-icons-png.flaticon.com/512/148/148841.png" alt="star_logo" />{restaurante.nota} <br />
            {restaurante.tempo_medio}-{restaurante.valor_entrega} <br />
            <br />
          </div>
        </div>
      ))}
      <div className="sub-header">
        <Typography className="titulo-preco" variant="body1" color="primary">
          No preço <span>(</span>$ $ $<span> $ $)</span>
        </Typography>
      </div>
      {restaurantesNoPreco?.map(restaurante => (
        <div onClick={() => navigate(`/cardapio/${restaurante.id}`)} className="cardBoard" key={restaurante.id}>
          <img className="img" src={restaurante.imagem} alt="logo do restaurante" /> <br />
          <div className="format-back">{restaurante.nome} <br />
            {restaurante.distancia} km<br />
            <img className="star_logo" src="https://cdn-icons-png.flaticon.com/512/148/148841.png" alt="star_logo" />{restaurante.nota} <br />
            {restaurante.tempo_medio}-{restaurante.valor_entrega} <br />
          </div>
          <br />
        </div>
      ))}
      <div className="sub-header">
        <Typography className="titulo-preco" variant="body1" color="primary">
          Caro, mas vale a pena <span>(</span>$ $ $ $ $<span>)</span>
        </Typography>
      </div>
      {restaurantesCaro?.map(restaurante => (
        <div onClick={() => navigate(`/cardapio/${restaurante.id}`)} className="cardBoard" key={restaurante.id}>
          <img className="img" src={restaurante.imagem} alt="logo do restaurante" /> <br />
          <div className="format-back">
            {restaurante.nome} <br />
            {restaurante.distancia} km<br />
            <img className="star_logo" src="https://cdn-icons-png.flaticon.com/512/148/148841.png" alt="star_logo" />{restaurante.nota} <br />
            {restaurante.tempo_medio}-{restaurante.valor_entrega} <br />
            <br />
          </div>


        </div>
      ))}
    </Container>
  )
}

export default RestaurantesPage;