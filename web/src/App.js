import React, {useEffect, useState} from 'react';
import api from './services/api'

import DevForm from './components/DevForm'
import DevItem from './components/DevItem'

import './global.css';
import './App.css';
import './Sidebar.css'
import './Main.css'

// Componete = funcao que retorna html, css ou JS (primeira letra maiuscula) [manter isolado]
// Propriedade =  (atributos) props -> props.title. Informacoes que o componente PAI passa para o componente FILHO
// Estado = Informacao que o componente vai manipular. Informacoes mantidas pelo componente (Lembrar: Imutabilidade)

function App() {
  const [devs, setDevs] = useState([]);



  useEffect(() => {
    async function loadDevs(){
      const response = await api.get('/devs');

      setDevs(response.data);
    }

    loadDevs();
  }, []);

  async function handleAddDev(data) {
    
    //pode usar o fetch

    const response = await api.post('/devs', data);



    setDevs([...devs, response.data]);
  }

  return (
    <div id="app">
      <aside>
        <strong>Cadastrar</strong>
        <DevForm onSubmit={handleAddDev}/>
      </aside>
      <main>
        <ul>
          {devs.map(dev => (            
            <DevItem key={dev._id} dev={dev}/>
          ))}
        </ul>
      </main>


    </div>
  );
}

export default App;
