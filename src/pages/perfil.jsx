import Head from '../components/head'
import { produtos, produtosVendidos } from '/public/dados/produtos';
import { useNavigate } from 'react-router';
import Rolagem from '../components/rolagem';
import Card from '../components/Card';
import { AuthProvider } from '../components/verificarlogin/AuthContext';
import { ModalBloqueio } from '../components/verificarlogin/avisoLogin';
import { UserPen, Bolt, History, SquareArrowRightExit, SquarePlus } from 'lucide-react';
import {Button_menu} from '../components/ButtonAll';

function Perfil(){
    const usuario = JSON.parse(sessionStorage.getItem('user')) || ''
    const produtosPadrao = produtos.filter((item) => item.produtoSelecionado?? produtos)
    const produtoSalvos = JSON.parse(sessionStorage.getItem('produtoCadastrado')) || ''

    const todosProdutos = [...produtosPadrao, ]
    produtoSalvos? (todosProdutos.push(produtoSalvos)) : null

    const navigate = useNavigate()
   
    return (
        <>  
            <AuthProvider>
                <div className='w-full h-screen laptop:grid grid-cols-[1fr_300px_1000px_1fr] grid-rows-[196px_1fr] '>
                    <Head className='col-span-full'></Head>
                    <div id='menu' className='pt-2.5 shadow-2xl w-60 flex-col items-center hidden laptop:flex col-[2/3]'>
                        <div className='overflow-hidden w-30 h-30 rounded-full border mt-1.5 '>
                            {usuario?.img ? (
                                <img src={usuario.img} alt="Foto de perfil" className='w-full h-full object-cover' />
                            ) : (
                                <img src='/img/perfil.png' alt="Avatar padrão" className='w-full h-full object-cover' />
                            )}
                        </div>
                        <span className='text-center m-1.5 '>
                            <p className='text-[16px] font-medium'>{usuario ? usuario.name : 'Nome do usuário'}</p>
                            <p className='text-[12px] text-gray-500'>{usuario ? usuario.email : 'email123@gmail.com'}</p>
                        </span>
                        <aside className='flex flex-col justify-around h-2/5 w-full pt-4'>
                            <Button_menu><UserPen /><p>Editar Perfil</p></Button_menu>
                            <Button_menu onclick={() => navigate('/cadastro')}><SquarePlus size={20}/><p>Cadastrar Produto</p></Button_menu>
                            <Button_menu><Bolt size={20} color="#000000" strokeWidth={1.5} /><p>Configurações</p></Button_menu>
                            <Button_menu><History size={20} color="#000000" strokeWidth={1.5} /><p >Histórico</p></Button_menu>
                            <Button_menu><SquareArrowRightExit size={20} color="#000000" strokeWidth={1.5} /><p >Sair da sessão</p></Button_menu>
                        </aside>
                    </div>
                    <main className='col-start-3 row-start-2 shadow-2xl p-2.5'>
                        <article className='flex flex-row gap-1.5'>
                            <section className='w-8'><img src={`${import.meta.env.BASE_URL}fogo.png`} alt="Fogo roxo"></img></section>
                            <h1 className='text-2xl font-bold mb-4'>Produtos em Leilão</h1>
                        </article>
                        <article className='w-full h-79'>
                            {usuario &&
                            (
                                <>
                                    <Rolagem>
                                        {todosProdutos.map((item) => {
                                            return <Card key={item.id} dados={item} onclick={() => {navigate(`/Leilao?q=${encodeURIComponent(item.name_produto)}`, {state: item}); }}/>
                                        })}
                                    </Rolagem>
                                </>
                            )
                            }
                        </article>
                        <article className='flex flex-row gap-1.5'>
                            <section className='w-8'><img src={`${import.meta.env.BASE_URL}caixa.png`} alt="caixa roxa"></img></section>
                            <h1 className='text-2xl font-bold mb-4'>Produtos Leiloados</h1>
                        </article>
                        {usuario &&
                        (
                            <>
                                <Rolagem>
                                    {produtosVendidos.map((item) => (
                                        <Card dados={item}></Card>
                                    ))}
                                </Rolagem>
                            </>
                        )
                        }
                    </main>
                </div>
                <ModalBloqueio></ModalBloqueio>
            </AuthProvider>
        </>
    )
}
export default Perfil