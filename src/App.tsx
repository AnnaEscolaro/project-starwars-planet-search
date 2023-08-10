import React, { useState, useEffect } from 'react';
import './App.css';
import Table from './components/Table';
import PlanetContext from './context/PlanetContext';
import fetchPlanets from './api/fetch-planets';
import { PlanetType } from './types';

function App() {
  const [isLoading, setIsLoading] = useState(true);
  const [planets, setPlanets] = useState<PlanetType[]>([]);

  const getPlanets = async () => {
    const response = await fetchPlanets();
    setPlanets(response.results);
    setIsLoading(false);
  };

  const planetsWithoutResidents = planets
    .map((planet: PlanetType) => {
      delete planet.residents;
      return planet;
    });

  useEffect(() => {
    getPlanets();
    setPlanets(planetsWithoutResidents);
  }, []);

  if (isLoading) {
    return (<h1>Carregando...</h1>);
  }

  return (
    <PlanetContext.Provider value={ planets }>
      <Table />
    </PlanetContext.Provider>
  );
}

export default App;
