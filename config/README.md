Installing and testing [vector](https://vector.dev) with [brew](https://vector.dev/docs/setup/installation/package-managers/homebrew/) (see [`Install Vector via Homebrew`](https://assume-role-docs--vector-project.netlify.app/docs/setup/installation/package-managers/homebrew/)) places the configuration files in `/etc/vector/config/*`

Vector currently supports the following configuration file extensions:

* `.toml`
* `.yml`
* `.json`

To test a configuration, execute the following from the correct directory:

```
$ vector --config-yaml /path/file.yml`
```

Invoke the following shell script to cleanup the log files and before re-omiting/testing an alternative configuration file

```
$ chmod +x ./run-vector.sh
$ ./run-vector.sh clean
```

Test the configuration by changing to the resulting directory and pipe the NDJSON with JQ for easier interpretation of the log output

```
$ tail /etc/vector/out/vector-nginx.json | jq
```

The resulting configuration from [`nginx-to-json.yml`](https://github.com/GangGreenTemperTatum/vector/blob/main/config/nginx-to-json.yml) omits the log in the following format when piping to jq:

* Here, `<dstip>` is redacting the server IPv4 address (running NGINX) and `<clientip>` is redacting the source IPv4 address of the incoming client
* `<Local-Hostname>` is also redacting the local hostname of the machine you are running Vector on

```
{
  "file": "data/<dstip>.log", <---- AKA NGINX server IP address
  "host": "<Local-Hostname>",
  "message": "<clientip> - - [22/Oct/2021:23:53:38 +0000] \"POST / HTTP/1.1\" 405 568 \"-\" \"Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/81.0.4044.129 Safari/537.36\"",
  "nginx": {
    "agent": "Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/81.0.4044.129 Safari/537.36",
    "client": "<clientip>",
    "method": "POST",
    "path": {},
    "protocol": "HTTP/1.1",
    "request": "POST / HTTP/1.1",
    "server": {},
    "size": 568,
    "status": 405,
    "timestamp": "2021-10-22T23:53:38Z"
  },
  "source_type": "file",
  "timestamp": "2023-01-11T20:27:21.206271Z"
}
```
