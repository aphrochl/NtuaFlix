# CLI

Διαχειριστικά endpoints work in this CLI. It is run with these commands (change the path for your own):
1. node cli.js resetall --format json
2. node cli.js healthcheck --format json
3. node cli.js newtitles --filename "C:/Users/Αφροδίτη/tl/NtuaFlix/truncated data/truncated_title.basics.tsv" --format json
4. node cli.js newakas --filename "C:/Users/Αφροδίτη/tl/NtuaFlix/truncated data/truncated_title.akas.tsv" --format json
5. node cli.js newnames --filename "C:/Users/Αφροδίτη/tl/NtuaFlix/truncated data/truncated_name.basics.tsv" --format json
6. node cli.js newcrew --filename "C:/Users/Αφροδίτη/tl/NtuaFlix/truncated data/truncated_title.crew.tsv" --format json
7. node cli.js newepisode --filename "C:/Users/Αφροδίτη/tl/NtuaFlix/truncated data/truncated_title.episode.tsv" --format json
8. node cli.js newprincipals --filename "C:/Users/Αφροδίτη/tl/NtuaFlix/truncated data/truncated_title.principals.tsv" --format json
9. node cli.js newratings --filename "C:/Users/Αφροδίτη/tl/NtuaFlix/truncated data/truncated_title.ratings.tsv" --format json  



# Update 1:

- Added 2 methods to diplay csv:
	- From array: Used in status messages
	- From JSON: Used in GET endpoints as workaround for data display problems
- Added 2 endpoints:
	- GET/title/:titleID
	- GET/name/:nameID

New package installed:
	"json-2-csv": "^5.0.1"

# Update 2:

- Added 2 more endpoints:
	- GET/searchtitle
	- GET/searchname

Both need the package https.

Remaining: 
	- GET/bygenre

# Update 3:

- GET/bygenre is now also implemented and working (some tests are needed tho :D )

# Update 4:

Fixed Scope Names and Parameters for all endpoints (probably)