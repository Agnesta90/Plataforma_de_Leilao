import Head from "./components/head";
import { produtos } from "../public/dados/produtos";
import { useNavigate } from "react-router";
import Card from "./components/Card";
import Div from "./components/div";

function App() {
  const navigate = useNavigate()

  return (
    <>
      <Head />
      <main className="w-full flex justify-center mt-5 ">
        <div className="flex flex-col max-w-6xl ">
          <h2 className="text-2xl m-2 font-black leading-3">Móveis</h2>
          <Div>
            {produtos
            ?.filter((item) => item.categorie === "furniture")
            .map((item) => {
              return <Card key={item.id} dados={item} onclick={() => {navigate(`/pagina-card?q=${encodeURIComponent(item.name_produto)}`, {state: item}); }}/>
            })}
          </Div>
          <h2 className="text-2xl m-2 font-black leght-3">Veiculos</h2>
          <Div >
            {produtos
            ?.filter((item) => item.categorie === "vehicles")
            .map((item) => {
              return <Card key={item.id} dados={item} onclick={() => {navigate(`/pagina-card?q=${encodeURIComponent(item.name_produto)}`, {state: item}); }}/>
            })}
          </Div>
          <h2 className="text-2xl m-2 font-black leght-3">Eletrônicos</h2>
          <Div>
            {produtos
            ?.filter((item) => item.categorie === "electronics")
            .map((item) => {
              return <Card key={item.id} dados={item} onclick={() => {navigate(`/pagina-card?q=${encodeURIComponent(item.name_produto)}`, {state: item}); }}/>
            })}
          </Div>
          <h2 className="text-2xl m-2 font-black leght-3">Roupas</h2>
          <Div >
            {produtos
            ?.filter((item) => item.categorie === "clothes")
            .map((item) => {
              return <Card key={item.id} dados={item} onclick={() => {navigate(`/pagina-card?q=${encodeURIComponent(item.name_produto)}`, {state: item}); }}/>
            })}
          </Div>
        </div>
      </main>
    </>
  );
}

export default App;
