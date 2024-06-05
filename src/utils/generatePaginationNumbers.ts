export const generatePagination = (currentPage: number, totalPages: number) => {
  //If totalPages is <=7 we show all pages number
  if (totalPages <= 7) {
    return Array.from({ length: totalPages }, (_, i) => i + 1);
  }

  // If current page is among the first 3 pages, show the first 3, suspense points and last 2 pages
  if (currentPage <= 3) {
    return [1, 2, 3, '...', totalPages - 1, totalPages];
  }

  //If current page is among the last 3 pages show the first 2 suspense points and last 3 pages
  if (currentPage >= totalPages - 2) {
    return [1, 2, '...', totalPages - 2, totalPages - 1, totalPages];
  }

  //if current page is in the middle, show first, suspense points current page and neighboors

  return [
    1,
    '...',
    currentPage - 1,
    currentPage,
    currentPage + 1,
    '...',
    totalPages,
  ];
};
