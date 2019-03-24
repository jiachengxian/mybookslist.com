import book
import collection

testURL = "https://www.goodreads.com/book/show/136251.Harry_Potter_and_the_Deathly_Hallows"
print(book.parseGoodReadsPage(testURL))

foundUrlsCollection = collection.connectToFoundUrlsCollection()
print(collection.popUrlFromCollection(foundUrlsCollection))