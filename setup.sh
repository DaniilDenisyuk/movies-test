#!/bin/sh
npm install postgresql

psql -f db/install.sql -U postgres
PGPASSWORD=qwerty psql -d Test -f db/structure.sql -U danden

crontab -l | { cat; echo "15 0 0 0 0 node /path-to/extractRubrics.js"; } | crontab -