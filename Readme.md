# Readme

This is the automated test project to test the nmos-server REST-API.

## Installation

* Install [Node.js](http://nodejs.org/) for your platform
* Open console, change to this directory and type
    <pre>
    npm install
    </pre>

## Run Tests

### Console Output
The test results will be displayed in the console
<pre>
npm run test --host=192.168.1.76 --node_port=12345 --query_port=8870 --registration_port=8235
</pre>

### xUnit Output
The test results will be written into the file **test-reports.xml** in **xUnit-format**
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

