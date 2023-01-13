Installing and testing [vector](https://vector.dev) with [brew](https://vector.dev/docs/setup/installation/package-managers/homebrew/) (see ["Install Vector via Homebrew"](https://assume-role-docs--vector-project.netlify.app/docs/setup/installation/package-managers/homebrew/)) places the configuration files in `/etc/vector/config/*`

Vector currently supports the following configuration file extensions:

* `.toml`
* `.yml`
* `.json`

To test a configuration, execute the following from the correct directory:

```
$ vector --config-yaml /path/file.yml`
```

Invoke the following shell script to cleanup the log files, before re-omiting/testing an alternative configuration file and after any prior Vector runs or attempts to flush configuration, ingestigion and logs etc.

```
$ chmod +x ./run-vector.sh
$ ./run-vector.sh clean
```
