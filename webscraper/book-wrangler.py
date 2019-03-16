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
 
def getPage(url):
  req = requests.get(url)
  return BeautifulSoup(req.text, 'html.parser')

def parseGoodReadsPage(url):
  bs = getPage(url)
  title = bs.find("h1",{"id":"bookTitle"}).text.strip()
  authors = []
  for author in bs.find_all("a",{"class":"authorName"}):
    authors.append(author.text)
  description = ""
  isbns = ""
  publisher = ""
  tags = ""
  imgLink = bs.find("img",{"id":"coverImage"})['src']
  return Book(title, authors, description, isbns, publisher, tags,imgLink)

def getRelatedBooks(url):
  bs = getPage(url)
  for carousel in bs.find_all("div",{"class":"bookCarousel"}):#.find_all('a', href=re.compile('^(https://www.goodreads.com/book/show/)')):
    for link in carousel.find_all('a', href=re.compile('^(https://www.goodreads.com/book/show/)')):
      print(link['href'])

getRelatedBooks("https://www.goodreads.com/book/show/136251.Harry_Potter_and_the_Deathly_Hallows")

