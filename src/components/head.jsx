import {Search, ShoppingCart, Bell, CircleUser, Sofa, MonitorSmartphone, Car, Shirt, Trash2, Hourglass, LogIn, SquareArrowRightExit, SquarePlus} from "lucide-react";
import { Link, useNavigate } from "react-router";
import {Button_h, Button_nav, Button_menu} from "./ButtonAll";
import { useState } from "react";
import { produtos } from "../../public/dados/produtos";
import { useForm } from "react-hook-form";

export default function Head({ className }) {
  const [openCarrinho, setOpenCarrinho] = useState(false);
  const [openMenu, setOpenMenu] = useState(false);
  const navigate = useNavigate()
 
  const usuario = JSON.parse(sessionStorage.getItem("user")) || "";

  const produtosSelecionados = produtos.filter((item) => item.produtoSelecionado);

  const produtoSelecionadoSalvo = JSON.parse(sessionStorage.getItem("produtoSalvo")) || null;

  const [Carrinho, setCarrinho] = useState(() => [...produtosSelecionados, ...(produtoSelecionadoSalvo ? [produtoSelecionadoSalvo] : []), ]);

  const {register, handleSubmit} = useForm()

  function onSubmit(data){
    navigate(`/pesquisa?q=${encodeURIComponent(data.produtoPesquisado)}`, {}) // mudar nos outros de link
  }

  function lixo(id){
    const novaCarrinho = Carrinho.filter((num) => num.id_Produto !== id)
    setCarrinho(novaCarrinho)
  }
  
  return (
    <div className={className}>
      <header className="p-2.5 bg-[#1E1C2F] flex justify-center ">
        <div className="flex items-center justify-around gap-2 w-full tablet:w-3/4" > 
          <Link to="/">
            <div className="flex flex-row items-center tablet:m-2.5 ">
              <div className="w-18 tablet:w-30 ">
                <img className="w-full" src="public/img/logo.png" alt="Logo" />
              </div>
              <h1 className="text-white tablet:text-3xl m-2 text-2xl hidden tablet:block">
                Compra <br />
                Fácil
              </h1>
            </div>
          </Link>
          <form onSubmit={handleSubmit(onSubmit) } className="bg-white w-100 p-2.5 rounded-lg m-2 flex justify-center gap-1">
            <input
              type="text"
              className="w-5/6 border-none outline-none bg-none"
              placeholder="Pesquisar produtos.." 
              {...register('produtoPesquisado')}
            />
            <button type="submit" className="cursor-pointer">
              <Search />
            </button>
          </form>
          {!usuario && (
            <Link to="/login">
              <Button_h>Login</Button_h>
            </Link>
          )}
          <div className="relative">
            <Button_h onClick={() => setOpenCarrinho(!openCarrinho)}>
              <ShoppingCart></ShoppingCart>
            </Button_h>
            {usuario && 
              <dialog open={openCarrinho} className=" w-80 h-100 p-2.5 gap-1 bg-[#250F71] rounded-2xl overflow-x-scroll no-scrollbar">
                  {Carrinho?.map((item) => {
                    
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
                        <div className="border text-white rounded-2xl overflow-hidden flex justify-between mb-1.5" onClick={() => navigate(`/pagina-card?q=${encodeURIComponent(item.name_produto)}`, {state: item})} key={item.id_Produto}>
                          <div className="w-25 h-25 bg-gray-600 ">
                            <img src={item.img_produto} alt="" className="w-full h-full object-cover" />
                          </div>
                          <div className="p-1.5 w-39.5">
                            <p className="font-bold">{item.name_produto}</p>
                            <p>{new Intl.NumberFormat(navigator.language,{style: "currency", currency: "BRL"}).format(item.value)}</p>
                            <p className="flex items-center gap-1.5"><Hourglass size={16}/>{Formatacao()}</p>
                          </div>
                          <button className="p-1.5 mt-auto cursor-pointer" onClick={(e) => {e.stopPropagation(); lixo(item.id_Produto)}}><Trash2 /></button>
                        </div>
                    )
                  })}
              </dialog>
            }
          </div>
          <Button_h>
            <Bell></Bell>
          </Button_h>
          <Link to="/perfil">
            <Button_h>
              {usuario.img ? (
                <div className="w-12.5 h-12.5 rounded-full overflow-hidden">
                  <img src={usuario.img} alt="" className="full" />
                </div>
              ) : (
                <CircleUser size={50}></CircleUser>
              )}
            </Button_h>
          </Link>
          <div className="laptop:hidden block">
            <button className="text-white cursor-pointer w-12.5 h-12.5  " onClick={() => {setOpenMenu(!openMenu)}}>
              {usuario.img ? (
                <div className="w-12.5 h-12.5 rounded-full overflow-hidden">
                  <img src={usuario.img} alt="" className="full" />
                </div>
              ) : (
                <CircleUser size={50}></CircleUser>
              )}
            </button>
            <dialog open={openMenu} className="border border-white ml-auto p-1.5 ">
              <span className='text-center  '>
                  <p className='text-[16px] font-medium'>{usuario ? usuario.name : 'Nome do usuário'}</p>
                  <p className='text-[12px] text-gray-500'>{usuario ? usuario.email : 'email123@gmail.com'}</p>
              </span>
              <Button_menu><CircleUser></CircleUser>Pefil</Button_menu>
              <Link to='/cadastro'>
                  <Button_menu><SquarePlus size={20}/><p>Cadastrar Produto</p></Button_menu>
              </Link>
              {!usuario && <Button_menu onclick={() => navigate('/login')}><LogIn size={20} color="#000000" strokeWidth={1.5} />Login/cadastro</Button_menu>}
              <Button_menu onclick={() => navigate('/carrinho')}><ShoppingCart size={20} color="#000000" strokeWidth={1.5}></ShoppingCart>Carrinho</Button_menu>
              <Button_menu onclick={() => navigate('/perfil')}>
                <div className="w-6 h-6"><img src="public/img/marteloIcon.png" alt="" /></div>Meus Leilões</Button_menu>
              <Button_menu><SquareArrowRightExit size={20} color="#000000" strokeWidth={1.5} /><p >Sair da sessão</p></Button_menu>
            </dialog>
          </div>
        </div>
      </header>
      <nav className=" hidden tablet:w-full text-white bg-[#3E0866] tablet:flex justify-center">
        <div className="flex justify-around w-2/3 ">
          <Button_nav>
            <Car />
            Veículos
          </Button_nav>
          <Button_nav>
            <MonitorSmartphone />
            Eletrônicos
          </Button_nav>
          <Button_nav>
            <Sofa />
            Móveis
          </Button_nav>
          <Button_nav>
            <Shirt />
            Roupas
          </Button_nav>
        </div>
      </nav>

    </div>
  );
}
