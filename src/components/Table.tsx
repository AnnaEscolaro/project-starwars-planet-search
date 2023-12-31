import { useEffect, useState, useContext } from 'react';
import { PlanetType, AppliedFilterType } from '../types';
import PlanetContext from '../context/PlanetContext';

function Table() {
  const [planets, setPlanets] = useState<PlanetType[]>([]);
  const [filterOptions, setFilterOptions] = useState([
    'population',
    'orbital_period',
    'diameter',
    'rotation_period',
    'surface_water',
  ]);
  const [column, setColumn] = useState(filterOptions[0]);
  const [operator, setOperator] = useState('maior que');
  const [number, setNumber] = useState('0');
  const [appliedFilters, setAppliedFilters] = useState<AppliedFilterType[]>([]);
  const [columnSort, setColumnSort] = useState('population');
  const [sort, setSort] = useState('');
  const [orderFilter, setOrderFilter] = useState({ order: { column: columnSort, sort } });
  const [isCheckedAsc, setIsCheckedAsc] = useState(false);
  const [isCheckedDesc, setIsCheckedDesc] = useState(false);

  console.log(sort);
  console.log(columnSort);
  console.log(orderFilter);
  console.log(isCheckedAsc);
  console.log(isCheckedDesc);
  console.log(planets);

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
    setFilterOptions(filterOptions.filter((filterOption) => filterOption !== column));
    setColumn(filterOptions[1]);
    setAppliedFilters([...appliedFilters, {
      column,
      operator,
      number,
    }]);

    if (column !== filterOptions[0]) {
      setColumn(filterOptions[0]);
    }
  };

  const handleRemoveFilter = (filter: AppliedFilterType) => {
    setFilterOptions([...filterOptions, filter.column]);
    setColumn(filterOptions[0]);
    const filtersAfterDeletion = appliedFilters
      .filter((appliedFilter) => appliedFilter.column !== filter.column);
    setAppliedFilters(filtersAfterDeletion);

    if (filtersAfterDeletion.length === 0) {
      setPlanets(planetsContext);
      setFilterOptions([
        'population',
        'orbital_period',
        'diameter',
        'rotation_period',
        'surface_water',
      ]);
      setAppliedFilters([]);
    }

    if (filtersAfterDeletion.length > 0) {
      const planetsToFilter = planetsContext;
      setPlanets(planetsToFilter);
      filtersAfterDeletion.forEach((appliedFilter) => {
        if (appliedFilter.operator === 'maior que') {
          const filteredContextPlanet = planetsToFilter
            .filter((planet: PlanetType) => Number(planet[appliedFilter
              .column as keyof PlanetType])
            > Number(appliedFilter.number));
          setPlanets(filteredContextPlanet);
        }
        if (appliedFilter.operator === 'menor que') {
          setPlanets(planetsToFilter
            .filter((planet: PlanetType) => Number(planet[appliedFilter
              .column as keyof PlanetType])
              < Number(appliedFilter.number)));
        }
        if (appliedFilter.operator === 'igual a') {
          setPlanets(planetsToFilter
            .filter((planet: PlanetType) => Number(planet[appliedFilter
              .column as keyof PlanetType])
              === Number(appliedFilter.number)));
        }
      });
    }
  };

  const handleRemoveFiltersClick = () => {
    setPlanets(planetsContext);
    setFilterOptions([
      'population',
      'orbital_period',
      'diameter',
      'rotation_period',
      'surface_water',
    ]);
    setAppliedFilters([]);
  };

  const handleChangeFilter = (e: React.FormEvent<HTMLSelectElement>) => {
    console.log(setColumnSort(e.target.value));
  };

  const handleChangeAsc = () => {
    setSort('ASC');
    if (isCheckedAsc) {
      setIsCheckedAsc(false);
    } else {
      setIsCheckedAsc(true);
    }
  };

  const handleChangeDesc = () => {
    setSort('DESC');
    if (isCheckedDesc) {
      setIsCheckedDesc(false);
    } else {
      setIsCheckedDesc(true);
    }
  };

  const handleClickSort = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    e.preventDefault();
    const planetsToSort = planets;
    if (sort === 'ASC') {
      const sortedPlanets = planetsToSort.sort((a, b) => {
        return Number(a[orderFilter
          .order.column as keyof PlanetType]) > Number(b[orderFilter
          .order.column as keyof PlanetType])
          ? 1 : -1;
      });
      setPlanets([...sortedPlanets]);
    }
    if (sort === 'DESC') {
      const sortedPlanets = planetsToSort.sort((a, b) => {
        return Number(b[orderFilter
          .order.column as keyof PlanetType]) < Number(a[orderFilter
          .order.column as keyof PlanetType])
          ? 1 : -1;
      });
      setPlanets([...sortedPlanets]);
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
          {
            filterOptions.map((filterOption, index) => (
              <option key={ index }>{ filterOption }</option>
            ))
          }
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
        <button
          data-testid="button-remove-filters"
          onClick={ handleRemoveFiltersClick }
        >
          Remover todas filtragens
        </button>
      </div>
      {
        appliedFilters.map((appliedFilter) => (
          <span data-testid="filter" key={ appliedFilter.column }>
            <p>
              {
              `${appliedFilter.column} ${appliedFilter.operator} ${appliedFilter.number}`
              }
            </p>
            <button onClick={ () => handleRemoveFilter(appliedFilter) }>
              Remover Filtro
            </button>
          </span>
        ))
      }
      <div id="filter-sort">
        <select data-testid="column-sort" onChange={ handleChangeFilter }>
          <option>population</option>
          <option>orbital_period</option>
          <option>diameter</option>
          <option>rotation_period</option>
          <option>surface_water</option>
        </select>
        <input
          type="radio"
          value="ASC"
          data-testid="column-sort-input-asc"
          defaultChecked={ isCheckedAsc }
          onChange={ handleChangeAsc }
        />
        Ascendente
        <input
          type="radio"
          value="DESC"
          data-testid="column-sort-input-desc"
          defaultChecked={ isCheckedDesc }
          onChange={ handleChangeDesc }
        />
        Descendente
        <button
          data-testid="column-sort-button"
          onClick={ handleClickSort }
        >
          Ordenar
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
              <td data-testid="planet-name">{ planet.name }</td>
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
