Test the configuration by changing to the resulting directory and pipe the NDJSON with JQ to STDOUT for easier interpretation of the log output

```
$ tail /etc/vector/out/vector-nginx.json | jq
```

The resulting configuration from [`nginx-to-json.yml`](https://github.com/GangGreenTemperTatum/vector/blob/main/config/nginx-to-json.yml) omits the log in the following format when piping to jq:

From:

{
  "file": "data/XXX.XXX.52.242.log",
  "file_parsed": {
    "ip": "XXX.XXX.52.242"
  },
  "file_parsed_b": {
    "logdir": "data"
  },
  "host": "XXXX",
  "message": "XXX.XXX.86.149 - - [22/Oct/2021:23:53:38 +0000] \"POST / HTTP/1.1\" 405 568 \"-\" \"Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/81.0.4044.129 Safari/537.36\"",
  "nginx": {
    "agent": "Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/81.0.4044.129 Safari/537.36",
    "client": "XXX.XXX.86.149",
    "logdir": "data",
    "method": "POST",
    "path": "/",
    "protocol": "HTTP/1.1",
    "request": "POST / HTTP/1.1",
    "server": "XXX.XXX.52.242",
    "size": 568,
    "status": 405,
    "timestamp": "2021-10-22T23:53:38Z"
  },
  "source_type": "file",
  "timestamp": "2023-01-12T19:20:43.102517Z"
}

To: (Post formatting and translation)

{
  "file": "data/XXX.XXX.52.242.log",
  "nginx": {
    "agent": "Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/81.0.4044.129 Safari/537.36",
    "client": "XXX.XXX.86.149",
    "logdir": "data",
    "method": "POST",
    "path": "/",
    "protocol": "HTTP/1.1",
    "request": "POST / HTTP/1.1",
    "server": "XXX.XXX.52.242",
    "size": 568,
    "status": 405,
    "timestamp": "2021-10-22T23:53:38Z"
  },
  "source_type": "file",
  "timestamp": "2023-01-12T19:24:15.626468Z"
}
