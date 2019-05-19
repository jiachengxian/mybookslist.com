import book as Book
import author as Author
import collection as Collection
import time
import logging
logging.basicConfig(format='%(asctime)s %(message)s')

def mainLoop(bookCol, authorCol, urlCol):
    #loop while we still have urls in url collection
    while not Collection.urlCollectionIsEmpty(urlCol):
        url = Collection.popUrlFromCollection(urlCol)['URL']
        print(f'Popping {url} from URL collection')
        print('Parsing...')
        newBookEntry = Book.parseGoodReadsPage(url)
        title = newBookEntry['Title']
        author = newBookEntry['Author']
        print('Succesfully parsed!')
        #check if entry already exists
        if Collection.bookAlreadyFound(bookCol, title, author):
            print(f'[{title} by {author}] was already found in our Book collection - skipping...')
            continue
        else:
            #insert book into book collection
            print(f'Inserting [{title} by {author}] into Book collection...')
            Collection.insertIntoBookCollection(bookCol,newBookEntry)
            print('Successfully inserted!')

            #find related books
            print('Adding related book URLs...')
            relatedUrls = Book.getRelatedBooks(url)
            Collection.insertIntoFoundUrlsCollection(urlCol,relatedUrls)
            print('Successfully added related URLs!')
        time.sleep(5)
        #parse authors
        authorUrlList = Book.getAuthorUrls(url)
        for authorUrl in authorUrlList:
            newAuthorEntry = Author.parseGoodReadsPage(authorUrl)
            authorName = newAuthorEntry['Name']
            if Collection.authorAlreadyFound(authorCol,authorName):
                print(f'[{author}] was already found in our Author collection - skipping...')
                continue
            else:
                print(f'Inserting {author} into Author collection...')
                Collection.insertIntoAuthorCollection(authorCol,newAuthorEntry)
                print('Successfully inserted!')
            time.sleep(1)




bookCol = Collection.connectToBookCollection()
authorCol = Collection.connectToAuthorCollection()
urlCol = Collection.connectToFoundUrlsCollection()
mainLoop(bookCol,authorCol,urlCol)