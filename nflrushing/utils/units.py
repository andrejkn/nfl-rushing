def parse_yards(yds: str) -> (int, bool):
    # remove comma
    yds = yds.replace(',', '')

    yds_parts = yds.split('T')

    return yds_parts[0], len(yds_parts) > 1
