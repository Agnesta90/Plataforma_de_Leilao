import { MapPin, Hourglass, Users } from 'lucide-react';

function Card({dados, onclick}) {
    function Formatacao(){
        if (dados.time >= 86400) {
            return `${Math.floor(dados.time / 86400)}d`;
        }
        if (dados.time >= 3600) {
            return `${Math.floor(dados.time / 3600)}h`;
        }

        if (dados.time >= 60) {
            return `${Math.floor(dados.time / 60)}min`;
        }
        return `${dados.time}s`
    }
    // 
    return (
        <>
            <article  className=" p-3 rounded-2xl flex flex-col justify-around text-center text-black cursor-pointer bg-white  border-black font-bold shadow-[4px_4px_0px_#000] w-50 h-70 " onClick={onclick} key={dados.id_Produto}>
                <section className="w-full h-2/3  rounded-2xl overflow-hidden ">
                    <img src={dados.img_produto} alt="" className="w-full h-full object-cover"/>
                </section>
                <p className="font-bold ">{dados.name_produto}</p>
                <section className="flex justify-between">
                    <p className="w-20 flex flex-nowrap items-center gap-1.5"><Hourglass size={16}/>{Formatacao()} </p>
                     
                    <p className='text-fuchsia-800 '>{new Intl.NumberFormat(navigator.language,{style: "currency", currency: "BRL"}).format(dados.value)}</p>
                </section>
                <section className='w-full text-start flex gap-1.5 items-center'>
                   <Users size={16}/> <p>{dados.lances === null? "0" : dados.lances}</p>
                </section>
                <section className="flex items-center gap-1.5">
                    <MapPin size={16}></MapPin>
                    <p className='text-[12px] flex items-center '>  {dados.location}</p>
                </section>
            </article>        
        </>
    );
}



export default Card;