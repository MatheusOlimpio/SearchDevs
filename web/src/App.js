import React, { useState, useEffect } from 'react';
import Api from "./services/api";


import './global.css';
import './App.css';
import './Sidebar.css';
import './Main.css';

import DevItem from "./components/DevItem/index";
import DevForm from "./components/DevForm/index";

// Componente = bloco isolado de HTML, CSS e js, que nao interfere no restante da aplicação
// Propriedade = Informações que um componente pai passa para o componente filho
// Estado = Informações mantidas pelo componente(imutabilidade)

function App() {
  const [devs, setDevs] = useState([]);

  useEffect(() => {
    async function loadDevs(){
      const response = await Api.get('/devs');
        setDevs(response.data);
    }
    loadDevs();
  }, []);
  
  async function handleAddDev(devData){
    const response = await Api.post('/devs', devData);

    setDevs([...devs, response.data]);
  }

  return (
    <div id="app">
      <aside>
        <strong>Register</strong>
        <DevForm onSubmit={handleAddDev}/>
      </aside>
      <main>
        <ul>
          { devs.map(dev => {
            return (
              <DevItem key={dev._id} dev={dev}/>
            );
          })}
        </ul>
      </main>
    </div>
  );
}

export default App;
