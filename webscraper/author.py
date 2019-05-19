import requests
from bs4 import BeautifulSoup
import re

class Author:
  def __init__(self, name, description, birthDate, deathDate, imgLink, genres):
    self.name = name
    self.description = description
    self.birthDate = birthDate
    self.deathDate = deathDate
    self.imgLink = imgLink
    self.genres = genres

  def __str__(self):
    attributes = vars(self)
    return (", ".join("%s: %s" % attr for attr in attributes.items()))

  def asDict(self):
    return {
      'Name':self.name,
      'Description':self.description,
      'Birth_Date':self.birthDate,
      'Death_Date':self.deathDate,
      'Image_Link':self.imgLink,
      'Genres':self.genres
    }
 
def getPage(url):
  try:
    req = requests.get(url)
    req.raise_for_status()
    return BeautifulSoup(req.text, 'html.parser')
  except requests.exceptions.HTTPError as errh:
    print ("Http Error:",errh)
  except requests.exceptions.ConnectionError as errc:
    print ("Error Connecting:",errc)
  except requests.exceptions.Timeout as errt:
    print ("Timeout Error:",errt)
  except requests.exceptions.RequestException as err:
    print ("!!!:Something Else",err)

def parseGoodReadsPage(url):
  bs = getPage(url)
  #title
  name = bs.find("h1",{"class":"authorName"}).text.strip()
  
  
  #description
  description = ""
  try:
    descriptionDiv = bs.find("div",{"class":"aboutAuthorInfo"})
    if descriptionDiv != None:
      description = descriptionDiv.find("span",{"style":"display:none"})
      if description != None:
        description = description.text
      else:
        description = descriptionDiv.find("span",{}).text
  except:
    print(f"Unexpected error while scraping description for [{name}]")
  
  #birthdate
  birthDate = ""
  try:
    birthDate = bs.find("div",{"itemprop":"birthDate"}).text.strip()
  except:
    print(f"birthDate tag was not found for [{name}]")

  #deathdate
  deathDate = ""
  try:
    deathDate = bs.find("div",{"itemprop":"deathDate"}).text.strip()
  except:
    print(f"deathDate tag was not found for [{name}]")

  #ImageLink
  imgLink = ""
  try:
    imgLink =  imgLink = bs.find("img",{"itemprop":"image"})['src']
  except:
    print(f"Image link was not found for [{name}]")

  #Genres
  genres = []
  try:
    genres =  getGenres(url)
  except:
    print(f"Genres were not found for [{name}]")

  return Author(name, description, birthDate, deathDate, imgLink,genres).asDict()

def getGenres(url):
  genresList = []
  bs = getPage(url)
  rightContainer = bs.find("div",{"class","rightContainer"})
  for link in rightContainer.find_all('a', href=re.compile('^(/genres/)')):
    genresList.append(link.text)
  return genresList