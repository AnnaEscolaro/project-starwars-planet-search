import { useEffect, useState, useContext } from 'react';
import { PlanetType } from '../types';
import PlanetContext from '../context/PlanetContext';

function Table() {
  const [planets, setPlanets] = useState<PlanetType[]>([]);

  const planetsContext = useContext(PlanetContext);

  useEffect(() => {
    setPlanets(planetsContext);
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const filteredPlanets = planets.filter((planet) => planet.name
      .includes(e.target.value));
    setPlanets(filteredPlanets);
    if (e.target.value.length === 0) {
      setPlanets(planetsContext);
    }
  };

  return (
    <>
      <input
        type="text"
        placeholder="Nome do Planeta"
        className="input-text"
        data-testid="name-filter"
        onChange={ handleChange }
      />
      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Rotation Period</th>
            <th>Orbital Period</th>
            <th>Diameter</th>
            <th>Climate</th>
            <th>Gravity</th>
            <th>Terrain</th>
            <th>Surface Water</th>
            <th>Population</th>
            <th>Films</th>
            <th>Created</th>
            <th>Edited</th>
            <th>URL</th>
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
    </>
  );
}

export default Table;
