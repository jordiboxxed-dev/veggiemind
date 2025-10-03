import { Recipe } from '@/types';

const shuffle = (array: Recipe[]): Recipe[] => {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
};

const padArray = (arr: Recipe[], minLength: number): Recipe[] => {
  if (arr.length === 0) return [];
  let padded = [...arr];
  while (padded.length < minLength) {
    padded = padded.concat(arr);
  }
  return padded.slice(0, minLength);
};

export const generateMenuFromRecipes = (
  breakfastRecipes: Recipe[],
  otherRecipes: Recipe[]
): Record<string, { breakfast: Recipe; lunch: Recipe; dinner: Recipe }> => {
  if (breakfastRecipes.length === 0 || otherRecipes.length < 2) {
    const allRecipes = [...breakfastRecipes, ...otherRecipes];
    if (allRecipes.length < 3) return {};
    
    const paddedAll = padArray(allRecipes, 9);
    const shuffledAll = shuffle(paddedAll);
    return {
      Lunes: { breakfast: shuffledAll[0], lunch: shuffledAll[1], dinner: shuffledAll[2] },
      Martes: { breakfast: shuffledAll[3], lunch: shuffledAll[4], dinner: shuffledAll[5] },
      Miércoles: { breakfast: shuffledAll[6], lunch: shuffledAll[7], dinner: shuffledAll[8] },
      Jueves: { breakfast: shuffledAll[1], lunch: shuffledAll[3], dinner: shuffledAll[5] },
      Viernes: { breakfast: shuffledAll[2], lunch: shuffledAll[4], dinner: shuffledAll[6] },
      Sábado: { breakfast: shuffledAll[0], lunch: shuffledAll[7], dinner: shuffledAll[8] },
      Domingo: { breakfast: shuffledAll[3], lunch: shuffledAll[1], dinner: shuffledAll[4] },
    };
  }

  const paddedBreakfasts = padArray(breakfastRecipes, 7);
  const paddedOthers = padArray(otherRecipes, 14);

  const shuffledBreakfasts = shuffle(paddedBreakfasts);
  const shuffledOthers = shuffle(paddedOthers);

  return {
    Lunes: { breakfast: shuffledBreakfasts[0], lunch: shuffledOthers[0], dinner: shuffledOthers[1] },
    Martes: { breakfast: shuffledBreakfasts[1], lunch: shuffledOthers[2], dinner: shuffledOthers[3] },
    Miércoles: { breakfast: shuffledBreakfasts[2], lunch: shuffledOthers[4], dinner: shuffledOthers[5] },
    Jueves: { breakfast: shuffledBreakfasts[3], lunch: shuffledOthers[6], dinner: shuffledOthers[7] },
    Viernes: { breakfast: shuffledBreakfasts[4], lunch: shuffledOthers[8], dinner: shuffledOthers[9] },
    Sábado: { breakfast: shuffledBreakfasts[5], lunch: shuffledOthers[10], dinner: shuffledOthers[11] },
    Domingo: { breakfast: shuffledBreakfasts[6], lunch: shuffledOthers[12], dinner: shuffledOthers[13] },
  };
}