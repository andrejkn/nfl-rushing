from fastapi import Query
from pydantic import BaseModel
from typing import List
from enum import Enum

from nflrushing import create_app
from nflrushing.models.player_rushing import PlayerRushing as PlayerRushingDBModel
from nflrushing import db

app = create_app()


class PlayerRushing(BaseModel):
    pid: int
    name: str
    team: str
    position: str
    rushing_attempts_per_game_average: float
    rushing_attempts: int
    total_rushing_yards: float
    rushing_average_yards_per_attempt: float
    rushing_yards_per_game: float
    total_rushing_touchdowns: float
    longest_rush: int
    longest_rush_touchdown: bool
    rushing_first_downs: int
    rushing_first_down_percentage: float
    rushing_20_plus_yards_each: int
    rushing_40_plus_yards_each: int
    rushing_fumbles: int

    class Config:
        orm_mode = True


class Response(BaseModel):
    total_items: int
    page_number: int
    items_per_page: int
    items: List[PlayerRushing]


class OrderBy(str, Enum):
    total_rushing_yards = 'TotalRushingYards'
    longest_rush = 'LongestRush'
    total_rushing_touchdowns = 'TotalRushingTouchdowns'


@app.get("/players_rushing", response_model=Response)
def players_rushing(page_number: int = 0,
                    items_per_page: int = None,
                    order_by: List[OrderBy] = Query([])) -> Response:
    query = db.session.query(PlayerRushingDBModel)

    total_items = query.count()

    # if items_per_page is None then all of the items will be returned
    items_per_page = total_items if items_per_page is None else items_per_page

    # calculate start and end indices of the items that will be returned
    start = page_number * items_per_page
    end = start + items_per_page

    # handle sorting
    if OrderBy.longest_rush in order_by:
        query = query.order_by(PlayerRushingDBModel.longest_rush)
    if OrderBy.total_rushing_touchdowns in order_by:
        query = query.order_by(PlayerRushingDBModel.total_rushing_touchdowns)
    if OrderBy.total_rushing_yards in order_by:
        query = query.order_by(PlayerRushingDBModel.total_rushing_yards)

    return Response(
        total_items=total_items,
        page_number=page_number,
        items_per_page=items_per_page,
        items=query[start:end]
    )
