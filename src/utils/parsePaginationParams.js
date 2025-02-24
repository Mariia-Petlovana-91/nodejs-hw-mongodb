const parseNumber = (number, defaultValue) => {
  if (typeof number !== 'string') return defaultValue;

  const parseNumber = parseInt(number);
  if (Number.isNaN(parseNumber)) return defaultValue;

  return parseNumber;
};

export const parsePaginationParams = ({ page, perPage }) => {
  const parsePage = parseNumber(page, 1);
  const parsePerPage = parseNumber(perPage, 10);
  return {
    page: parsePage,
    perPage: parsePerPage,
  };
};
