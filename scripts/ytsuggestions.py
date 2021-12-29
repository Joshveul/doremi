from pytube import Search
import sys

searchQuery = sys.argv[1] + " karaoke"

s = Search(searchQuery)

print(s.completion_suggestions)

exit()