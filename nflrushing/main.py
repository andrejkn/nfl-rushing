from nflrushing import create_app

app = create_app()


@app.get("/")
def read_root():
    return {"Hello": "World"}
