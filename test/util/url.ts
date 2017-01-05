export class Url {
  // if no host is passed as command line argument localhost is used
  private static host = process.env.npm_config_host || 'http://localhost';

  // if no nodeport is passed as command line argument default port 15631 is used
  private static nodePort = process.env.npm_config_node_port || '15631';

  // if no queryport is passed as command line argument default port 15631 is used
  private static queryPort = process.env.npm_config_query_port || '15631';

  // if no registrationport is passed as command line argument default port 15631 is used
  private static registrationPort = process.env.npm_config_registration_port || '15631';

  public static get Node(): string {
    let node = this.host + ':' + this.nodePort + '/x-nmos/node/v1.0';
    return node;
  }

  public static get Query(): string {
    let query = this.host + ':' + this.queryPort + '/x-nmos/query/v1.0';
    return query;
  }

  public static get Registration(): string {
    let registration = this.host + ':' + this.registrationPort + '/x-nmos/registration/v1.0';
    return registration;
  }
}
