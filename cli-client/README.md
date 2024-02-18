# CLI client

Ενδεικτικά περιεχόμενα:

- [Command line interface (CLI).](#CLI)
- [CLI functional tests.](#[CLI-functional-tests)
- [CLI unit tests.](#CLI-unit-tests)



# CLI

## Installation

### Requirements:

- Node.js version: 18.5.0 or newer
- npm version: 10.2.3 or newer

### Node.js

#### Installing the packages:

Copy _cli.js_ and _package.json_ into your desired directory.

In command prompt, navigate to the selected directory and execute the command:

```
npm install
```

#### Usage:

To run the CLI, execute the command:

```
node cli.js scope --param1 value1 [--param2 value2 ...] --format fff
```

### Executable

Copy se2355.exe to your desired directory

In command prompt, navigate to the selected directory and execute the command:

```
se2355.exe scope --param1 value1 [--param2 value2 ...] --format fff
```

## Using the CLI:

In command prompt execute the commands for either [Node.js](#nodejs) or [executable](#executable) where:

scope: 
- resetall       	Reset all data on the server
- healthcheck    	Perform a health check on the server
- newtitles      	Upload titlebasics data
- newakas        	Upload titleakas data
- newnames       	Upload namebasics data
- newcrew        	Upload titlecrew data
- newepisode     	Upload titleepisode data
- newprincipals  	Upload titleprincipals data
- newratings    	Upload titleratings data
- title          	Get details from title with the given ID
- titlefull      	Get all details from title with the given ID
- searchtitle    	Get title that contains the search word
- bygenre        	Get titles that match given genre and minimum rating
- name           	Get details for actor with the given ID
- searchname     	Get name that contains the search word
- help 		Show help

Supported commands for each scope:
1. resetall [--format json|csv]
2. healthcheck [--format json|csv]
3. newtitles --filename "path/to/truncated_title.basics.tsv" [--format json|csv]
4. newakas --filename "path/to/truncated_title.akas.tsv" [--format json|csv]
5. newnames --filename "path/to/truncated_name.basics.tsv" [--format json|csv]
6. newcrew --filename "path/to/truncated_title.crew.tsv" [--format json|csv]
7. newepisode --filename "path/to/truncated_title.episode.tsv" [--format json|csv]
8. newprincipals --filename "path/to/truncated_title.principals.tsv" [--format json|csv]
9. newratings --filename "path/to/truncated_title.ratings.tsv" [--format json|csv]









# CLI functional tests

#### Installing the packages:

Create a copy of the *__tests__* folder into your desired directory, where _cli.js_ and _package.json_ exist.

In command prompt, navigate to the selected directory and install Jest and Supertest:

```sh
npm install --save-dev jest supertest nock
```

or just install all the dependencies of the package.json file:

```sh
npm install
```

#### Usage:

To run the CLI tests, execute the command:

```
npx jest
```






# CLI unit tests
10. title --titleID ":titleID" [--format json|csv]
11. titlefull --titleID ":titleID" [--format json|csv]
12. searchtitle --titlepart "titlepart" [--format json|csv]
13. bygenre --genre "genre" --min (minrating) [--from (minimum year) --to (last year of airing) --format json|csv]
14. name --nameid ":nameID" [--format json|csv]
15. searchname --name "namepart" [--format json|csv]






