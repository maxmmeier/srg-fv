import { Dispatch, SetStateAction } from 'react';

import MuiPagination from '@mui/material/Pagination';

export function Pagination({
  currentPage,
  setCurrentPage,
  maxPage,
}: {
  currentPage: number;
  setCurrentPage: Dispatch<SetStateAction<number>>;
  maxPage: number;
}) {
  const handleChange = (_event: React.ChangeEvent<unknown>, value: number) => {
    setCurrentPage(value);
  };

  return (
    <MuiPagination
      count={maxPage}
      page={currentPage}
      color='primary'
      showFirstButton
      showLastButton
      onChange={handleChange}></MuiPagination>
  );
}
