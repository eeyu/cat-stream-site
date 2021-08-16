import pyrebase
import time
from pygame import mixer
mixer.init() # initiate the mixer instance


config = {     
  "apiKey": "AIzaSyA5LWOqcJaFdZsDnivdQxdZ-myT-0Alzxg",
  "authDomain": "cat-stream-1b1df.firebaseapp.com",
  "databaseURL": "https://cat-stream-1b1df-default-rtdb.firebaseio.com/",
  "storageBucket": "cat-stream-1b1df.appspot.com"
}

firebase = pyrebase.initialize_app(config)  

db = firebase.database()

starttime = time.time()
while True:
    currenttime = time.time()
    if (currenttime - starttime > 0.5): 
        starttime = currenttime
        keys = db.child("keystrokes").get()
        down = keys.val()['down'] != 0
        up = keys.val()['up'] != 0
        left = keys.val()['left'] != 0
        right = keys.val()['right'] != 0
        if (down):
          mixer.music.load('busket.mp3') # loads the music, can be also mp3 file.
          mixer.music.play() # plays the music
        elif (up):
          mixer.music.load('pussycat.mp3') # loads the music, can be also mp3 file.
          mixer.music.play() # plays the music
        elif (left):
          mixer.music.load('psst.mp3') # loads the music, can be also mp3 file.
          mixer.music.play() # plays the music
        elif (right):
          mixer.music.load('click.mp3') # loads the music, can be also mp3 file.
          mixer.music.play() # plays the music
