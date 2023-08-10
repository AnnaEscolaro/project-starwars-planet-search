import { useEffect, useState } from 'react';
import fetchPlanets from '../api/fetch-planets';
import { PlanetType } from '../types';

function Table() {
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

  const planetKeys = Object.keys(planets[0]);

  return (
    <table>
      <thead>
        <tr>
          { planetKeys.map((planetKey, index) => (
            <th key={ index }>{ planetKey }</th>
          ))}
        </tr>
      </thead>
      <tbody>
        { planets.map((planet) => (
          <tr key={ planet.name }>
            <td>{ planet.name }</td>
            <td>{ planet.rotation_period }</td>
            <td>{ planet.orbital_period }</td>
            <td>{ planet.diameter }</td>
            <td>{ planet.climate }</td>
            <td>{ planet.gravity}</td>
            <td>{ planet.terrain }</td>
            <td>{ planet.surface_water }</td>
            <td>{ planet.population }</td>
            <td>{ planet.films }</td>
            <td>{ planet.created }</td>
            <td>{ planet.edited }</td>
            <td>{ planet.url}</td>
          </tr>
        )) }
      </tbody>
    </table>
  );
}

export default Table;
