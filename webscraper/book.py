import requests
from bs4 import BeautifulSoup
import re

class Book:
  def __init__(self, title, authors, description, isbns, publisher, tags, imgLink):
    self.title = title
    self.authors = authors
    self.description = description
    self.isbns = isbns
    self.publisher = publisher
    self.tags = tags
    self.imgLink = imgLink

  def __str__(self):
    attributes = vars(self)
    return (", ".join("%s: %s" % attr for attr in attributes.items()))

  def asDict(self):
    return {
      'Title':self.title,
      'Author':self.authors,
      'Description':self.description,
      'ISBN':self.isbns,
      'Publisher':self.publisher,
      'Tags':self.tags,
      'Image_Link':self.imgLink
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
  title = bs.find("h1",{"id":"bookTitle"}).text.strip()
  authors = []
  for author in bs.find_all("a",{"class":"authorName"}):
    authors.append(author.text)
  description = bs.find("div",{"id":"description"}).find("span",{"style":"display:none"}).text
  isbns = bs.find("span",{"itemprop":"isbn"}).text.strip()
  publisher = bs.find("div",{"id":"details"}).find_all("div",{"class":"row"})[1].text.strip().split("by")[1].strip()
  tags = []
  for tag in bs.find_all("a",{"class":"actionLinkLite bookPageGenreLink"}):
    tags.append(tag.text)
  imgLink = bs.find("img",{"id":"coverImage"})['src']
  return Book(title, authors, description, isbns, publisher, tags,imgLink).asDict()

#get list of related books in mongodb friendly dict-format
def getRelatedBooks(url):
  listOfUrls = []
  bs = getPage(url)
  for carousel in bs.find_all("div",{"class":"bookCarousel"}):#.find_all('a', href=re.compile('^(https://www.goodreads.com/book/show/)')):
    for link in carousel.find_all('a', href=re.compile('^(https://www.goodreads.com/book/show/)')):
      listOfUrls.append({'URL':link['href']})
      #print(link['href'])
  return listOfUrls
