export const calcPaginationData = (page, perPage, total) => {
  const totalPages = Math.ceil(total / perPage);
  const hasPreviousPage = page > 1;
  const hasNextPage = page < totalPages;
  return {
    totalItems: total,
    totalPages,
    hasPreviousPage,
    hasNextPage,
    perPage: perPage,
    page: page,
  };
};
