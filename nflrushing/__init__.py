import os

from fastapi import FastAPI
from fastapi_sqlalchemy import DBSessionMiddleware  # middleware helper
from fastapi_sqlalchemy import db  # an object to provide global access to a database session

from sqlalchemy.ext.declarative import declarative_base, declared_attr
from starlette.middleware.cors import CORSMiddleware

class CustomBase(object):
    # Generate __tablename__ automatically
    @declared_attr
    def __tablename__(cls):
        return cls.__name__.lower()


Base = declarative_base(cls=CustomBase)

origins = [
    "http://localhost:3000",
]


def create_app():
    app = FastAPI()

    sqlalchemy_db_env = 'SQLALCHEMY_DATABASE_URI'
    sqlalchemy_db_url = os.environ[sqlalchemy_db_env]

    app.add_middleware(
        DBSessionMiddleware,
        db_url=sqlalchemy_db_url,
    )

    app.add_middleware(
        CORSMiddleware,
        allow_origins=origins,
        allow_credentials=True,
        allow_methods=["*"],
        allow_headers=["*"],
    )

    return app

