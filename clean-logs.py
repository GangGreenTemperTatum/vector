#!/usr/bin/env python3

group_name="nginx-vector"

import boto3,sys

if __name__ == "__main__":
  if len(sys.argv) == 1:
    print ("./clean-logs.py <region>")
  else:
    region = sys.argv[1]
    c = boto3.client("logs",region_name = region)
    for s in c.describe_log_streams(logGroupName=group_name)['logStreams']:
      print (f"Deleting: {group_name}/{s['logStreamName']}")
      c.delete_log_stream(logGroupName=group_name,logStreamName=s['logStreamName'])
