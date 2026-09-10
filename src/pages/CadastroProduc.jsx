import { Link, useNavigate } from "react-router"
import { useState } from "react"
import { useForm } from "react-hook-form"
import { ButtonPadrao } from "../components/ButtonAll"

export default function Cadastro(){
    const [imagem, setImagem] = useState(() => {
        return sessionStorage.getItem('img_Produto') || ''
    })

    const handleImagem = (e) => {
        const arquivo = e.target.files[0]
        
        if (arquivo) {
            const reader = new FileReader();
            reader.onloadend = () => {
                const base64String = reader.result;
                setImagem(base64String); 
                sessionStorage.setItem('img_Produto', base64String); 
            };
            reader.readAsDataURL(arquivo);
        }
    }
    const {register, handleSubmit, formState: {errors}, } = useForm({mode: "onChange"})
    const navigate = useNavigate()
    
    const onSubmit = (data) => {
        const produtoCadastrado = ({
            id_Produto: crypto.randomUUID(),
            img_produto: imagem,
            name_produto: data.title,
            about: data.about,
            value: data.value,
            time: data.time,
            categorie: data.categorie,
            location: data.location,
            lances: null,
            produtoSelecionado: false,
            produtoVendido: false,
        })
        sessionStorage.setItem(`produtoCadastrado`, JSON.stringify(produtoCadastrado)) || ''
        setImagem("");
        sessionStorage.removeItem("img_Produto")
        navigate('/perfil')
    }

    const limparFormulario = () => {
        setImagem("");
        sessionStorage.removeItem("img_Produto");
    }

    return (
        <main className="w-screen h-screen">
            <header className="p-2.5  bg-[#1E1C2F] hidden tablet:block">
                <Link to='/'>
                    <div className="m-w-100 h-full  p-2 flex items-center ">
                        <div className="w-25">
                            <img className="w-full" src="./img/logo.png" alt="Logo" />
                        </div>
                        <h1 className='text-white text-4xl m-2'>Compra<br/>Fácil</h1>
                    </div>
                </Link>
            </header>
            <div className="p-4 bg-[#1E1C2F] tablet:bg-white overflow-hidden w-screen text-white tablet:text-black  ">
                <form onSubmit={handleSubmit(onSubmit)} className='tablet:w-200 tablet:h-110 tablet:m-auto tablet:grid grid-cols-[400px_1fr_120px_100px] tablet:mt-6  grid-rows-[repeat(6,80px)] flex flex-col gap-3.5 tablet:'>
                    <div className="w-15 block tablet:hidden" onClick={() => navigate('/')}>
                        <img className="w-full" src="./img/logo.png" alt="Logo" />
                    </div>
                    <div className='col-start-1 row-[1/2] order-2 tablet:order-1 '>
                        <h2 className='font-bold '>Nome </h2>
                        <input type="text" className="w-full tablet:w-62.5 border rounded-[5px] p-1 text-[16px] shadow-[4px_4px_0px_#fff] tablet:shadow-[4px_4px_0px_#000]  outline-0 mb-0.5" {...register('title', {required: true})} />
                        {errors?.title?.type == "required" && (<p className='text-red-600 text-[14px] mt-0.5'>O nome é obrigatório</p>)}
                    </div>
                    <div className='col-start-1 row-[2/3] order-2 tablet:order-1' >
                        <h2 className='font-bold '>Valor </h2>
                        <input type="text" className="w-full tablet:w-62.5 border rounded-[5px] p-1 text-[16px] shadow-[4px_4px_0px_#fff] tablet:shadow-[4px_4px_0px_#000]  outline-0 mb-0.5" {...register('value', {required: true})} />
                        {errors?.value?.type == "required" && (<p className='text-red-600 text-[14px] mt-0.5'>O Valor é obrigatório</p>)}
                    </div>
                    <div className="col-[1/2] row-[3/4] order-2  ">
                        <h2 className='font-bold'>Categoria</h2>
                        <select className=" w-full tablet:w-62.5  rounded-[5px] p-1 text-[16px] shadow-[4px_4px_0px_#fff] tablet:shadow-[4px_4px_0px_#000]  outline-0 mb-0.5 bg-[#3E0866] text-white " aria-placeholder="Selecione uma categoria" {...register('categorie', {required: true})} defaultValue={''} >
                            <option value="disabled">Selecione uma categoria</option>
                            <option value="clothes">Roupa</option>
                            <option value="vehicles">Veículo</option>
                            <option value="eletronics">Eletrônico</option>
                            <option value="furniture">Móvel</option>
                            <option value="other">Outro</option>
                        </select>
                        {errors?.categorie?.type == "required" && (<p className='text-red-600 text-[14px]'>Categoria é obrigatório</p>)}
                    </div>
                    <div className='col-start-1 row-[4/5] order-2' >
                        <h2 className='font-bold'>Localização</h2>
                        <input type="text" className="w-full tablet:w-62.5 border rounded-[5px] p-1 text-[16px] shadow-[4px_4px_0px_#fff] tablet:shadow-[4px_4px_0px_#000]  outline-0 mb-0.5 "  {...register('location', {required: true})}/>
                        {errors?.location?.type == "required" && (<p className='text-red-600 text-[14px] mt-0.5'> Localizaçãoé obrigatório</p>)}
                    </div>
                    <div className='flex flex-col col-[2/4] w-2xs row-[5/6] mt-auto order-2 ' {...register('time', {required: true})}>
                        <h2 className='font-bold'>Escolha o tempo de exibição  </h2>
                        <ul className="flex justify-around h-full ">
                            <li><label><input type="radio" value="3600" {...register("time", { required: true })}/> 1 hora</label></li>
                            <li><label><input type="radio" value="86400" {...register("time", { required: true })}/> 1 dia</label></li>
                            <li><label><input type="radio" value="1296000" {...register("time", { required: true })}/> 15 dias</label></li>
                            <li><label><input type="radio" value="2592000" {...register("time", { required: true })}/> 30 dias</label></li>
                        </ul>
                        {errors?.time?.type == "required" && (<p className='text-red-600 text-[14px]'>Tempo de exibição é obrigatório</p>)}
                    </div>
                    <div className='shadow-[4px_4px_0px_#fff] tablet:shadow-[4px_4px_0px_#000] w-30 h-30 tablet:w-100 tablet:h-80 row-[1/5] col-[2/5] ml-auto mr-auto tablet:ml-auto border-2 order-1 '>
                        <label htmlFor="img_Produto" className='flex h-90 w-full cursor-pointer items-center justify-center' >
                            <input type="file" id="img_Produto"  className='hidden '  {...register('img_Produto', {required: true, onChange: handleImagem})} />
                            <aside className='w-[90%] h-[90%]'>
                                {imagem && (<img src={imagem} alt="" className='w-full h-full object-contain border-0 outline-none'/>)}
                            </aside>
                        </label>
                        {errors?.img_Produto?.type == "required" && (<p className='text-red-600 text-[14px] col-[2/5] row-[4/5] mt-auto'>Imagem do produto é obrigatório</p>)}
                    </div>
                    <div htmlFor="about" className='col-[1/2] row-[5/6] order-3 '>
                        <h2 className='font-bold'>Descrição do produto </h2>
                        <textarea name="" id="about" className="w-full tablet:w-62.5 border rounded-[5px] p-1 text-[16px] shadow-[4px_4px_0px_#fff] tablet:shadow-[4px_4px_0px_#000] outline-0 mb-0.5" {...register('about', {required: true})}></textarea>
                        {errors?.about?.type == "required" && (<p className='text-red-600 text-[14px] '>Descrição é obrigatório</p>)}
                    </div>
                    <div className="order-4 flex gap-3.5 ml-auto h-14 mb-auto col-[3/5] row-[6/6]">
                        <ButtonPadrao type={'submit'} >Cadastrar</ButtonPadrao>
                        <button onClick={() => {limparFormulario, navigate(-1)}} type="reset" className="bg-[#3d0866a6] w-24 h-14 rounded-[10px] p-2 shadow-[4px_4px_0px_#fff] tablet:shadow-[4px_4px_0px_#000]">Cancelar</button>
                    </div> 
                </form>
            </div>
        </main>
    )
}