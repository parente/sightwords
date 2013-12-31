# sightwords

Simple browser-based HTML5 sightword, reading, and typing tutor for my daughter's Raspberry Pi.

![The TARDIS is blue.](http://i.imgur.com/xSQWN5p.png)

## Running

Run `run.sh` or put the `etc/sightwords.desktop` shortcut in `~/Desktop`.

## Adding Content

1. Make a folder `public/puzzles`.
2. Make folders named after sightwords like `public/puzzles/and`.
3. Make an `index.txt` in each sightword folder with content like the following.

    ```
    The dog and cat play.
    Mom and I go to the store.
    Darth Vader and Pinky Pie have fun.
    ```

4. For each line number (0-indexed) in the `index.txt` add an associated image and narration to the sightword folder.

    ```
    0.mp3   # picture of a dog and cat playing
    0.jpg   # someone reading the sentence
    1.ogg   # picture of Mom and daughter
    1.png   # someone reading the sentence
    2.jpg   # it's amazing what you can find on imgur
    2.mp3   # it's hard to keep a straight face while reading this
    # and so on
    ```

## TODOs

* Metrics
* Say the letters she types
* Say the sightword when she gets it right
* Give some kind of spoken reinforcement
* Soeak hints about where the keys are on the US Keyboard
* Tie it to Dropbox or whatever for other folks
* Unterrible-ify the code

## Attribution

TARDIS is a registered trademark of [You Know Who](http://www.bbc.co.uk/programmes/b006q2x0).
