import os
import random
from bottle import get, response, route, static_file, template, run

PUZZLES_PATH = 'public/puzzles'
AWARDS_PATH = 'public/awards'
PUZZLES_URI = '/public/puzzles/%(id)s/%(fn)s'
AWARDS_URI = '/public/puzzles/%(id)s/%(fn)s'

def fn_to_uri(fn):
    return '/'+fn

def find_media(base, *exts):
    for ext in exts:
        if os.path.isfile(base+ext):
            return base + ext

def puzzle_group(pid):
    group = []
    path = os.path.join(PUZZLES_PATH, pid)
    index_fn = os.path.join(path, 'index.txt')
    with file(index_fn) as f:
        index = f.readlines()
    for i, text in enumerate(index):
        if text.startswith('#'): continue
        base = os.path.join(path, str(i))
        audio = find_media(base, '.mp3', '.ogg')
        image = find_media(base, '.png', '.jpg', '.gif')
        if audio and image:
            group.append({
                'text': text.strip(),
                'audio': fn_to_uri(audio), 
                'image': fn_to_uri(image)
            })
    return group

def award_response(aid):
    pass

@get('/')
def index():
    return template('index.tpl')

@get('/public/<filename:path>')
def public(filename):
    return static_file(filename, root='public')

@get('/puzzles/random')
def random_puzzle():
    fns = [name for name in os.listdir(PUZZLES_PATH) if not name.startswith('.')]
    pid = random.choice(fns)
    group = puzzle_group(pid)
    random.shuffle(group)
    return {
        'id': pid,
        'word': pid,
        'puzzles': group
    }

@get('/awards/random')
def random_award():
    pass

if __name__ == '__main__':
    if os.environ.get('BOTTLE_DEV'):
        run(host='0.0.0.0', port=8080, reloader=True, debug=True) 
    else:
        run(host='0.0.0.0', port=8080) 