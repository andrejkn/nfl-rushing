# The Rush App

### Understanding the data
In this repo is the file [`rushing.json`](/rushing.json). It contains data about NFL players' rushing statistics. Each entry contains the following information
* `Player` (Player's name)
* `Team` (Player's team abreviation)
* `Pos` (Player's postion)
* `Att/G` (Rushing Attempts Per Game Average)
* `Att` (Rushing Attempts)
* `Yrds` (Total Rushing Yards)
* `Avg` (Rushing Average Yards Per Attempt)
* `Yds/G` (Rushing Yards Per Game)
* `TD` (Total Rushing Touchdowns)
* `Lng` (Longest Rush -- a `T` represents a touchdown occurred)
* `1st` (Rushing First Downs)
* `1st%` (Rushing First Down Percentage)
* `20+` (Rushing 20+ Yards Each)
* `40+` (Rushing 40+ Yards Each)
* `FUM` (Rushing Fumbles)

##### The App
This app is able to do the following things:
1. Displays a table with the contents of `rushing.json`
2. The user is able to sort the players by _Total Rushing Yards_, _Longest Rush_ and _Total Rushing Touchdowns_
3. The user is able to filter by the player's name
4. The user is able to download the sorted/filtered data as a CSV


### Installation and running this solution
To run this app in your local environment using Docker.
If you don't have Docker installed already please visit their [installation page](https://docs.docker.com/install/) for more details.

Once you have Docker installed and cloned this repo locally,
you can run this app in a container by following these steps:

* Clone this repository:
```bash
git clone git@github.com:andrejkn/nfl-rushing.git
```

* Change directory to the location of the cloned repository:
```bash
cd ~/nfl-rush
```

* Run the app in a docker container:
```bash
docker-compose up -d
```

* Open the app in your browser:
[http://localhost:8000](http://localhost:8000)
