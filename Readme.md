# Readme

The [nmos-server-api-tests](https://github.com/Lawo/nmos-server-api-tests) project provides automated tests for the Query-, Node- and Registration-[APIs](https://github.com/AMWA-TV/nmos-discovery-registration/tree/master/APIs) of any given NMOS-server implementation.

This [Node.js](http://nodejs.org/)-project is written in [Typescript](https://www.typescriptlang.org/). 
It uses the [Mocha](https://mochajs.org/) Javascript test framework and the [Chai Assertion Library](http://chaijs.com/).
The [chai-http](http://chaijs.com/plugins/chai-http/)-plugin is used to extend Chai Assertion Library with tests for http-APIs.
The [chai-json-schema](http://chaijs.com/plugins/chai-json-schema/)-plugin is used to validate API-responses against [JSON schema](http://json-schema.org/).

Up to now the project tests NMOS v1.0 specification. 
The API-raml-files and the schemas were copied into this project from [AMWA-TV/nmos-discovery-registration](https://github.com/AMWA-TV/nmos-discovery-registration/tree/master/APIs). 
It is planned to use the git submodule mechanism in the future to avoid the copies and get the files directly from the [AMWA-TV/nmos-discovery-registration](https://github.com/AMWA-TV/nmos-discovery-registration)-github repository. 

## Getting Ready

* Install [Node.js](http://nodejs.org/) for your platform
* Get the [sources](https://github.com/Lawo/nmos-server-api-tests.git) into a directory of your choice
    <pre>
    git clone https://github.com/Lawo/nmos-server-api-tests.git
    </pre>
* Change to the directory chosen for the sources and type
    <pre>
    npm install
    </pre>

Now everything is ready to run the tests.

## Run Tests

There are two test-scripts available: `test` and `test-xunit`.

### test
The test results will be displayed in the console.
<pre>
npm run test --host=192.168.1.76 --node_port=12345 --query_port=8870 --registration_port=8235
</pre>

### test-xunit
The test results will be written into the file **test-reports.xml** in **xUnit-format**.
This comes in handy when integrating of the tests into a CI-System. 
<pre>
npm run test-xunit --host=192.168.1.76 --node_port=12345 --query_port=8870 --registration_port=8235
</pre>

### Host and Port specification
Host and ports may be specified from the command line when running the tests. 

#### Host
<pre>
--host=192.168.1.76
</pre>

If no host is specified the default value **localhost** is used.

#### Port
For each of the Node-, Query- and Registration-API a separate port may be specified. 
<pre>
--node_port=12345
--query_port=8870
--registration_port=8235
</pre>

If no port is specified the default value **15631** is used.

