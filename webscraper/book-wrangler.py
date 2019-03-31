import book as Book
import collection as Collection
import time
import logging
logging.basicConfig(format='%(asctime)s %(message)s')

def mainLoop(bookCol, urlCol):
    #loop while we still have urls in url collection
    while not Collection.urlCollectionIsEmpty(urlCol):
        url = Collection.popUrlFromCollection(urlCol)['URL']
        print(f'Popping {url} from URL collection')
        print('Parsing...')
        newEntry = Book.parseGoodReadsPage(url)
        title = newEntry['Title']
        author = newEntry['Author']
        print('Succesfully parsed!')
        #check if entry already exists
        if Collection.bookAlreadyFound(bookCol, title, author):
            print(f'[{title} by {author}] was already found in our Book collection - skipping...')
            continue
        else:
            #insert book into book collection
            print(f'Inserting [{title} by {author}] into Book collection...')
            Collection.insertIntoBookCollection(bookCol,newEntry)
            print('Successfully inserted!')

            #find related books
            print('Adding related book URLs...')
            relatedUrls = Book.getRelatedBooks(url)
            Collection.insertIntoFoundUrlsCollection(urlCol,relatedUrls)
            print('Successfully added related URLs!')
        time.sleep(10)


bookCol = Collection.connectToBookCollection()
urlCol = Collection.connectToFoundUrlsCollection()
mainLoop(bookCol,urlCol)