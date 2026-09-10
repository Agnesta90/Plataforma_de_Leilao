import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { createBrowserRouter, RouterProvider } from 'react-router'
import Pagina_Card from './pages/pagina_card.jsx'
import Login from './pages/login.jsx'
import Perfil from './pages/perfil.jsx'
import Leilao from './pages/Leilao.jsx'
import Cadastro from './pages/CadastroProduc.jsx'
import Pesquisa from './pages/pesquisar.jsx'
import Carrinho from './pages/CarrinhoMobile.jsx'

const router = createBrowserRouter([
    {
      path:'/',
      element: <App />,
    },
    {
      path:'/pagina-card',
      element: <Pagina_Card/>,
    },
    {
      path:'/login',
      element: <Login/>,
    },
    {
      path:'/perfil',
      element: <Perfil/>,
    },
    {
      path:'/leilao',
      element: <Leilao/>,
    },
    {
      path:'/cadastro',
      element: <Cadastro/>,
    },
    {
      path:'/pesquisa',
      element: <Pesquisa/>,
    },
    {
      path:'/carrinho',
      element: <Carrinho/>,
    }
  ],
  {
    basename: '/Plataforma_de_Leilao/',
  }
)
createRoot(document.getElementById('root')).render(
  <StrictMode>
   <RouterProvider router={router}></RouterProvider>
  </StrictMode>,
)