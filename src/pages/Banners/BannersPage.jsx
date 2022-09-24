import { useEffect, useState } from "react";
import {
  CircularProgress,
  Container,
  Typography,
  Fab,
  Button,
} from "@material-ui/core";
import { ArrowBackIos, ArrowForwardIos } from "@material-ui/icons";
import { getAllBanners } from "../../services/banner.service";
import { useNavigate } from "react-router-dom";
import "./style.css";

function BannersPage() {
  const navigate = useNavigate();
  const [listaBanners, setListaBanners] = useState([]);
  const [index, setIndex] = useState(0);
  const [loading, setLoading] = useState(true);
  const selectedBanner = listaBanners[index];
  const isFirst = index === 0;
  const isLast = index === listaBanners.length - 1;

  const getBanners = async () => {
    const result = await getAllBanners();
    setListaBanners(result.data);
    setLoading(false);
  };

  useEffect(() => {
    getBanners();
  }, []);

  const mudarBanner = (mudanca) => {
    setIndex(index + mudanca);
  };

  if (loading) {
    return (
      <div className="loading">
        <CircularProgress color="primary" />
      </div>
    );
  }

  if ((selectedBanner?.nome).includes("UNTER")){
    selectedBanner.imagem = "https://i.imgur.com/MySVZSx.png";
    selectedBanner.nome = "HOJE EU COMEÇO";
    selectedBanner.descricao = "Cupom hoje eu começo: Promoção válida na primeira compra bem-sucedida em restaurantes selecionados. Apenas válido para compras pelo site. Válido apenas uma vez por CPF. Compra mínima de 50 reais para utilização do cupom, tendo um valor máximo de 20 reais de desconto. Válido enquanto estiverem cupons disponíveis.";
    selectedBanner.subtitulo = "15% de desconto em restaurantes de comida saudável";
   

  }

  return (
    <div className="full-height" style={{backgroundColor: selectedBanner['background-color']}}>
      <Container>
        <div className="title-home">
          <Typography
            className="title-home"
            variant="h5"
            align="center"
            color="primary"
          >
            {selectedBanner.nome}
          </Typography>
        </div>

        <Typography variant="body1" align="center" className="subtitle">
          {selectedBanner.subtitulo}
        </Typography>

        <Typography variant="body2" align="center" className="descricao">
          {selectedBanner.descricao}
        </Typography>

        <div className="actions">
          <Fab color="primary" onClick={() => mudarBanner(-1)} disabled={isFirst}>
            <ArrowBackIos />
          </Fab>
          <Button
            variant="contained"
            color="primary"
            onClick={() => navigate("/categorias")}
          >
            Faça seu Pedido
          </Button>

          <Fab color="primary" onClick={() => mudarBanner(1)} disabled={isLast}>
            <ArrowForwardIos />
          </Fab>
        </div>
      </Container>
      <img className="main-image" src={selectedBanner.imagem} alt={selectedBanner.nome} />
    </div>
  );
}

export default BannersPage;
