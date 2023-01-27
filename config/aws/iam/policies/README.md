* [Vector AWS Cloudwatch logs - Permissions](https://vector.dev/docs/reference/configuration/sinks/aws_cloudwatch_logs/#permissions)
* [AWS IAM Policy Permission References - Cloudwatch](https://docs.aws.amazon.com/AmazonCloudWatch/latest/logs/permissions-reference-cwl.html)
* Test your IAM policy with the [AWS IAM Policy Simulator](https://policysim.aws.amazon.com/home/index.jsp?#users/cloudwatch)

![Screenshot 2023-01-26 at 20 33 24](https://user-images.githubusercontent.com/104169244/215010221-16e4c8f2-07a8-4e82-a892-1970f368cde7.png)

1) [`aws_cloudwatch_policy_for_vector`](https://github.com/GangGreenTemperTatum/vector/blob/main/config/aws/iam/policies/aws_cloudwatch_policy_for_vector_v1.1.json)
```
"Least-privilege IAM policy created for Vector to ship logs, using custom log groups and streams"
```

