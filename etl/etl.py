
import os

import pandas as pd

from sqlalchemy import create_engine

# Some of this might be best in a constants.py file and read here and in app.py
DATA_TABLES = [
    {
        'SOURCE_FILE': 'etl/housing_combined_data.csv',
        'TABLE_NAME': 'housing_data',
        'INDEX_COLUMN': 'date',
     }
]

# (https://help.heroku.com/ZKNTJQSK/
# why-is-sqlalchemy-1-4-x-not-connecting-to-heroku-postgres)
TARGET_DATABASE_URL = (
    os.environ.get('DATABASE_URL')
    .replace('postgres://', 'postgresql://', 1)
    )

def read_source_csv(source_file, index_column):
    source_df = pd.read_csv(source_file, index_col=index_column)
    return source_df

def write_target(source_df, table_name, index_column):
    target_engine = create_engine(TARGET_DATABASE_URL)
    target_conn = target_engine.connect()
    source_df.to_sql(table_name, target_conn, if_exists='replace')

    # sqlalchemy will not detect table without PK. This seems to be the best
    # solution (https://stackoverflow.com/q/50469391)
    target_engine.execute(
        f'ALTER TABLE {table_name} ADD PRIMARY KEY ({index_column});')

if __name__ == '__main__':
    for t in DATA_TABLES:
        source_data = read_source_csv(t['SOURCE_FILE'], t['INDEX_COLUMN'])
        write_target(source_data, t['TABLE_NAME'], t['INDEX_COLUMN']) 

   
