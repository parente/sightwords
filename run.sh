#!/bin/bash
vendor/bin/python server.py &
PID=$!
python -m webbrowser -t "http://127.0.0.1:8080"
kill $PID