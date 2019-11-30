export const formatQueryParams = (sortByState, playerName, pageNumber, itemsPerPage) => {
  const sortByParametersMap = {
    total_rushing_yards: 'order_by_total_rushing_yards',
    longest_rush: 'order_by_longest_rush',
    total_rushing_touchdowns: 'order_by_total_rushing_touchdowns',
  };

  const sortByParameters = [
    'total_rushing_yards',
    'longest_rush',
    'total_rushing_touchdowns',
  ].reduce((acc, param) => (sortByState[param]
    ? [...acc, `${sortByParametersMap[param]}=${sortByState[param]}`] : acc),
  []);

  const playerNameParam = playerName ? [`player_name=${playerName}`] : [];
  const pageNumberParam = pageNumber ? [`page_number=${pageNumber}`] : [];
  const itemsPerPageParam = itemsPerPage ? [`items_per_page=${itemsPerPage}`] : [];

  const allParameters = [
    ...sortByParameters,
    ...playerNameParam,
    ...pageNumberParam,
    ...itemsPerPageParam,
  ].join('&');

  return allParameters.length > 0 ? `?${allParameters}` : '';
};
