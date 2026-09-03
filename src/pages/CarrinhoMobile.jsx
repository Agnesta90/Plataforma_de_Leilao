import Head from "../components/head"
import { produtos } from "../../public/dados/produtos"
import { Trash2, Hourglass} from "lucide-react";
import { useNavigate } from "react-router";
import { useState } from "react";
import { AuthProvider} from '../components/verificarlogin/AuthContext'
import { ModalBloqueio } from '../components/verificarlogin/avisoLogin';

export default function Carrinho(){
    const usuario = JSON.parse(sessionStorage.getItem("user")) || "";

    const produtosSelecionados = produtos.filter((item) => item.produtoSelecionado?? item) || '' 
    const produtoSelecionadoSalvo = JSON.parse(sessionStorage.getItem("produtoSalvo")) || "";
    
    const [Carrinho, setCarrinho] = useState([...produtosSelecionados])
    produtoSelecionadoSalvo? (Carrinho.push(produtoSelecionadoSalvo)) : null

    function lixo(id){
        const novaCarrinho = Carrinho.filter((num) => num.id_Produto !== id)
        setCarrinho(novaCarrinho)
    }
    const navigate = useNavigate()
    return (
        <>
            <AuthProvider>
                <Head></Head>
                <h1 className="text-2xl font-bold m-1.5">Meus itens</h1>
                <main className="p-1.5 w-full">
                    {usuario && Carrinho?.map((item) => {
                            
                        function Formatacao(){
                            if (item.time >= 86400) {
                                return `${Math.floor(item.time / 86400)}dia`;
                            }
                            if (item.time >= 3600) {
                                return `${Math.floor(item.time / 3600)}h`;
                            }
                            if (item.time >= 60) {
                                return `${Math.floor(item.time / 60)}min`;
                            }
                            return `${item.time}s`
                        }

                        return(
                            <div className="border w-full rounded-2xl overflow-hidden flex justify-between mb-1.5 h-35" onClick={() => navigate(`/pagina-card?q=${encodeURIComponent(item.name_produto)}`, {state: item})} key={item.id_Produto}>
                                <div className="w-2/3 h-35 bg-gray-600 ">
                                    <img src={item.img_produto} alt="" className="w-full h-full object-cover" />
                                </div>
                                <div className="p-1.5 w-39.5">
                                    <p className="font-bold">{item.name_produto}</p>
                                    <p>{new Intl.NumberFormat(navigator.language,{style: "currency", currency: "BRL"}).format(item.value)}</p>
                                    <p className="flex items-center gap-1.5"><Hourglass size={16}/>{Formatacao()}</p>
                                </div>
                                <button className="p-1.5 m-auto" onClick={(e) => { e.stopPropagation(); lixo(item.id_Produto); }} > <Trash2 /> </button>
                            </div>
                        )
                        })
                    }
                </main>
            <ModalBloqueio></ModalBloqueio>
            </AuthProvider>
        </>    
    )
}