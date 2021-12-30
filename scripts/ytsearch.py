from pytube import Search
import json
import sys

searchQuery = sys.argv[1] + " karaoke"
currentCount = sys.argv[2]

def getArtistAndTitle(title, channel):
  match channel:
    case "Sing King" | "Stingray Karaoke":
      endArtist = title.index(" -")
      startTitle = endArtist + 3
      endTitle = title.index(" (Karaoke")
      return { 
        "artist": title[0:endArtist],
        "title": title[startTitle:endTitle]
      }
    case "KaraFun Karaoke":
      endTitle = title.index(" -")
      startArtist = endTitle + 3
      endArtist = title.index(" | Karaoke")
      return { 
        "artist": title[startArtist:endArtist],
        "title": title[0:endTitle]
      }
    case "Piano Backing Tracks":
      endTitle = title.index("oke)") + 4
      startArtist = endTitle + 1
      return { 
        "artist": title[startArtist:],
        "title": title[0:endTitle]
      }
    case "Zoom Karaoke Official":
      endArtist = title.index(" -")
      startTitle = endArtist + 3
      endTitle = title.index(" - Karaoke")
      return { 
        "artist": title[0:endArtist],
        "title": title[startTitle:endTitle]
      }
    case _:
      return {
        "artist": title,
        "title": title
      }

def secToHours(seconds):
  b = str((seconds%3600)//60)
  c = str((seconds%3600)%60)
  d = {
    "seconds": seconds,
    "pretty": "{} mins {} seconds".format(b, c)
  }
  return d

def getSongObject(ytObject):
  print('getting data')
  # artistAndTitle = getArtistAndTitle(ytObject.title, ytObject.author)
  # print('done.')
  return [
    # ytObject.vid_info["videoDetails"]["videoId"],
    # "title": artistAndTitle["title"],
    # "artist": artistAndTitle["artist"],
    # ytObject.title,
    # ytObject.title,
    # ytObject.author,
    # ytObject.length,
  ]

s = Search(searchQuery)
print('search done.')
results = []

for x in s.results:
  results.append(getSongObject(x))

print('{ "count": ' + str(len(results)) + ', "entries": ' + json.dumps(results) + " }")

exit()