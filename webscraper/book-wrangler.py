import requests
from bs4 import BeautifulSoup
import re
import pymongo
import dns

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


testURL = "https://www.goodreads.com/book/show/136251.Harry_Potter_and_the_Deathly_Hallows"
#print(getRelatedBooks(testURL))
#print(parseGoodReadsPage(testURL))


###################################################BOOK COLLECTION FUNCTIONS #############################################################

#get connection to Books collection
def connectToStaticDB():
  client = pymongo.MongoClient("mongodb+srv://admin:admin@cluster0-ieve0.mongodb.net/test?retryWrites=true")
  return client["Static_Data"]
def connectToBookCollection():
  return connectToStaticDB()["Books"]
#test print the first entry in book collection
#print(connectToBookCollection().find_one())


#insert dict-formatted book data into book collection
def insertIntoBookCollection(bookCollection,newEntry):
  bookCollection.insert_one(newEntry)
#test insert into database
'''
bookCollection = connectToBookCollection()
newEntry = parseGoodReadsPage(testURL)
insertIntoBookCollection(bookCollection,newEntry)
'''

#check if book is already in database
def bookAlreadyFound(bookCollection,titleToCheck,authorToCheck):
  query = {"Title":titleToCheck, "Author":authorToCheck}
  result = bookCollection.find_one(query)
  print(result)
  return False if (result == None) else True
#test if found harry potter and deathly hallows
'''
bookCollection = connectToBookCollection()
newEntry = parseGoodReadsPage(testURL)
isFound = bookAlreadyFound(bookCollection,newEntry['Title'],newEntry['Author'])
print(isFound)
'''

################################################FOUND-URL COLLECTION FUNCTIONS#############################################################

#get connection to Found-URLs collection
def connectToFoundUrlsCollection():
  return connectToStaticDB()["Found_URLs"]
#test print
#print(connectToFoundUrlsCollection().find_one())


#insert dict-formatted related-to-current-book URLs into collection of found URLs
#assumed input will always be list of entries - from output of getRelatedBooks()
def insertIntoFoundUrlsCollection(foundUrlsCollection,newEntries):
  foundUrlsCollection.insert_many(newEntries)
#test with harry potter
'''
listOfUrls = getRelatedBooks(testURL)
foundUrlsCollection = connectToFoundUrlsCollection()
insertIntoFoundUrlsCollection(foundUrlsCollection,listOfUrls)
'''

#removes and returns a url from list of found URLs
#will remove all duplicates when it pops
def popUrlFromCollection(foundUrlsCollection):
  url = foundUrlsCollection.find_one()
  foundUrlsCollection.delete_many({'URL':url['URL']})
  return url
#test
'''
foundUrlsCollection = connectToFoundUrlsCollection()
print(popUrlFromCollection(foundUrlsCollection))
'''

print(parseGoodReadsPage(testURL))