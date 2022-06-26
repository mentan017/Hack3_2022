import pycountry_convert
import pandas as pd
import sys
import math
allData = pd.read_csv('/content/allData_FINAL.csv')
def split(metric):
  global allData
  isMetric = (allData["Area"] == metric)
  newData = allData[isMetric]
  return newData
def turnIntoStrs(cEntry):
  area = cEntry["Area"][1]
  entry = "Area:" + str(area) + ","
  for i in range(1, len(cEntry["Variable Name"])):
    varName = str(cEntry["Variable Name"][i])
    varVal = cEntry["Value"][i]
    varVal = str(round(cEntry,2))
    entry += varName + ":" + varVal + ","
  return entry
def returnCountry(isoCode3):
  global allData
  allData.head()
  countryMap = pycountry_convert.map_country_alpha3_to_country_name()
  country = countryMap.get(isoCode3)
  # print(country)
  cEntry = split(country)
  print(cEntry.head(10))
  return turnIntoStrs(cEntry)
print(returnCountry("ATG"))