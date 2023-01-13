Test the configuration by changing to the resulting directory and pipe the `NDJSON` with `JQ` to `STDOUT` for easier interpretation of the log output

```
$ tail /etc/vector/out/vector-nginx.json | jq
```

The resulting configuration from [`nginx-to-json.yml`](https://github.com/GangGreenTemperTatum/vector/blob/main/config/pipelines/nginx-to-json/nginx-to-json.yml) omits the log in the following [format when piping to `JQ`](https://github.com/GangGreenTemperTatum/vector/blob/main/config/pipelines/nginx-to-json/log-output-example.json)

## Retired parsing techniques ##
```
.file_parsed_c = parse_regex!(.file,r'/(?P<ip6>^(?:[A-F0-9]{1,4}:){7}[A-F0-9]{1,4}$)\.log')
.nginx.server6 = .file_parsed_c.ipc
.file_parsed = parse_regex!(.file,r'data/(?P<ip>\d+\.\d+\.\d+\.\d+)\.log')
.nginx.server = parse_regex!(.file,r'\d{1,3}\.\d{1,3}\.\d{1,3}\.\d{1,3}')
.nginx.path = parse_regex!(.file,r'^.*/')
```

### Notes for testing the `transforms`>`REMAP`>`parse_regex`>`capture groups`:
```
# To use the `parse_regex` function with a capture group for server IP:
.nginx.server = parse_regex!(.file, r'^(?P<dstip>\d{1,3}\.\d{1,3}\.\d{1,3}\.\d{1,3})')
# To use the `parse_regex` function without a capture group for server IP:
.nginx.server = parse_regex!(.file, r'\d{1,3}\.\d{1,3}\.\d{1,3}\.\d{1,3}')
# To use the `parse_regex` function with a capture group for file/path:
.nginx.path = parse_regex!(.file, r'^(?P<path>.*/)')
# To use the `parse_regex` function without a capture group for file/path:
.nginx.path = parse_regex!(.file, r'^.*/') 
# Test no regex capture groups
.nginx.server = parse_regex!(.file, r'\d{1,3}\.\d{1,3}\.\d{1,3}\.\d{1,3}')
.nginx.path = parse_regex!(.file, r'^.*/')
# Test regex capture groups
.nginx.server = parse_regex!(.file, r'^(?P<dstip>\d{1,3}\.\d{1,3}\.\d{1,3}\.\d{1,3})')
.nginx.path = parse_regex!(.file, r'^(?P<path>.*/)')
```

## TDL Enhancements
### [VRL REMAP](https://vector.dev/docs/reference/configuration/transforms/remap/) Functions to include ##
* Enrich data with `.find_enrichment_table_records`
* Remove DUP and redundant data fields with `del`
* Coalesce `parse_regex` statements for cleaner VRL remapy syntax
* Coalesce `del()` and to_int() statements for cleaner VRL remapy syntax
