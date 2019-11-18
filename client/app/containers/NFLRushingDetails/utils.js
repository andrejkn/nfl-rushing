export const formatQueryParams = (sortByState, playerName) => {
  const sortByParametersMap = {
    total_rushing_yards: 'TotalRushingYards',
    longest_rush: 'LongestRush',
    total_rushing_touchdowns: 'TotalRushingTouchdowns',
  };

  const sortByParameters = [
    'total_rushing_yards',
    'longest_rush',
    'total_rushing_touchdowns',
  ].reduce((acc, param) => (sortByState[param]
    ? [...acc, `order_by=${sortByParametersMap[param]}`] : acc),
  []);

  const playerNameParam = playerName ? [`player_name=${playerName}`] : [];

  const allParameters = [
    ...sortByParameters,
    ...playerNameParam,
  ].join('&');

  return allParameters.length > 0 ? `?${allParameters}` : '';
};
