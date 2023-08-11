import { useEffect, useState, useContext } from 'react';
import { PlanetType } from '../types';
import PlanetContext from '../context/PlanetContext';

function Table() {
  const [planets, setPlanets] = useState<PlanetType[]>([]);
  const [column, setColumn] = useState('population');
  const [operator, setOperator] = useState('maior que');
  const [number, setNumber] = useState('0');

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

  const handleClick = () => {
    if (operator === 'maior que') {
      const filteredPlanets = planets
        .filter((planet) => Number(planet[column as keyof PlanetType]) > Number(number));
      setPlanets(filteredPlanets);
    }
    if (operator === 'menor que') {
      const filteredPlanets = planets
        .filter((planet) => Number(planet[column as keyof PlanetType]) < Number(number));
      setPlanets(filteredPlanets);
    }
    if (operator === 'igual a') {
      const filteredPlanets = planets
        .filter((planet) => Number(planet[column as keyof PlanetType])
          === Number(number));
      setPlanets(filteredPlanets);
    }
  };

  return (
    <>
      <div id="filter-inputs">
        <input
          type="text"
          placeholder="Nome do Planeta"
          className="input-text"
          data-testid="name-filter"
          onChange={ handleChange }
        />
        <select
          data-testid="column-filter"
          onChange={ (e) => setColumn(e.target.value) }
        >
          <option>population</option>
          <option>orbital_period</option>
          <option>diameter</option>
          <option>rotation_period</option>
          <option>surface_water</option>
        </select>
        <select
          data-testid="comparison-filter"
          onChange={ (e) => setOperator(e.target.value) }
        >
          <option>maior que</option>
          <option>menor que</option>
          <option>igual a</option>
        </select>
        <input
          type="number"
          value={ number }
          data-testid="value-filter"
          onChange={ (e) => setNumber(e.target.value) }
        />
        <button
          data-testid="button-filter"
          onClick={ handleClick }
        >
          Adicionar Filtro
        </button>
      </div>
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
