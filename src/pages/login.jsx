import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { Link, useNavigate } from 'react-router';
import { users } from '/public/dados/usuarios';
import { ButtonPadrao } from '../components/ButtonAll';

function Login(){
    const [imagem, setImagem] = useState(() => {
        return sessionStorage.getItem('userImg') || ''
    })
    const [conta, setConta] = useState(true)
    
    const handleImagem = (e) => {
        const arquivo = e.target.files[0]
        
        if (arquivo) {
            const reader = new FileReader();
            reader.onloadend = () => {
                const base64String = reader.result;
                setImagem(base64String); 
                sessionStorage.setItem('userImg', base64String); 
            };
            reader.readAsDataURL(arquivo);
        }
    }
    const loginForm = useForm({mode: "onChange"})
    const singForm = useForm({mode: "onChange"})
    const [password, passwordAgain] = singForm.watch(["password","passwordAgain"]) || ""
    const confirmation = passwordAgain && password !== passwordAgain
    const [mensagem, setMensagem] = useState('')
    const navigate = useNavigate()
    
    const onSubmitSing = (data) => {
        const usuario = ({
            userId: crypto.randomUUID(),
            userName: data.userName,
            email: data.email,
            password: data.password,
            userImg: imagem ?? null,
        })
        sessionStorage.setItem("usuario", JSON.stringify(usuario)) || ''
        singForm.reset()
        setConta(true)
    }

    const from = location.state?.from || "/";
    const onSubmitLogin = (data) => {
        const usuarioSalvo = JSON.parse(sessionStorage.getItem('usuario')) || []
        const usuarioPadrao = users
        const todosUsuarios = [...usuarioPadrao, usuarioSalvo ]
        const usuarioEncontrado = todosUsuarios.find((usuario) => {
            return data.emailLogin === usuario.email  && data.passwordLogin === usuario.password
        })
        if(usuarioEncontrado){
            const user = ({
                userId: usuarioEncontrado.userId,
                name: usuarioEncontrado.userName,
                email: usuarioEncontrado.email,
                img: usuarioEncontrado.userImg, 
            })
            sessionStorage.setItem("user", JSON.stringify(user)) || ''
            navigate(from, { replace: true });
        }else{
           setMensagem(<p className="text-red-600 text-[14px] mt-0.5">Email ou senha incorreto</p>)
        }
        loginForm.reset()
    }

    const limparFormulario = () => {
        setImagem("");
        sessionStorage.removeItem("userImg");
    }

    return (
        <>
           {conta? 
                (
                    <>
                        <div className='w-screen h-screen flex justify-center items-center laptop:items-stretch laptop:grid grid-cols-[1fr_1fr] bg-[#1E1C2F] laptop:bg-white text-white laptop:text-black'>
                            <header className=" p-2.5  bg-[#1E1C2F] rounded-l-[100px] col-[2/2] hidden laptop:block"> 
                                <div className='flex items-center justify-center flex-col m-w-110 h-full p-2'>
                                    <Link to='/'>
                                        <div className=" flex items-center ">
                                            <div className="w-20 laptop:w-40">
                                                <img className="w-full" src="src/img/logo.png" alt="Logo" />
                                            </div>
                                            <h1 className='text-white text-2xl laptop:text-4xl m-2'>Compra  <br />Fácil</h1>
                                        </div>
                                    </Link>
                                    <h1 className='text-white text-4xl mt-5 w-2xs text-center'>Bem vindo de volta!</h1>
                                    <p className='text-white text-center mt-2'></p>
                                    <ButtonPadrao onclick={() => setConta(false)}> Criar conta
                                    </ButtonPadrao>
                                </div>
                            </header>
                            <main className='m-3.5 w-full laptop:w-150 laptop:m-auto laptop:col-[1-1] laptop:bg-white laptop:row-start-1 p-3 rounded-2xl bg-[#2D2A4A]/40 backdrop-blur-md border border-white/10 '>
                                <div className="w-20 m-auto laptop:hidden">
                                    <img className="w-full" src="src/img/logo.png" alt="Logo" />
                                </div>
                                <h1 className='text-[50px] text-center m-1'>Login</h1>
                                <form onSubmit={loginForm.handleSubmit(onSubmitLogin)} className='flex flex-col gap-4 m-3.5'>
                                    <label htmlFor='emailLogin' >
                                        <h2 className='text-2xl'>Email</h2>
                                        <input type="email" id='emailLogin' className=" w-full text-[18px] border rounded-[5px] p-1 shadow-[4px_4px_0px_#fff] laptop:shadow-[4px_4px_0px_#000] outline-0 mb-0.5" {...loginForm.register('emailLogin', {required: true})}/>
                                        {loginForm.formState.errors?.emailLogin?.type == "required" && (<p className='text-red-600 text-[14px] mt-0.5'>Email é obrigatório</p>)}
                                    </label>
                                    <label htmlFor='passwordLogin'>
                                        <h2 className='text-2xl'>Senha</h2>
                                        <input type="password" id='passwordLogin' className="shadow-[4px_4px_0px_#fff] w-full text-[18px] border rounded-[5px] p-1 laptop:shadow-[4px_4px_0px_#000] outline-0 mb-0.5" {...loginForm.register('passwordLogin', {required: true})} />
                                        {loginForm.formState.errors?.passwordLogin?.type == "required" && (<p className='text-red-600 text-[14px] mt-0.5'>Senha é obrigatória</p>)}
                                        <a href="#" className="text-blue-600 hover:text-blue-800 underline font-medium mt-1.5" > {/*Esse link vai ser meramente ilustrativo*/}
                                        <p className='text-[12px]'>Esqueci minha senha</p>
                                    </a>
                                    </label>
                                    
                                    {mensagem}
                                    <ButtonPadrao type='submit' >Entrar</ButtonPadrao>
                                    <p className='text-[12px] tablet:hidden'>Não tem conta? <button onClick={() => setConta(false)} className='text-blue-600 hover:text-blue-800 underline font-medium'>Criar conta</button></p>
                                </form>
                            </main>
                        </div>
                    </>
                ):
                (
                    <div className='w-screen h-screen laptop:grid grid-cols-[2fr_1fr_800px_1fr] bg-[#1E1C2F] laptop:bg-white text-white laptop:text-black flex flex-col'>
                        <header className="p-2.5  bg-[#1E1C2F]  rounded-r-[100px] col-[1/2] hidden laptop:block "> 
                            <div className='flex items-center justify-center flex-col m-w-110 h-full  p-2'>
                                <Link to='/'>
                                    <div className=" flex items-center ">
                                        <div className="w-40">
                                            <img className="w-full" src="src/img/logo.png" alt="Logo" />
                                        </div>
                                        <h1 className='text-white text-4xl m-2'>Compra  <br />Fácil</h1>
                                    </div>
                                </Link>
                                <h1 className='text-white text-4xl mt-5'>Bem vindo!</h1>
                                <p className='text-white text-center mt-2'>Seja bem-vindo(a)! Aqui você encontra o que procura com segurança ou faz aquela graninha extra vendendo o que não usa mais. Explore nossas categorias, aproveite as ofertas e boas compras!</p>
                                <ButtonPadrao onclick={() => setConta(true)} className='mt-2'>Tenho conta</ButtonPadrao>
                            </div>
                        </header>
                        <main className=' m-3.5 laptop:w-200 laptop:m-auto col-[3/4] overflow-hidden h-screen p-1 flex items-center'>
                            <form onSubmit={singForm.handleSubmit(onSubmitSing)} className='laptop:grid grid-cols-[1fr_1fr_120px_96px] grid-rows-[70px_70px_160px_70px_70px] laptop:gap-2.5 flex flex-col gap-6 overflow-hidden w-full h-177.5 laptop:h-128 laptop:bg-white  bg-[#2D2A4A]/40 backdrop-blur-md border border-white/10 p-3.5 rounded-3xl '> 
                                <div className='flex items-center gap-1.5 laptop:hidden '>
                                    <div className="w-10 ">
                                        <img className="w-full" src="src/img/logo.png" alt="Logo" /> 
                                    </div>
                                    <p>Sing in</p>
                                </div>
                                <label htmlFor="userName" className='laptop:col-start-1 laptop:row-span-1 laptop:w-full order-2 '>
                                    <h2 className='font-bold '>Nome </h2>
                                    <input type="text" id='userName' className=" w-full laptop:w-62.5 border rounded-[5px] p-1 text-[16px] shadow-[4px_4px_0px_#fff] laptop:shadow-[4px_4px_0px_#000] outline-0 mb-0.5" {...singForm.register('userName', {required: true})} />
                                    {singForm.formState.errors?.userName?.type == "required" && (<p className='text-red-600 text-[14px] mt-0.5'>O nome é obrigatório</p>)}
                                </label>
                                <label htmlFor="email" className='laptop:col-start-1 order-2'>
                                    <h2 className='font-bold'>E-mail  </h2>
                                    <input type="email" id='email' className="w-full laptop:w-62.5 border rounded-[5px] p-1 text-[16px] shadow-[4px_4px_0px_#fff] laptop:shadow-[4px_4px_0px_#000] outline-0 mb-0.5" {...singForm.register('email', {required: true})} />
                                    {singForm.formState.errors?.email?.type == "required" && (<p className='text-red-600 text-[14px]'>O e-mail é obrigatório</p>)}
                                </label>
                                <label htmlFor="password" className='laptop:col-start-1 order-2'>
                                    <h2 className='font-bold'>Senha</h2> 
                                    <input type="password" id='password' placeholder='EX: A5x9M2k7' className='w-full laptop:w-62.5 border rounded-[5px] p-1 text-[16px] shadow-[4px_4px_0px_#fff] laptop:shadow-[4px_4px_0px_#000] outline-0 mb-0.5' {...singForm.register('password', {required: true, minLength: {value: 8}, pattern: {value: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).+$/}})}/>
                                    {singForm.formState.errors?.password?.type == "required" && (<p className='text-red-600 text-[14px] '>A senha é obrigatória</p>)}
                                    <ul className='text-[12px] mt-0.5 ml-1.5' >
                                        <h3 className='font-bold'>Que contenha:</h3>
                                        <li className={password && (/\d/.test(password)? "text-green-600" : "text-red-600" )}>Números</li>
                                        <li className={password && (/[A-Z]/.test(password)? "text-green-600" : "text-red-600" )}>Letra Maiúscula</li>
                                        <li className={password && (/[a-z]/.test(password)? "text-green-600" : "text-red-600" )}>Letra minúscula</li>
                                        <li className={password && (singForm.formState.errors?.password?.type === "minLength" ? "text-red-600" : "text-green-600" ) }>8 digitos</li>
                                    </ul>
                                </label>
                                <label htmlFor="passwordAgain" className='laptop:col-start-1 mt-0.5 order-2'>
                                    <h2 className='font-bold' >Digite a senha novamente</h2>
                                    <input type="password" id='passwordAgain' className='w-full laptop:w-62.5 border rounded-[5px] text-[16px] shadow-[4px_4px_0px_#fff] laptop:shadow-[4px_4px_0px_#000] outline-0 mb-0.5 p-1' {...singForm.register('passwordAgain', {required: true})} />
                                    {singForm.formState.errors?.passwordAgain?.type == "required" && (<p className='text-red-600 text-[14px]'>Senha de confirmação é obrigatório</p>)}
                                    { confirmation && (<p className='text-red-600 text-[14px]'>Senha incorreta</p>) }
                                </label>
                                <div className='overflow-hidden col-[2/5] row-[1/5] shadow-[4px_4px_0px_#fff] laptop:shadow-[4px_4px_0px_#000] order-1 w-20 h-20 laptop:w-[90%] laptop:h-[90%] rounded-[100%] laptop:rounded-[0%] ml-auto mr-auto tablet:mr-0'>
                                    <label htmlFor="userImg" className= 'flex h-full w-full cursor-pointer items-center tablet:items-end justify-center border-2 rounded-[100%] laptop:rounded-[0%]'>
                                        <input type="file" id="userImg"  className='hidden' {...singForm.register('userImg', {onChange: handleImagem})}    />
                                        <aside className='w-full h-full '>
                                            <img src={imagem} alt="" className='w-full h-full object-contain rounded-[100%] laptop:rounded-[0%]'/>
                                        </aside>
                                    </label>
                                </div>
                                <div className='order-3 flex gap-1.5 ml-auto pr-1.5 row-end-6 col-[3/5]'>
                                    <ButtonPadrao type='submit' className='w-30 h-14 mt-1.5'>Cadastrar</ButtonPadrao>
                                    <button type='reset' className="w-24 h-14 p-2 rounded-[10px]  bg-[#3d0866a6] text-white font-bold shadow-[4px_4px_0px_#fff] laptop:shadow-[4px_4px_0px_#000] cursor-pointer   mt-1.5 " onClick={limparFormulario}>Cancelar</button>
                                    
                                </div>
                            </form>
                        </main>
                    </div>
                )
            }
        </>
    )
}

export default Login