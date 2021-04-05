#!/bin/sh
psql -f db/install.sql -U postgres
PGPASSWORD=qwerty psql -d movies -f db/structure.sql -U odmen
PGPASSWORD=qwerty psql -d movies -f db/data.sql -U odmen