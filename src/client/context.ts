import { createContext } from 'react';
import { CharacterType } from '../../GlobalStyle';
import { SurfaceType } from '../types';

export const CharacterContext = createContext<{character: CharacterType, surface: SurfaceType}>({character: 'sber', surface: 'mobile'})