from enum import Enum
from fastapi import Query
from pydantic import BaseModel
from starlette.responses import Response
from typing import List
from sqlalchemy import desc

from nflrushing import create_app
from nflrushing.models.player_rushing import PlayerRushing as PlayerRushingDBModel
from nflrushing import db
from nflrushing.utils.common import dict_to_csv
from nflrushing.utils.units import merge_longest_rush_with_touchdown

app = create_app()


class PlayerRushing(BaseModel):
    pid: int
    name: str
    team: str
    position: str
    rushing_attempts_per_game_average: float
    rushing_attempts: int
    total_rushing_yards: int
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


class PlayerRushingResponse(BaseModel):
    total_items: int
    page_number: int = None
    items_per_page: int = None
    items: List[PlayerRushing]


class OrderByDirection(str, Enum):
    ascending = 'Ascending'
    descending = 'Descending'


def prepare_response(page_number: int,
                     items_per_page: int,
                     total_items: int,
                     player_name: str,
                     order_by_total_rushing_yards: OrderByDirection,
                     order_by_longest_rush: OrderByDirection,
                     order_by_total_rushing_touchdowns: OrderByDirection) -> PlayerRushingResponse:

    query = db.session.query(PlayerRushingDBModel)

    # calculate start and end indices of the items that will be returned
    start = page_number * items_per_page
    end = start + items_per_page

    # handle sorting
    if order_by_longest_rush is not None:
        query = query.order_by(
            desc(PlayerRushingDBModel.longest_rush) if
            order_by_longest_rush == OrderByDirection.descending else
            PlayerRushingDBModel.longest_rush)

    if order_by_total_rushing_touchdowns is not None:
        query = query.order_by(
            desc(PlayerRushingDBModel.total_rushing_touchdowns) if
            order_by_total_rushing_touchdowns == OrderByDirection.descending else
            PlayerRushingDBModel.total_rushing_touchdowns)

    if order_by_total_rushing_yards is not None:
        query = query.order_by(
            desc(PlayerRushingDBModel.total_rushing_yards) if
            order_by_total_rushing_yards == OrderByDirection.descending else
            PlayerRushingDBModel.total_rushing_yards)

    # handle filter by player_name
    if player_name:
        query = query.filter(PlayerRushingDBModel.name.ilike(f'%{player_name}%'))

    return PlayerRushingResponse(
        total_items=total_items,
        page_number=page_number,
        items_per_page=items_per_page,
        items=query[start:end]
    )


@app.get('/players_rushing', response_model=PlayerRushingResponse)
def players_rushing(page_number: int = None,
                    items_per_page: int = None,
                    player_name: str = None,
                    order_by_total_rushing_yards: OrderByDirection = None,
                    order_by_longest_rush: OrderByDirection = None,
                    order_by_total_rushing_touchdowns: OrderByDirection = None) -> PlayerRushingResponse:
    query = db.session.query(PlayerRushingDBModel)
    total_items = query.count()

    # if only page_number is specified
    # then return only 10 results by default
    if page_number is not None and items_per_page is None:
        return prepare_response(page_number, 10,
                                total_items, player_name,
                                order_by_total_rushing_yards,
                                order_by_longest_rush,
                                order_by_total_rushing_touchdowns)

    # if only items_per_page is specified
    # then default the page_number to 0
    elif page_number is None and items_per_page is not None:
        return prepare_response(0, items_per_page,
                                total_items, player_name,
                                order_by_total_rushing_yards,
                                order_by_longest_rush,
                                order_by_total_rushing_touchdowns)

    # if both page_number and items_per_page are not specified
    # then return all possible results (no pagination)
    elif page_number is None and items_per_page is None:
        return prepare_response(0, total_items,
                                total_items, player_name,
                                order_by_total_rushing_yards,
                                order_by_longest_rush,
                                order_by_total_rushing_touchdowns)
    else:
        return prepare_response(page_number, items_per_page,
                                total_items, player_name,
                                order_by_total_rushing_yards,
                                order_by_longest_rush,
                                order_by_total_rushing_touchdowns)


@app.get('/players_rushing/nfl_rushing_csv', responses={
    200: {
        'content': {'text/csv': {}},
        'description': 'Returns a CSV of players rushing.',
    }
})
def players_rushing_csv(player_name: str = None,
                        order_by_total_rushing_yards: OrderByDirection = None,
                        order_by_longest_rush: OrderByDirection = None,
                        order_by_total_rushing_touchdowns: OrderByDirection = None
                        ) -> Response:
    query = db.session.query(PlayerRushingDBModel)
    total_items = query.count()
    response = prepare_response(0, total_items,
                                total_items, player_name,
                                order_by_total_rushing_yards,
                                order_by_longest_rush,
                                order_by_total_rushing_touchdowns)

    header_mapping = {
        'name': 'Player',
        'team': 'Team',
        'position': 'Pos',
        'rushing_attempts_per_game_average': 'Att/G',
        'rushing_attempts': 'Att',
        'total_rushing_yards': 'Yds',
        'rushing_average_yards_per_attempt': 'Avg',
        'rushing_yards_per_game': 'Yds/G',
        'total_rushing_touchdowns': 'TD',
        'longest_rush': 'Lng',
        'rushing_first_downs': '1st',
        'rushing_first_down_percentage': '1st%',
        'rushing_20_plus_yards_each': '20+',
        'rushing_40_plus_yards_each': '40+',
        'rushing_fumbles': 'FUM'
    }

    dicts = [merge_longest_rush_with_touchdown(p.__dict__) for p in response.items]

    csv_data = dict_to_csv(header_mapping, dicts)

    return Response(
        content=csv_data,
        media_type='text/csv'
    )
