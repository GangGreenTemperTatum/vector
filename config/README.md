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
$ tail vector-nginx.json | jq
```
