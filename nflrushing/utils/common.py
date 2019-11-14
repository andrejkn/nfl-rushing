def dict_to_csv(header_mapping: dict, dicts: [dict]):
    csv_header = ','.join(header_mapping.values()) + '\n'
    csv_data = '\n'.join([
        ','.join([str(d[k]) for k in header_mapping.keys()])
        for d in dicts
    ])
    return csv_header + csv_data
