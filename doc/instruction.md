#Steps to run app:

1. You need to have postgresql server installed and runned.
2. Run ./setup.sh in project root folder. If you encounter some issues with postgres than you probably have to enable md5 verification in pg_hba.conf.
3. Open 2 terminals and launch 2 servers:

- 1-st server (restapi) in root folder with "npm start";
- 2-nd server (react-app) in movies-app with "serve -s build"

4. Go to 'http://localhost:5000';
