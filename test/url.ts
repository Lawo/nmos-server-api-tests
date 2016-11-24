export class Url {
    private static host = process.env.npm_config_host || 'http://localhost';
    // if no port is passed as command line argument default port 15631 is used
    private static port = process.env.npm_config_port || '15631';

    public static get Node(): string {
        let node = this.host + ':' + this.port + '/x-nmos/node/v1.0';
        return node;
    }

    public static get Query(): string {
        let query = this.host + ':' + this.port + '/x-nmos/query/v1.0';
        return query;
    }

    public static get Registration(): string {
        let registration = this.host + ':' +  this.port + '/x-nmos/registration/v1.0';
        return registration;
    }
}
