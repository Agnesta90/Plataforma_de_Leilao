import PropTypes from "prop-types"
import { useEffect, useState } from "react"
import { ButtonPadrao } from "./ButtonAll"

function Oferta({className, time, ProdutoSelecionado}){
    const [tempo, setTempo] = useState(time)
    const [oferta, setOferta] = useState(false)
    const [tipoOferta, setTipoOferta] = useState("")
    const usuario = JSON.parse(sessionStorage.getItem("user")) || "";
    const [valorOferta, setValorOferta] = useState("");

    useEffect(() => {
        if (tempo <= 0) return;
            const intervalo = setInterval(() => {
                setTempo(prev => prev - 1);
            }, 1000);

            return () => clearInterval(intervalo);
    }, [tempo]);

    const dias = Math.floor(tempo / 86400);
    const horas = Math.floor((tempo % 86400) / 3600);
    const minutos = Math.floor((tempo % 3600) / 60);
    const segundos = tempo % 60;

    const tempoFormatado = `${String(dias).padStart(2, "0")}:${String(horas).padStart(2, "0")}:${String(minutos).padStart(2, "0")}:${String(segundos).padStart(2, "0")}`;

    const finalizarOferta = () => {
        if (!valorOferta) return;
        ProdutoSelecionado();
        setOferta(false);
    };

    return (
        <>
            <div className={className}>
                {!oferta? (
                    <>
                        <article className="text-white text-center tablet:rounded-2xl  bg-[#3d0f78]  shadow-[4px_4px_0px_#000] p-3.5 flex flex-col justify-center items-center gap-3 tablet:h-2/4 w-full "> 
                            <h2 className="font-bold text-2xl tablet:mb-1.5">Quanto tempo falta:</h2>
                            <div className="flex flex-row justify-around gap-2 tablet:flex-col ">
                                <aside>
                                    <div className="text-[25px] tablet:text-[40px]">
                                        {tempo <= 0 ? '00:00:00:00' : tempoFormatado}
                                    </div>
                                    <div className="flex justify-around">
                                       <p>dia</p><p>hora</p><p>min</p><p>seg</p>
                                    </div>
                                </aside>
                                <ButtonPadrao className="text-[18px]  tablet:w-full tablet:text-2xl  " onclick={() => setOferta(true)}>Fazer Lance</ButtonPadrao>
                            </div>
                        </article>
                    
                    </>
                ): usuario? ( 
                        <>
                            <article className="text-white tablet:rounded-2xl  bg-[#3d0f78]  shadow-[4px_4px_0px_#000] p-3.5 flex flex-col ">
                                <div className="flex justify-center gap-1.5">
                                    <section className="w-10 tablet:mx-auto"><img  src="public/img/marteloIcon.png" alt="martelo de leilão" className="w-full"/></section>
                                    <h1 className="tablet:text-3xl text-2xl text-center font-semibold mt-1.5 mb-1.5">Qual o seu lance?</h1>
                                </div>
                                <form>
                                    <div className="flex gap-1.5 tablet:block">
                                        <section className="w-[50%] tablet:w-full">
                                            <label className="flex items-center gap-2 mb-1">
                                                <input type="radio" name="oferta" value="valor" checked={tipoOferta === "valor"} onChange={(e) => setTipoOferta(e.target.value)}/> Valor
                                            </label>
                                            <aside className={`pl-1.5 border-2 rounded-2xl p-1.5 flex items-center overflow-hidden mb-5 ${tipoOferta === "valor" ? "border-[#8B5BEE] bg-[#250F71]" : "border-gray-500 bg-gray-700 opacity-50"}`} >
                                                <span className="w-1/4 text-center text-white"> R$ </span>
                                                <input type="number" placeholder="00,00" disabled={tipoOferta !== "valor"} className="w-full h-full bg-transparent px-4 text-[#C7A6FF] outline-none placeholder:text-[#B88EFF]" onChange={(e) => setValorOferta(e.target.value)} />
                                            </aside>
                                        </section>
                                        <section className="w-[50%] tablet:w-full" >
                                            <label className="flex items-center gap-2 mb-1">
                                                <input type="radio" name="oferta" value="troca" checked={tipoOferta === "troca"} onChange={(e) => setTipoOferta(e.target.value)} /> Trocar
                                            </label>
                                            <aside className={`pl-1.5 border-2 rounded-2xl p-1.5 flex items-center overflow-hidden mb-5 ${tipoOferta === "troca" ? "border-[#8B5BEE] bg-[#250F71]" : "border-gray-500 bg-gray-700 opacity-50"}`}>
                                                <input type="text" placeholder="Troco por um carro" disabled={tipoOferta !== "troca"} className="w-full h-full bg-transparent px-4 text-[#C7A6FF] outline-none placeholder:text-[#B88EFF]"/>
                                            </aside>
                                        </section>
                                    </div>
                                    <section className="w-full flex justify-around">
                                        <ButtonPadrao className='w-[40%]' type="submit" onclick={() => {finalizarOferta()}}> Finalizar </ButtonPadrao>
                                        <button className="w-[40%] p-2 rounded-[10px]  bg-[#3d0866] text-white shadow-[4px_4px_0px_#000] cursor-pointer" type="reset" onClick={() => setOferta(false)}> Cancelar</button>
                                    </section>
                                </form>
                            </article>
                        </>
                    ): null}
            </div>
        </>
    )
}

Oferta.propTypes = {
  time: PropTypes.number.isRequired,
};
export default Oferta