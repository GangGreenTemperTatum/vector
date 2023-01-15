# CloudWatch Logs Insights Queries

This repository contains a number of useful queries you can copy, paste and run using CloudWatch Logs Insights when parsing and transforming logs received in the [following format](https://github.com/GangGreenTemperTatum/vector/blob/main/config/pipelines/nginx-to-cloudwatch/log-output-example.json), in this instance I used [Vector](https://vector.dev) to send the logs to [AWS Cloudwatch](https://docs.aws.amazon.com/AmazonCloudWatch/latest/logs/CWL_QuerySyntax.html) via the [following config.](https://github.com/GangGreenTemperTatum/vector/blob/main/config/pipelines/nginx-to-cloudwatch/nginx-sample-to-cloudwatch.yml)

### Resources:

* [AWS CloudWatch Log Insight Filter Patterns](https://docs.aws.amazon.com/AmazonCloudWatch/latest/logs/FilterAndPatternSyntax.html#matching-terms-events)
* [AWS CloudWatch Log Insight Sample Queries](https://docs.aws.amazon.com/AmazonCloudWatch/latest/logs/CWL_QuerySyntax-examples.html)
* [CloudWatch Logs Insights query syntax](https://docs.aws.amazon.com/en_us/AmazonCloudWatch/latest/logs/CWL_QuerySyntax.html#CWL_QuerySyntax-operations-functions)
* [CloudWatch search expression syntax](https://docs.aws.amazon.com/AmazonCloudWatch/latest/monitoring/search-expression-syntax.html)
 
# Save queries using CloudFormation

Queries described below can be persisted in your CloudWatch Logs Insights page using the CloudFormation template in cloudformation.yaml, To deploy the stack with the AWS CLI:

```
aws cloudformation create-stack --stack-name cloudwatch-logs-insights-queries --template-body file://cloudformation.yaml
```
See my [`cloudformation.yaml`](https://github.com/GangGreenTemperTatum/vector/blob/main/config/pipelines/nginx-to-cloudwatch/cloudformation.yaml) file.

# My Home-brewed AWS Cloudwatch LogInsight Queries for NGINX logs

## AWS Cloudwatch LogInsight's Default Search Query:

```
fields @timestamp, @message
| sort @timestamp desc
| limit 20
```

## Identify Top IPv4 Clients to NGINX Webserver Within Timeslice:

```
fields @timestamp, @message, nginx.client as srcip, nginx.server
  | stats count() as requestCount by srcip, requestCount, bin(30s) as timeslice
  | filter (requestCount>50)
  #| filter @ip not like /(^172\.17\.[.]*)
  | display srcip, requestCount, timeslice
  | sort requestCount desc
  | limit 100
```

## Identify Busy IPv4 NGINX Webserver's Within Timeslice:

```
fields @timestamp, @message, nginx.server as dstip | fields nginx.status as statuscode
  | stats count() as responseCount by dstip, statuscode, responseCount, bin(30s) as timeslice
  | filter (responseCount>50)
  #| filter @ip not like /(^172\.17\.[.]*)
  | display dstip, statuscode, responseCount, timeslice
  | sort responseCount desc
  | limit 100
```

## Identify Potential Brute Force, Password Sprays and Credential Stuffing Attacks:

```
fields @timestamp, @message, nginx.client as srcip | fields nginx.path as path
  | filter path like "auth" # | filter @message like "auth"
  | stats count() as requestCount by srcip, path, requestCount, bin(30s) as timeslice
  #| filter (requestCount>50) | #filter #| filter @ip not like /(^172\.17\.[.]*)
  | display srcip, path, requestCount, timeslice
  | sort requestCount desc
  | limit 100
```

## NGINX Status != 200 and Unusual HTTP Status Codes

```
fields @timestamp, nginx.client as srcip, nginx.agent as agent, nginx.server as dstip, nginx.status as status
  | filter (status!=200 and status!=304)
  | stats count() as requestCount by status, requestCount, srcip, agent #, bin(30s) as timeslice
  #| stats count(*) by message as time 
  | sort requestCount desc
  | display status, requestCount, srcip, agent
  | limit 25
```

## Identify Potential Recon and Footprint Attacks

```
fields @timestamp, nginx.client as srcip | fields nginx.agent as agent | fields nginx.server as dstip | fields nginx.status as status | fields nginx.path as path
  #| filter path like /(?i)(./env|/robots)/
  #| filter (path=~/\\.*/ or path like/.*/)
  #| filter path=~/\\.*.*/ or path like /\.[a-z]*./
  | filter not isblank(path) | filter path=~/\\.*.*/ or path like /(?i)\.[a-zA-Z]*.*.(php|env|admin|js|aws|shell|bak|api|graphql|staging|dev|v1)/ or path like /.env/ and path != "/" # | stats count(*) by path
  | stats count(*) as numRequests by path, srcip, agent, dstip
  | sort path desc
  | display numRequests, path, srcip, agent, dstip
  | limit 2000
```

## Hunt for Unusual User Agent Suspects or Scanners:

```
fields @timestamp, nginx.client as srcip | fields nginx.agent as agent | fields nginx.server as dstip | fields nginx.method as method | fields nginx.path as path | fields nginx.size as size
  | filter agent not like /(?i)(mozilla|samsung|safari)/ | filter not isblank(agent)
  | sort agent asc
  | display agent, dstip, path
  #| limit 50
```

## Look for Potential Large File Transfers and Exfiltration:

```
fields @timestamp, nginx.client as srcip | fields nginx.server as dstip | fields nginx.method as method | fields nginx.path as path | fields nginx.size as size
  | filter (size>400 and method like "GET")
  #| stats count(*) as numRequests by size, method, srcip, dstip | sort size desc
  | stats sum(size) as bytesTransferred by dstip, srcip | sort bytesTransferred desc
  | display bytesTransferred, dstip, srcip, size, method
  | limit 50
```
