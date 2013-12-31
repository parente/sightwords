.PHONY: vendor front-vendor back-vendor clean server data

clean:
	@-rm -r public/vendor
	@-rm -r vendor

public/puzzles:
	@-ln -s ~/Dropbox/bubba\ and\ chewy/sightwords/puzzles public/puzzles

vendor: front-vendor back-vendor

front-vendor:
	@-rm -r public/vendor
	@mkdir -p public/vendor
	@curl http://code.jquery.com/jquery-2.0.3.min.js -o public/vendor/jquery.min.js

back-vendor:
	@-rm -r vendor
	@virtualenv --no-site-packages vendor
	@vendor/bin/pip install bottle==0.11.6

dev: public/puzzles
	@BOTTLE_DEV=1 vendor/bin/python server.py

server:
	@vendor/bin/python server.py

upload:
	@rsync -avz --copy-dirlinks --exclude .DS_Store --exclude /vendor --exclude .git . pi:sightwords