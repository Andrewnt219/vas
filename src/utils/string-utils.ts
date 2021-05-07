export const sortAlphabet = (a: string, b: string, ignoreCase = true) => {
  if (ignoreCase) {
    a = a.toUpperCase();
    b = b.toUpperCase();
  }

  if (a < b) {
    return -1;
  }

  if (a > b) {
    return 1;
  }

  return 0;
};
