[Vector AWS Cloudwatch logs - Permissions](https://vector.dev/docs/reference/configuration/sinks/aws_cloudwatch_logs/#permissions)
[AWS IAM Policy Permission References - Cloudwatch](https://docs.aws.amazon.com/AmazonCloudWatch/latest/logs/permissions-reference-cwl.html)

Test your IAM policy with the [AWS IAM Policy Simulator](https://policysim.aws.amazon.com/home/index.jsp?#users/cloudwatch)

* [`aws_cloudwatch_policy_for_vector`](https://github.com/GangGreenTemperTatum/vector/blob/main/config/aws/iam/policies/aws_cloudwatch_policy_for_vector.json)
```
"Least-privilege IAM policy created for Vector to ship logs, using custom log groups and streams"
```
