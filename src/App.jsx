import Head from "./components/head";
import { produtos } from "../public/dados/produtos";
import { useNavigate } from "react-router";
import Card from "./components/Card";
import Div from "./components/div";

function App() {
  const navigate = useNavigate()

  const categoria = [
    {nome: 'Móveis', categorie: 'furniture'},
    {nome: 'Veiculos', categorie: 'vehicles' },
    {nome: 'Eletrônicos', categorie: 'electronics'},
    {nome: 'Roupas', categorie: 'clothes'}
  ]

  return (
    <>
      <Head />
      <main className="w-full flex justify-center mt-5 ">
        <div className="flex flex-col max-w-6xl ">
          {categoria.map((categoriaItem) => {
            return(
              <>
                <h2 className="text-2xl m-2 font-black leght-3">{categoriaItem.nome}</h2>
                <Div >
                  {produtos
                  ?.filter((item) => item.categorie === categoriaItem.categorie)
                  .map((item) => {
                    return <Card key={item.id} dados={item} onclick={() => {navigate(`/pagina-card?q=${encodeURIComponent(item.name_produto)}`, {state: item}); }}/>
                  })}
                </Div>
              </>
            )
          })}
        </div>
      </main>
    </>
  );
}

export default App;
