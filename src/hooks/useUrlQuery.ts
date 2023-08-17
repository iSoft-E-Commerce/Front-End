import { useRouter } from 'next/router';

export const useUrlQuery = () => {
  const router = useRouter();
  //@ts-ignore
  const handleFilterChange = (event, filterType, filterValue) => {
    const currentFilters = { ...router.query };
    if (currentFilters[filterType]) {
      //@ts-ignore
      const currentFilterValues = currentFilters[filterType].split(',');
      if (currentFilterValues.includes(filterValue)) {
        const updatedFilterValues = currentFilterValues.filter(
          //@ts-ignore
          (value) => value !== filterValue,
        );
        if (updatedFilterValues.length > 0) {
          currentFilters[filterType] = updatedFilterValues.join(',');
        } else {
          delete currentFilters[filterType];
        }
      } else {
        const updatedFilterValues = [...currentFilterValues, filterValue];
        currentFilters[filterType] = updatedFilterValues.join(',');
      }
    } else {
      currentFilters[filterType] = filterValue;
    }
    if (Object.keys(currentFilters).some((key) => key !== 'page')) {
      currentFilters['page'] = '1';
    }
    let queryStringUpdated = '';
    let isFirstParam = true;
    Object.keys(currentFilters).forEach((key) => {
      const value = currentFilters[key];
      if (value !== null && value !== undefined && value !== '') {
        if (!isFirstParam) {
          queryStringUpdated += '&';
        }
        queryStringUpdated += `${encodeURIComponent(key)}${
          //@ts-ignore
          currentFilters[key] !== true ? '=' + encodeURIComponent(value) : ''
        }`;
        isFirstParam = false;
      }
    });

    router.push(`?${queryStringUpdated}`);
  };
  return handleFilterChange;
};
