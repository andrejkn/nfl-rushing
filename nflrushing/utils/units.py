def parse_yards(yds: str) -> (int, bool):
    """
    This function handles and cleans up yards string:
    - it removes commas: 12,234 -> 12234
    - extracts the number: 12234T -> 12234
    - returns a tuple of the number and a boolean for TD:
          - 12,234T -> (12234, True)
          - 12,234  -> (12234, False)
    Note: will be used to handle Total Rushing Yards (YDS) which sometimes contains commas AND
          to handle Longest Rush (Lng) which sometimes contains a 'T'
    :param yds: Yards string
    :return: a tuple of yards and a boolean (True if it contains 'T', False otherwise)
    """
    # remove comma
    yds = yds.replace(',', '')

    yds_parts = yds.split('T')

    return int(yds_parts[0]), len(yds_parts) > 1


def merge_longest_rush_with_touchdown(d: dict) -> dict:
    """
    Merges longest_rush and longest_rush_touchdown into one key-value pair:
    {
        'longest_rush': 12234,
        'longest_rush_touchdown': True,
        ...
    }
    Will be transformed into ->
    {
        'longest_rush': '12234T',
    }

    :param d: a dictionary which contains longest_rush and longest_rush_touchdown
    :return: a dictionary which has longest_rush and longest_rush_touchdown combined
    """
    d['longest_rush'] = str(d['longest_rush']) + ('T' if d['longest_rush_touchdown'] else '')
    return d
