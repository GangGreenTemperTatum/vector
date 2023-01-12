Test the configuration by changing to the resulting directory and pipe the NDJSON with JQ to STDOUT for easier interpretation of the log output

```
$ tail /etc/vector/out/vector-nginx.json | jq
```

The resulting configuration from [`nginx-to-json.yml`]((https://github.com/GangGreenTemperTatum/vector/blob/main/config/pipelines/nginx-to-json/nginx-to-json.yml) omits the log in the following [format when piping to JQ](https://github.com/GangGreenTemperTatum/vector/blob/main/config/pipelines/nginx-to-json/log-output-example.json)
