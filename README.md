# doremi

## Dependencies

- MongoDB
- Python 3.10

### Python Libraries:

- pytube
- pymongo
- requests
- wget

```
pip install pytube pymongo requests
```

### NPM 

 - python-shell 2.0.3

**IMPORTANT: Don't update to python-shell 3.x!, shell process was made async which currently breaks the downnload flow**.

## VSCode Plugins

- ESlint
- Vetur
- Stylelint

## MongoDB configuration

The MongoDB instance must be configured as a replica set.

### MongoDB installed as Windows Service

If Mongo was installed as a Windows service, you will need to change the configuration to initiate the replica set.

1. Make sure that your Path includes an entry to the MongoDB binary files, typically `C:\Program Files\MongoDB\Server\5.0\bin`
1. Go to Windows Services, look for `MongoDb Server (MongoDb)` and stop it
1. Open the properties and in the `Path to executable` there should be a --config parameter pointing to a specific file path, typically `C:\Program Files\MongoDB\Server\5.0\bin\mongod.cfg`
1. Open the config file **with admin rights** in any text editor and add the following configuration:
```bash
replication:
   replSetName: "rs0"
```
5. Start the `MongoDb Server (MongoDb)` service again
1. Open a terminal and connect to the Mongo instance
```bash
mongo
```
7. Initiate the replica instance
```bash
rs.initiate()
```
8. Check the replica set configuration with `rs.config()`, the configuration object should look like the following:
```bash
{
        "_id" : "rs0",
        "version" : 1,
        "term" : 2,
        "members" : [
                {
                        "_id" : 0,
                        "host" : "127.0.0.1:27017",
                        "arbiterOnly" : false,
                        "buildIndexes" : true,
                        "hidden" : false,
                        "priority" : 1,
                        "tags" : {

                        },
                        "secondaryDelaySecs" : NumberLong(0),
                        "votes" : 1
                }
        ],
        "protocolVersion" : NumberLong(1),
        "writeConcernMajorityJournalDefault" : true,
        "settings" : {
                "chainingAllowed" : true,
                "heartbeatIntervalMillis" : 2000,
                "heartbeatTimeoutSecs" : 10,
                "electionTimeoutMillis" : 10000,
                "catchUpTimeoutMillis" : -1,
                "catchUpTakeoverDelayMillis" : 30000,
                "getLastErrorModes" : {

                },
                "getLastErrorDefaults" : {
                        "w" : 1,
                        "wtimeout" : 0
                },
                "replicaSetId" : ObjectId("61fda192c9fa37d09a462b6d")
        }
}
```
9. If you have multiple replicas in the same set, you can identify the primary one with `rs.status()` 

## Build Setup

```bash
# install dependencies
$ npm install

# serve with hot reload at localhost:3000
$ npm run dev

# build for production and launch server
$ npm run build
$ npm run start

# generate static project
$ npm run generate
```

For detailed explanation on how things work, check out the [documentation](https://nuxtjs.org).

## Special Directories

You can create the following extra directories, some of which have special behaviors. Only `pages` is required; you can delete them if you don't want to use their functionality.

### `assets`

The assets directory contains your uncompiled assets such as Stylus or Sass files, images, or fonts.

More information about the usage of this directory in [the documentation](https://nuxtjs.org/docs/2.x/directory-structure/assets).

### `components`

The components directory contains your Vue.js components. Components make up the different parts of your page and can be reused and imported into your pages, layouts and even other components.

More information about the usage of this directory in [the documentation](https://nuxtjs.org/docs/2.x/directory-structure/components).

### `layouts`

Layouts are a great help when you want to change the look and feel of your Nuxt app, whether you want to include a sidebar or have distinct layouts for mobile and desktop.

More information about the usage of this directory in [the documentation](https://nuxtjs.org/docs/2.x/directory-structure/layouts).


### `pages`

This directory contains your application views and routes. Nuxt will read all the `*.vue` files inside this directory and setup Vue Router automatically.

More information about the usage of this directory in [the documentation](https://nuxtjs.org/docs/2.x/get-started/routing).

### `plugins`

The plugins directory contains JavaScript plugins that you want to run before instantiating the root Vue.js Application. This is the place to add Vue plugins and to inject functions or constants. Every time you need to use `Vue.use()`, you should create a file in `plugins/` and add its path to plugins in `nuxt.config.js`.

More information about the usage of this directory in [the documentation](https://nuxtjs.org/docs/2.x/directory-structure/plugins).

### `static`

This directory contains your static files. Each file inside this directory is mapped to `/`.

Example: `/static/robots.txt` is mapped as `/robots.txt`.

More information about the usage of this directory in [the documentation](https://nuxtjs.org/docs/2.x/directory-structure/static).

### `store`

This directory contains your Vuex store files. Creating a file in this directory automatically activates Vuex.

More information about the usage of this directory in [the documentation](https://nuxtjs.org/docs/2.x/directory-structure/store).

### `api`

This directory contains the handler functions of the API endpoints.

To add an endopoint, create a file with an HTTP Request handler function and add its path in `nuxt.config.js` serverMiddleware

### `server`

This directory contains the WebSocket definition, the configuration object can be found in `nuxt.config.js` io

More information about the usage of this in [Nuxt Socket IO](https://nuxt-socket-io.netlify.app/).