const col70 = {
  headerStyleClass: 'header-col col70',
  columnStyleClass: 'col col70',
};

const col50 = {
  headerStyleClass: 'header-col col50',
  columnStyleClass: 'col col50',
};

const col200 = {
  headerStyleClass: 'header-col col200',
  columnStyleClass: 'col col200',
};

export default [{
  label: 'Player',
  key: 'name',
  ...col200,
}, {
  label: 'Team',
  key: 'team',
  ...col70,
}, {
  label: 'Pos',
  key: 'position',
  ...col50,
}, {
  label: 'Att/G',
  key: 'rushing_attempts_per_game_average',
  ...col70,
}, {
  label: 'Att',
  key: 'rushing_attempts',
  ...col50,
}, {
  label: 'Yds',
  key: 'total_rushing_yards',
  ...col50,
}, {
  label: 'Avg',
  key: 'rushing_average_yards_per_attempt',
  ...col50,
}, {
  label: 'Yds/G',
  key: 'rushing_yards_per_game',
  ...col70,
}, {
  label: 'TD',
  key: 'total_rushing_touchdowns',
  ...col50,
}, {
  label: 'Lng',
  key: 'longest_rush',
  ...col50,
}, {
  label: '1st',
  key: 'rushing_first_downs',
  ...col50,
}, {
  label: '1st%',
  key: 'rushing_first_down_percentage',
  ...col50,
}, {
  label: '20+',
  key: 'rushing_20_plus_yards_each',
  ...col50,
}, {
  label: '40+',
  key: 'rushing_40_plus_yards_each',
  ...col50,
}, {
  label: 'FUM',
  key: 'rushing_fumbles',
  ...col50,
}];
