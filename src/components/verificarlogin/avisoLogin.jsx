import { useAuth } from './AuthContext';
import { Hourglass } from 'lucide-react';
import {ButtonPadrao} from '../ButtonAll';
import { useNavigate } from 'react-router';

export function ModalBloqueio() {
  const { mostrarBloqueio } = useAuth();
  const navigate = useNavigate()

  if (!mostrarBloqueio) return null;

  return (
    <div className='fixed bg-black/85 flex justify-center items-center pointer-events-auto inset-0 z-9999  '>
      <div className='bg-white w-112.5 text-center p-2 rounded-2xl h-62.5 flex justify-around flex-col m-2.5'>
        <h2 className=' text-2xl font-bold flex items-center gap-1 justify-center'>Tempo de teste esgotado! <Hourglass /> </h2>
        <p className='m-2.5'>Para continuar navegando e acessar os leilões de nossa plataforma, você precisa <strong>criar uma conta</strong> ou <strong>fazer login</strong>.</p>
        <ButtonPadrao className="m-2 shadow-[4px_4px_0px_#000] rounded-[10px]" onclick={() => navigate("/login", {state: {from: location.pathname,}})}>Fazer Login / Cadastra</ButtonPadrao>
      </div>
    </div>
  );
}

