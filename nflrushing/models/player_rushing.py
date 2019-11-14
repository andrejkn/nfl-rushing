from sqlalchemy import Column, String, Integer, Float, Boolean

from nflrushing import Base


class PlayerRushing(Base):
    __tablename__ = 'player_rushing'
    pid = Column(Integer, name='id', primary_key=True, autoincrement=True)
    name = Column(String(200))
    team = Column(String(50))
    position = Column(String(50))
    rushing_attempts_per_game_average = Column(Float)
    rushing_attempts = Column(Integer)
    total_rushing_yards = Column(Integer)
    rushing_average_yards_per_attempt = Column(Float)
    rushing_yards_per_game = Column(Float)
    total_rushing_touchdowns = Column(Integer)
    longest_rush = Column(Integer)
    longest_rush_touchdown = Column(Boolean)
    rushing_first_downs = Column(Integer)
    rushing_first_down_percentage = Column(Float)
    rushing_20_plus_yards_each = Column(Integer)
    rushing_40_plus_yards_each = Column(Integer)
    rushing_fumbles = Column(Integer)

    def __repr__(self):
        return f'<Player (id="{self.pid}", name="{self.name}")>'
