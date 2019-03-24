import pymongo
import dns

################################################### BOOK COLLECTION FUNCTIONS #############################################################

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