import { createContext } from 'react';
import { PlanetsArray } from '../types';

const PlanetContext = createContext([] as PlanetsArray);

export default PlanetContext;
