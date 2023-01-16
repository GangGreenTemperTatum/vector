These dashboard queries are my custom made for this project and stored [here](https://github.com/GangGreenTemperTatum/vector/blob/main/config/pipelines/nginx-to-cloudwatch/aws-cloudwatch-queries.md)

The dashboard typescript configuration is also stored [here](https://github.com/GangGreenTemperTatum/vector/blob/main/config/pipelines/nginx-to-cloudwatch/aws-cloudwatch-dashboards/nginx-from-vector.ts)

### My hangups about AWS CloudWatch Log Insight dashboard's compared to other vendor SaaS solutions (I.E Sumo Logic):

1) Dynamic updates are few and untrustworthy from experience, always ensure you hit save
2) Even when doing so, the time/date filters never seem to persist on dashboards, nor queries
3) Lack of `X/Y`-axis widget customization for graph presentation and visual representation
4) See snips below ("`Hunt for Potential Large File Transfers and Exfiltration`") where the log output in aggregated fashion displays data, but always fails when presented **exactly** the same in a dashboard.. seems buggy

![AWS-CloudWatch-Log-Insight-Dashboard-nginx-to-cloudwatch-1](https://user-images.githubusercontent.com/104169244/212605693-6fcbee02-878e-47f3-80b0-ca7a0de3c3c6.png)
![AWS-CloudWatch-Log-Insight-Dashboard-nginx-to-cloudwatch-2](https://user-images.githubusercontent.com/104169244/212605696-be723f34-10f3-4b45-96b3-bb06d8bba010.png)
![Hunt for Potential Large File Transfers and Exfiltration](https://user-images.githubusercontent.com/104169244/212605711-1b722f43-42d1-446d-91aa-23b60de64bda.png)
![Hunt for Potential Large File Transfers and Exfiltration - Pie](https://user-images.githubusercontent.com/104169244/212605723-fb9c1533-69d1-4170-93eb-dc6930d4d735.png)
![AWS-CloudWatch-Log-Insight-Dashboard-nginx-to-cloudwatch-3](https://user-images.githubusercontent.com/104169244/212605764-7e342888-3a73-42a2-a1ae-8ea5506c2a0d.png)
![AWS-CloudWatch-Log-Insight-Dashboard-nginx-to-cloudwatch-4](https://user-images.githubusercontent.com/104169244/212605767-d33812c9-90d6-40f1-8976-73ced22b7b97.png)



