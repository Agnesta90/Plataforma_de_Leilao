import Head from "../components/head";
import CardMostra from "../components/CardMostra";
import { useLocation } from "react-router";
import { CircleUser } from "lucide-react";
import { useState } from "react";
import { useEffect } from "react";

export default function Leilao() {
  const local = useLocation();
  const { name_produto, img_produto, value, location, time, lances, about } = local.state;
  const [ganhador, setGanhador] = useState(false);
  const [tempo, setTempo] = useState(time);

  useEffect(() => {
    if (tempo <= 0) return;
    const intervalo = setInterval(() => {
      setTempo((prev) => prev - 1);
    }, 1000);

    return () => clearInterval(intervalo);
  }, [tempo]);

  const dias = Math.floor(tempo / 86400);
  const horas = Math.floor((tempo % 86400) / 3600);
  const minutos = Math.floor((tempo % 3600) / 60);
  const segundos = tempo % 60;

  const tempoFormatado = `${String(dias).padStart(2, "0")}:${String(horas).padStart(2, "0")}:${String(minutos).padStart(2, "0")}:${String(segundos).padStart(2, "0")}`;

  const [pessoas, setPessoas] = useState([
    { id: 1, nome: "João", valor: 12500 },
    { id: 2, nome: "Maria", valor: 18750 },
    { id: 3, nome: "Carlos", valor: 24500 },
    { id: 4, nome: "Ana", valor: 31800 },
    { id: 5, nome: "Pedro", valor: 40250 },
    { id: 6, nome: "Juliana", valor: 51700 },
    { id: 7, nome: "Lucas", valor: 63900 },
    { id: 8, nome: "Fernanda", valor: 72800 },
    { id: 9, nome: "Rafael", valor: 85600 },
    { id: 10, nome: "Camila", valor: 97500 },
  ]);

  function aceitar(id) {
    const novaLista = pessoas.filter((item) => item.id === id);
    setPessoas(novaLista);
    setTempo("0");
  }
  function rejeitar(id) {
    const novaLista = pessoas.filter((item) => item.id !== id);
    setPessoas(novaLista);
  }

  return (
    <>
      <Head></Head>
      <main className=" laptop:flex justify-center gap-20 w-screen mt-5">
        <div className="laptop:w-150 laptop:h-95">
          <CardMostra dados={{ img_produto, name_produto, value, location, lances, about }}></CardMostra>
        </div>
        <article className="laptop:w-100 h-117.5  rounded-2xl bg-[#3d0f78] p-3 ">
          <section className=" p-2 border border-white rounded-2xl text-center bg-white">
            <h1 className="text-2xl font-bold"> Lista de Lances</h1>
            <p>{tempoFormatado}</p>
          </section>
          {lances && (
            <aside className="mt-3 w-full flex flex-col gap-1.5 h-90 overflow-x-scroll no-scrollbar">
              {pessoas.map((item) => {
                return ganhador ? (
                  <div
                    key={item.id}
                    className="grid grid-cols-[55px_130px_1fr]  text-white w-full border-3 border-green-600 items-center rounded-2xl p-1.5 "
                  >
                    <CircleUser size={50} color="white" />
                    <span>
                      <h2>{item.nome}</h2>
                      <p className="mb-auto">
                        {new Intl.NumberFormat(navigator.language, {
                          style: "currency",
                          currency: "BRL",
                        }).format(item.valor)}
                      </p>
                    </span>
                    <aside className="bg-green-600 p-2 text-center rounded-2xl ">
                      <p>Ganhador!</p>
                    </aside>
                  </div>
                ) : (
                  <>
                    <div
                      key={item.id}
                      className="grid grid-cols-[55px_130px_85px_90px]  text-white w-full border items-center rounded-2xl p-1.5"
                    >
                      <CircleUser size={50} color="white" />
                      <span>
                        <h2>{item.nome}</h2>
                        <p className="mb-auto">
                          {new Intl.NumberFormat(navigator.language, {
                            style: "currency",
                            currency: "BRL",
                          }).format(item.valor)}
                        </p>
                      </span>
                      <button
                        className="w-21 p-2 rounded-2xl border-4 border-black bg-[#8B5BEE] text-white shadow-[4px_4px_0px_#000] cursor-pointer hover:-translate-y-1 active:shadow-[1px_1px_0px_#000] mt-3 mb-3"
                        onClick={() => {
                          (aceitar(item.id), setGanhador(true));
                        }}
                      >
                        Aceitar
                      </button>
                      <button
                        className=" w-23 p-2 rounded-2xl border-4 border-black bg-[#8c5beeaf] text-white shadow-[4px_4px_0px_#000] cursor-pointer hover:-translate-y-1 active:shadow-[1px_1px_0px_#000] mt-3 mb-3"
                        onClick={() => rejeitar(item.id)}
                      >
                        Rejeitar
                      </button>
                    </div>
                  </>
                );
              })}
            </aside>
          )}
        </article>
      </main>
    </>
  );
}
