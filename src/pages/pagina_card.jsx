import Head from "../components/head";
import Oferta from "../components/Oferta";
import { useLocation, useNavigate } from "react-router";
import { produtos } from "/public/dados/produtos";
import Card from "../components/Card";
import CardMostra from "../components/CardMostra";
import Div from "../components/div";
import { AuthProvider } from '../components/verificarlogin/AuthContext';
import { ModalBloqueio } from '../components/verificarlogin/avisoLogin';

function Pagina_Card() {
  const dados = useLocation().state

  const navigate = useNavigate()
  const produtosParecidos = produtos?.filter((item) => item.id_Produto !== dados.id_Produto) || [];

  function ProdutoSelecionado(){
    const produtoSalvo = ({ ...dados, produtoSelecionado: true })
    sessionStorage.setItem(`produtoSalvo`, JSON.stringify(produtoSalvo)) 
  }
  
  return (
    <>
      <AuthProvider>
        <main className=" max-h-screen tablet:grid laptop:grid-cols-[1fr_130px_600px_320px_130px_1fr]  grid-rows-[1fr_470px_1fr] gap-6 ">
          <Head className="col-span-full row-end-2"></Head>
          <div className=" col-[3/4] row-[2/3] m-auto flex justify-center tablet:block">
            <CardMostra dados={ dados }></CardMostra>
          </div>
          <Oferta className={"my-5 w-full tablet:col-[4/5] row-[2/3] tablet:w-[320px]"} time={dados.time} ProdutoSelecionado={ProdutoSelecionado} ></Oferta>
          <div className="col-[2/6] row-start-3">
            <h2 className="text-2xl font-extrabold mb-1.5">Produtos Parecidos</h2>
            <Div>
              {produtosParecidos
              ?.filter((item) => item.categorie === dados.categorie)
              .map((item) => {
                return <Card key={item.id} dados={item} onclick={() => {navigate(`/pagina-card?q=${encodeURIComponent(item.name_produto)}`, {state: item}); }}/>
              })}
            </Div>
          </div> 
        </main>
        <ModalBloqueio></ModalBloqueio>
      </AuthProvider>
    </>
  );
}

export default Pagina_Card;
