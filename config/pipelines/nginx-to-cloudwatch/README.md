A [Vector](https://vector.dev) pipeline configuration to publish local sample NGINX access logs to [AWS Cloudwatch](https://docs.aws.amazon.com/AmazonCloudWatch/latest/logs/WhatIsCloudWatchLogs.html)

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
* Scale Vector using [`AWS Kinesis Firehose`](https://aws.amazon.com/kinesis/data-firehose/) to host multiple Vector instances over HTTPS for redundancy, scalability and portability
* Deploy as IaC with [Terraform](https://registry.terraform.io/providers/hashicorp/aws/latest/docs/resources/cloudwatch_log_group)
