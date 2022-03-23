from pytube import YouTube
import sys
import pymongo
from datetime import datetime
import requests
import shutil

# Instanciate the database
print('Instantiating database')
myclient = pymongo.MongoClient("mongodb://localhost:37017/")
mydb = myclient["doremi"]
mycol = mydb["songs"]
print('Database instantiated successfully')

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

# Set some constants
videoDocQuery = { "videoId": videoId }
staticFolderPath = './static/'
downloadPath = 'archive'
fileName = videoId + '.mp4'
thumbnailPath = downloadPath  + '/' + videoId + '.jpg'

# If the video record exists in the database, terminate the process here
print('Looking video in database...', videoDocQuery)
videoDoc = mycol.find_one(videoDocQuery)
print('Done. Record found: ', videoDoc)
if (videoDoc):
    print('Video already exists')
    exit()

# Store the record in the database to prevent duplicate requests for the same video
mydict = { "videoId": videoId, "title": title, "artist": artist, "thumbnail": thumbnailPath, "channel": channel, "duration": duration, "firstAddedBy": firstAddedBy, "addedBy": addedBy, "timesAdded": timesAdded, "timesPlayed": timesPlayed, "timesRemoved": timesRemoved, 'downloading': True, 'fileLocation': downloadPath + '/' + fileName}
mycol.insert_one(mydict)
print('Record stored: ', mydict)

# Get the YT video instance and get the highest resolution video available in mp4
print('Instantiating TY object: http://youtube.com/watch?v=' + videoId)
yt = YouTube('http://youtube.com/watch?v=' + videoId)
hqStream = yt.streams.filter(progressive=True, file_extension='mp4').order_by('resolution').desc().first()

# Download video to static archive folder
print('Downloading video...')
hqStream.download(staticFolderPath + downloadPath, fileName)
print('Video Successfully Downloaded: ./' + downloadPath + fileName)

# Download thumbnail to static archive folder
print('Downloading thumbnail... ' + thumbnail)
r = requests.get(thumbnail, stream = True)
if r.status_code == 200:
    # Set decode_content value to True, otherwise the downloaded image file's size will be zero.
    r.raw.decode_content = True
    
    print('Request succesfull, saving file to ' + staticFolderPath + thumbnailPath + ' ... ')
    # Open a local file with wb ( write binary ) permission.
    with open(staticFolderPath + thumbnailPath, 'wb') as f:
        shutil.copyfileobj(r.raw, f)
        
    print('Image sucessfully Downloaded: ' + './' + thumbnailPath)
else:
    print('Image Couldn\'t be retreived')

# Exit
print('done')
exit()