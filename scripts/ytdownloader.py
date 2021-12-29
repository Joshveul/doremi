from pytube import YouTube
import sys
import pymongo

myclient = pymongo.MongoClient("mongodb://localhost:37017/")
mydb = myclient["doremi"]
mycol = mydb["appstate"]

videoDocQuery = { "id": sys.argv[1] }

print('Looking video in database...', videoDocQuery)
videoDoc = mycol.find_one(videoDocQuery)
print('Done. Record found: ', videoDoc)
if (videoDoc):
    print('Video already exists')
    exit()

print('Instantiating TY object: http://youtube.com/watch?v=' + sys.argv[1])
yt = YouTube('http://youtube.com/watch?v=' + sys.argv[1])
hqStream = yt.streams.filter(progressive=True, file_extension='mp4').order_by('resolution').desc().first()

print('Downloading...')
fileName = sys.argv[1] + '.mp4'
downloadPath = 'static/archive'
hqStream.download('./' + downloadPath, fileName)
print('Download complete')

mydict = { "id": sys.argv[1], "title": hqStream.title, 'location': downloadPath + '/' + fileName}
mycol.insert_one(mydict)
print('Record stored: ', mydict)
print('done')

exit()