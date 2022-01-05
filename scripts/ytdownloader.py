from pytube import YouTube
import sys
import pymongo
from datetime import date
from datetime import datetime

myclient = pymongo.MongoClient("mongodb://localhost:37017/")
mydb = myclient["doremi"]
mycol = mydb["songs"]

videoId = sys.argv[2]
title = sys.argv[3]
artist = sys.argv[4]
thumbnail = sys.argv[5]
channel = sys.argv[6]
duration = sys.argv[7]
firstAddedBy = sys.argv[1]
addedBy = sys.argv[1]
timesAdded = 1
timesPlayed = 0
timesRemoved = 0
lastPlayed = datetime.now

videoDocQuery = { "id": videoId }

print('Looking video in database...', videoDocQuery)
videoDoc = mycol.find_one(videoDocQuery)
print('Done. Record found: ', videoDoc)
if (videoDoc):
    print('Video already exists')
    exit()

print('Instantiating TY object: http://youtube.com/watch?v=' + videoId)
yt = YouTube('http://youtube.com/watch?v=' + videoId)
hqStream = yt.streams.filter(progressive=True, file_extension='mp4').order_by('resolution').desc().first()

print('Downloading...')
fileName = videoId + '.mp4'
downloadPath = 'static/archive'
hqStream.download('./' + downloadPath, fileName)
print('Download complete')

mydict = { "videoId": videoId, "title": title, "artist": artist, "thumbnail": thumbnail, "channel": channel, "duration": duration, "firstAddedBy": firstAddedBy, "addedBy": addedBy, "timesAdded": timesAdded, "timesPlayed": timesPlayed, "timesRemoved": timesRemoved, 'downloading': True, 'fileLocation': downloadPath + '/' + fileName}
mycol.insert_one(mydict)
print('Record stored: ', mydict)
print('done')

exit()