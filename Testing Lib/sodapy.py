
import pandas as pd
import urllib

query = ("https://data.detroitmi.gov/OData.svc/b4hw-v6w2.json?"
         )

raw_data = pd.read_json(query)
print raw_data
