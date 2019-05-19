import requests
from bs4 import BeautifulSoup
import re

class Book:
  def __init__(self, title, authors, description, isbns, publishDate, publisher, tags, imgLink, series, pages):
    self.title = title
    self.authors = authors
    self.description = description
    self.isbns = isbns
    self.publishDate = publishDate
    self.publisher = publisher
    self.tags = tags
    self.imgLink = imgLink
    self.series = series
    self.pages = pages

  def __str__(self):
    attributes = vars(self)
    return (", ".join("%s: %s" % attr for attr in attributes.items()))

  def asDict(self):
    return {
      'Title':self.title,
      'Author':self.authors,
      'Description':self.description,
      'ISBN':self.isbns,
      'Publish Date':self.publishDate,
      'Publisher':self.publisher,
      'Tags':self.tags,
      'Image_Link':self.imgLink,
      'Series':self.series,
      'Pages':self.pages
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
  title = bs.find("h1",{"id":"bookTitle"}).text.strip()
  
  #authors
  authors = []
  for author in bs.find_all("a",{"class":"authorName"}):
    authors.append(author.text)
  
  #description
  description = ""
  try:
    descriptionDiv = bs.find("div",{"id":"description"})
    if descriptionDiv != None:
      description = descriptionDiv.find("span",{"style":"display:none"})
      if description != None:
        description = description.text
      else:
        description = bs.find("div",{"id":"description"}).find("span",{}).text
  except:
    print(f"Unexpected error while scraping description for [{title}]")
  
  #ISBN
  isbn = ""
  try:
    isbn = bs.find("span",{"itemprop":"isbn"}).text.strip()
  except:
    print(f"ISBN tag was not found for [{title}]")

  #Publish Info
  publishDate = ""
  publisher = ""
  try:
    publishInfo = processPublishInfo(bs.find("div",{"id":"details"}).find_all("div",{"class":"row"})[1].text.strip())
    publishDate = publishInfo[0]
    publisher = publishInfo[1]
  except:
    print(f"Publish info tag was not found for [{title}]")

  #Tags
  tags = []
  try:
    for tag in bs.find_all("a",{"class":"actionLinkLite bookPageGenreLink"}):
      tags.append(tag.text)
  except:
    print(f"Tags tag was not found for [{title}]")
  
  #Image Link
  imgLink = ""
  try:
    imgLink = bs.find("img",{"id":"coverImage"})['src']
  except:
    print(f"Image link was not found for [{title}]")

  #Series
  series = ""
  try:
    series = bs.find("h2",{"id":"bookSeries"}).text.strip()[1:-4]
  except:
    print(f"Series tag was not found for [{title}]")

  #Number of Pages
  pages = ""
  try:
    pages = bs.find("span",{"itemprop":"numberOfPages"}).text.strip()
  except:
    print(f"Page number tag was not found for [{title}]")
  
  return Book(title, authors, description, isbn, publishDate, publisher, tags, imgLink, series, pages).asDict()

#get list of related books in mongodb friendly dict-format
def getRelatedBooks(url):
  listOfUrls = []
  bs = getPage(url)
  for carousel in bs.find_all("div",{"class":"bookCarousel"}):
    for link in carousel.find_all('a', href=re.compile('^(https://www.goodreads.com/book/show/)')):
      listOfUrls.append({'URL':link['href']})
  return listOfUrls

def stripEmptySpaceBetweenCharacters(str):
  res = ""
  for char in str:
    if char != '\n' and char != '\t':
      res = res + char
  return res

def processPublishInfo(str):
  arr = str.split("by")
  publishDate = arr[0].split("Published")[1].strip()
  publisher = arr[1].strip()
  if '\n' in publisher:
    publisher = publisher.split('\n')[0]
  return [publishDate, publisher]

def getAuthorUrls(bookUrl):
  bs = getPage(bookUrl)
  authorUrlList = []
  for authorUrl in bs.find_all("a",{"class":"authorName"}):
    authorUrlList.append(authorUrl["href"])
  return authorUrlList