const parseIsFavourite = (favorite) => {
  if (favorite === 'true') return true;
  if (favorite === 'false') return false;
  return;
};

const parseContactType = (type) => {
  const isString = typeof type === 'string';
  if (!isString) return;

  const isType = (type) => ['personal', 'home'].includes(type);
  if (isType(type)) return type;
};

export const parseContactsFilters = (query) => {
  const { isFavourite, contactType } = query;

  const parseFavorite = parseIsFavourite(isFavourite);
  const parseType = parseContactType(contactType);

  return {
    isFavourite: parseFavorite,
    parseType: parseType,
  };
};
