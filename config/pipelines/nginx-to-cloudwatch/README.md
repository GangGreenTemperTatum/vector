A [Vector](https://vector.dev) pipeline configuration to publish local sample NGINX access logs to [AWS Cloudwatch](https://docs.aws.amazon.com/AmazonCloudWatch/latest/logs/WhatIsCloudWatchLogs.html)

Ensure to run the [`/etc/vector/./run-vector.sh clean`](https://github.com/GangGreenTemperTatum/vector/blob/main/scripts/run-vector.sh) after any prior Vector runs or attempts to flush configuration, ingestigion and logs

## Resources:

* [Timber.io AWS Cloudwatch Sink](https://vector.dev/docs/reference/configuration/sinks/aws_cloudwatch_logs/)
* [AWS Cloudwatch Sink](https://assume-role-docs--vector-project.netlify.app/docs/reference/sinks/aws_cloudwatch_logs/)

## VRL Functions to include ##
* Enrich data with `.find_enrichment_table_records`
* Remove DUP and redundant data fields with `del`
* Coalesce `parse_regex` statements for cleaner VRL remapy syntax
* Coalesce `del()` and to_int() statements for cleaner VRL remapy syntax

## Retired parsing techniques ##
```
.file_parsed_c = parse_regex!(.file,r'/(?P<ip6>^(?:[A-F0-9]{1,4}:){7}[A-F0-9]{1,4}$)\.log')
.nginx.server6 = .file_parsed_c.ipc
.file_parsed = parse_regex!(.file,r'data/(?P<ip>\d+\.\d+\.\d+\.\d+)\.log')
.nginx.server = parse_regex!(.file,r'\d{1,3}\.\d{1,3}\.\d{1,3}\.\d{1,3}')
.nginx.path = parse_regex!(.file,r'^.*/')
```

## TDL Enhancements
* Scale Vector [pipeline](https://vector.dev/guides/advanced/cloudwatch-logs-firehose/) using [`AWS Kinesis Firehose`](https://aws.amazon.com/kinesis/data-firehose/) to host multiple Vector instances over HTTPS for redundancy, scalability and portability
* Deploy as IaC with [Terraform](https://registry.terraform.io/providers/hashicorp/aws/latest/docs/resources/cloudwatch_log_group)

## Test your results / Log Output 

* [This configuration pipeline](https://github.com/GangGreenTemperTatum/vector/blob/main/config/pipelines/nginx-to-cloudwatch/nginx-sample-to-cloudwatch.yml) creates individual log stream per-NGINX server IP address which is configured under the sink's key/value `stream_name: "{{ .nginx.server }}"`. Each unique Event (AKA log) is visible in "pretty" JSON format (non-NDJSON) in the AWS CloudWatch console.

### To view the logs:

* Navigate to your [AWS Console:](https://portal.aws.amazon.com)

1) Ensure you are in the correct region & search for `cloudwatch` under services search
2) Click `Logs` >
3) Click `Log Groups` > 
4) Click on your `<log-group-name>` .. [Example](https://us-east-2.console.aws.amazon.com/cloudwatch/home?region=us-east-2#logsV2:log-groups/log-group/vector-nginx$)

* Ensure to enable all columns, the following columns will be available with your populated Log stream's:

```
Log stream | ARN | Creation time | First event time | Last event time | Last ingestion time | Stored bytes | Upload sequence token | Log stream | ARN | Creation time | First event time | Last event time | Last ingestion time | Stored bytes | Upload sequence token
```
