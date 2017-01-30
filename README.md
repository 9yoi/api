## How to run
- Install MySQL
- `mysql.server start`
- In mySQL terminal: `Create database test;`
- cd into main nova folder and `npm install`
- `node index.js`

  
## Summary
- Server
    - Node.js & Express 
- Database
    - mySQL & Sequelize
    - Table schema is defined in db.js
- Endpoints
    - '/api/user/meta' - Phase 1 Endpoint. Takes in a JSON object with user data, including userId
    - '/api/user/file' - Phase 2 Endpoint. Takes in a JSON object with filepath (.txt) and userId. Meta details in file is parsed and added to the same user table for this userId.
    - '/api/data/user' - Data Endpoint. Takes in JSON of userId and responds with object of meta details.

## Appendix
How do you typically manage dependencies for a project?
- Use package managers: NPM, Bower, Yarn
- Save dependencies into package.json for easy installation when cloned afresh
- Use Grunt/Gulp to run build tasks

Provide a top 3 of your favorite resources (blogs, books, people, etc...) that you
use to improve as an engineer. Please tell why you like that particular resource.
- StackOverflow: Answers to every bug/ challenges
- HackerNews: Stay in the loop on latest developments
- Udacity/ Front-End-Masters/ Egghead.io : Curated, high quality tutorials for ongoing learning

How would you test a piece of code that required access to a remote database
through a network connection?
- Use mock objects to ensure that the data is correctly parsed
