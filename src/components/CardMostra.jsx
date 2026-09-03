import { MapPin, Users } from 'lucide-react';

export default function CardMostra({dados}){
    return(
        <>
            <article  className= "shadow-[4px_4px_0px_#000] tablet:w-150 w-100 tablet:h-117.5 p-3 rounded-2xl  text-black cursor-pointer  mt-1 bg-amber-50 mb-2.5" key={dados.img_Produto}>
                <div className='w-full tablet:h-2/3 flex'>
                    <section className="w-[60%]  h-45 tablet:h-full  rounded-2xl overflow-hidden ">
                        <img src={dados.img_produto} alt="" className="w-full h-full "/>
                    </section>
                    <aside className='w-[50%] h-[60%] flex flex-col pl-3 justify-around'>
                        <h1 className="font-bold text-2xl">{dados.name_produto}</h1>
                        <p className='text-fuchsia-800  font-bold'>{new Intl.NumberFormat(navigator.language,{style: "currency", currency: "BRL"}).format(dados.value)}</p>
                        <p className='flex gap-2 items-center'><Users size={16}/>{dados.lances === null? "0" : dados.lances}</p>
                        <p className='text-[12px] flex items-center  '> <MapPin></MapPin> {dados.location}</p>
                    </aside>
                </div>
                <section className='w-full mt-1.5'>
                    <h2 className='font-bold'>Descrição</h2>
                    <p className='text-[14px]'>{dados.about}</p>
                 </section>
            </article>
        </>
    )
}

