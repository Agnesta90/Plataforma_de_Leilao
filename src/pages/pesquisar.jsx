import Head from "../components/head";
import { produtos } from "../../public/dados/produtos";
import Card from "../components/Card";
import { ChevronRight, ChevronLeft } from "lucide-react";
import { useNavigate, useSearchParams } from "react-router";
import { useState, useCallback } from "react";
import Menu from "../components/MenuPesquisa";


export default function Pesquisa() {
    const [searchParams] = useSearchParams();
    const pesquisa = searchParams.get("q") || "";
    const navigate = useNavigate();
    const [open, setOpen] = useState(false);

    const produtoPesquisado = pesquisa
        ? produtos.filter((item) => item.name_produto.includes(pesquisa))
        : produtos;
    const [produtosFiltrado, setProdutosFiltrado] = useState(produtoPesquisado);
    const [mensagem, setMensagem] = useState("");

    const buscar = useCallback((data) => {
        const achar = produtoPesquisado
        .filter((item) => {
            switch (data.time) {
            case "horas":
                return item.time < 86400;

            case "dia":
                return item.time >= 86400;

            default:
                return true;
            }
        })
        .filter((item) => {
            if (!data.estado) return true;
            if (data.estado) return item.location.includes(data.estado);
        })
        .filter((item) => {
            if (!data.valorMax) return true;
            if (data.valorMax) return item.value < data.valorMax;
        })
        .filter((item) => {
            if (!data.valorMin) return true;
            if (data.valorMin) return item.value > data.valorMin;
        });

        if (achar.length === 0) {
            setMensagem(`Item não encontrado`);
            setProdutosFiltrado(produtoPesquisado);
        }
        if (achar.length > 0) {
            setMensagem("");
            setProdutosFiltrado(achar);
        }
    }, [produtoPesquisado])

    function apagar() {
        setProdutosFiltrado(produtoPesquisado);
        setMensagem("");
    }

    return (
        <>
        <div className="w-full h-screen laptop:grid laptop:grid-cols-[1fr_300px_950px_1fr] laptop:grid-rows-[196px_1fr] ">
            <Head className="col-span-full"></Head>
            <button
                onClick={() => setOpen(!open)}
                className="laptop:hidden cursor-pointer p-2"
                >
                {open ? <ChevronLeft /> : <ChevronRight />}
            </button>
            <dialog open={open} className="w-45 laptop:hidden p-2.5">
                <Menu apagar={apagar} buscar={buscar}></Menu>
            </dialog>
            <aside className="hidden pt-2.5 shadow-2xl laptop:flex flex-col  laptop:w-60 laptop:laptop:col-[2/3] row-start-2 p-2.5">
                <Menu apagar={apagar} buscar={buscar} ></Menu>
            </aside>
            <main className="laptop:col-[3/4] laptop:row-[2/3] shadow-2xl p-2.5 ">
            <p className="font-bold ">{mensagem}</p>
            <div className="flex flex-wrap  gap-1.5">
                {produtosFiltrado.map((item) => (
                <Card
                    key={item.id_Produto}
                    dados={item}
                    onclick={() => {
                    navigate(
                        `/pagina-card?q=${encodeURIComponent(item.name_produto)}`,
                        { state: item },
                    );
                    }}
                />
                ))}
            </div>
            </main>
        </div>
        </>
    );
}
