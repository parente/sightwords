#!/bin/bash

cd `dirname $0`
vendor/bin/python server.py &
PID=$!
midori -e Fullscreen -e TabCloseOther -a http://127.0.0.1:8080
kill $PID
