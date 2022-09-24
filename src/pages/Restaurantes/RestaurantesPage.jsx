import { Container, Typography, CircularProgress } from "@material-ui/core";
import { useEffect, useState } from "react";
import { getRestaurantes } from "../../services/restaurantes.service";
import "./style.css";

function RestaurantesPage() {
  const [nomeCategoria, setNomeCategoria] = useState([]);
  const [restaurantesBaratinho, setRestaurantesBaratinho] = useState();
  const [restaurantesNoPreco, setRestaurantesNoPreco] = useState([]);
  const [restaurantesCaro, setRestaurantesCaro] = useState([]);
  const [loading, setLoading] = useState(true);
  const url = window.location.href;
  const idCategoria = url.split("/")[4];
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
        <div className="cardBoard" key={restaurante.id}>
          <img className="img" src={restaurante.imagem} alt="logo do restaurante"/> <br/>
          {restaurante.nome} <br/>
          {restaurante.distancia} km<br/>
          {restaurante.nota} <br/>
          {restaurante.tempo_medio}-{restaurante.valor_entrega} <br/>
          <br/>
        </div>
      ))}
      <div className="sub-header">
        <Typography className="titulo-preco" variant="body1" color="primary">
          No preço <span>(</span>$ $ $<span> $ $)</span>
        </Typography>
      </div>
      {restaurantesNoPreco?.map(restaurante => (
        <div className="cardBoard" key={restaurante.id}>
          <img className="img" src={restaurante.imagem} alt="logo do restaurante"/> <br/>
          {restaurante.nome} <br/>
          {restaurante.distancia} km<br/>
          {restaurante.nota} <br/>
          {restaurante.tempo_medio}-{restaurante.valor_entrega} <br/>
          <br/>
        </div>
      ))}
      <div className="sub-header">
        <Typography className="titulo-preco" variant="body1" color="primary">
          Caro, mas vale a pena <span>(</span>$ $ $ $ $<span>)</span>
        </Typography>
      </div>
      {restaurantesCaro?.map(restaurante => (
        <div className="cardBoard" key={restaurante.id}>
          <img className="img"src={restaurante.imagem} alt="logo do restaurante"/> <br/>
          {restaurante.nome} <br/>
          {restaurante.distancia} km<br/>
          {restaurante.nota} <br/>
          {restaurante.tempo_medio}-{restaurante.valor_entrega} <br/>
          <br/>
        </div>
      ))}
    </Container>
  )
}

export default RestaurantesPage;