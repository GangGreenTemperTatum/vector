{
    "widgets": [
        {
            "type": "log",
            "x": 0,
            "y": 0,
            "width": 11,
            "height": 6,
            "properties": {
                "query": "SOURCE 'vector-nginx/logs' | fields @timestamp, nginx.client as srcip, nginx.agent as agent, nginx.server as dstip, nginx.status as status\n  | stats count() as requestCount by status #, bin(30s) as timeslice\n  #| stats count(*) by message as time \n  | sort requestCount desc\n  | display status, requestCount\n  | limit 25",
                "region": "us-east-2",
                "title": "HTTP Status Codes - Pie",
                "view": "pie"
            }
        },
        {
            "type": "log",
            "x": 11,
            "y": 6,
            "width": 13,
            "height": 6,
            "properties": {
                "query": "SOURCE 'vector-nginx/logs' | fields @timestamp, @message, nginx.client as srcip, nginx.server\n  | stats count() as requestCount by srcip\n  | filter (requestCount>50)\n  #| stats count() as responseCount by nginx.server, bin(10m) as timeslice\n  #| filter @ip not like /(^172\\.17\\.[.]*)\n  | sort requestCount desc\n  | limit 100",
                "region": "us-east-2",
                "title": "Identify Top IPv4 Clients to NGINX Webserver Within Timeslice - Pie",
                "view": "pie"
            }
        },
        {
            "type": "log",
            "x": 11,
            "y": 18,
            "width": 13,
            "height": 6,
            "properties": {
                "query": "SOURCE 'vector-nginx/logs' | fields @timestamp, nginx.client as srcip | fields nginx.server as dstip | fields nginx.method as method | fields nginx.path as path | fields nginx.size as size\n\n  | filter (size>400 and method like \"GET\")\n\n  #| stats count(*) as numRequests by size, method, srcip, dstip | sort size\ndesc\n\n  | stats sum(size) as bytesTransferred by dstip, srcip | sort bytesTransferred\ndesc\n\n  | display bytesTransferred, dstip\n\n  | limit 50\n",
                "region": "us-east-2",
                "title": "Look for Potential Large File Transfers and Exfiltration - Pie",
                "view": "pie"
            }
        },
        {
            "type": "log",
            "x": 11,
            "y": 0,
            "width": 13,
            "height": 6,
            "properties": {
                "query": "SOURCE 'vector-nginx/logs' | fields @timestamp, nginx.client as srcip, nginx.agent as agent, nginx.server as dstip, nginx.status as status\n  | filter (status!=200 and status!=304)\n  | stats count() as requestCount by status, requestCount, srcip, agent #, bin(30s) as timeslice\n  #| stats count(*) by message as time \n  | sort requestCount desc\n  | display status, requestCount, srcip, agent\n  | limit 25",
                "region": "us-east-2",
                "title": "NGINX Status != 200 - Unusual HTTP Status Codes",
                "view": "table"
            }
        },
        {
            "type": "log",
            "x": 0,
            "y": 6,
            "width": 11,
            "height": 6,
            "properties": {
                "query": "SOURCE 'vector-nginx/logs' | fields @timestamp, @message, nginx.client as srcip, nginx.server\n  | stats count() as requestCount by srcip, requestCount, bin(30s) as timeslice\n  | filter (requestCount>50)\n  #| stats count() as responseCount by nginx.server, bin(10m) as timeslice\n  #| filter @ip not like /(^172\\.17\\.[.]*)\n  | display srcip, requestCount, timeslice\n  | sort requestCount desc\n  | limit 100",
                "region": "us-east-2",
                "title": "Identify Top IPv4 Clients to NGINX Webserver Within Timeslice",
                "view": "table"
            }
        },
        {
            "type": "log",
            "x": 0,
            "y": 12,
            "width": 24,
            "height": 6,
            "properties": {
                "query": "SOURCE 'vector-nginx/logs' | fields @timestamp, @message, nginx.client as srcip | fields nginx.path as path\n  | filter path like \"auth\" # | filter @message like \"auth\"\n  | stats count() as requestCount by srcip, path, requestCount, bin(30s) as timeslice\n  #| filter (requestCount>50) | #filter #| filter @ip not like /(^172\\.17\\.[.]*)\n  | display srcip, path, requestCount, timeslice\n  | sort requestCount desc\n  | limit 100",
                "region": "us-east-2",
                "title": "Identify Potential Brute Force, Password Sprays and Credential Stuffing Attacks",
                "view": "table"
            }
        },
        {
            "type": "log",
            "x": 0,
            "y": 18,
            "width": 11,
            "height": 6,
            "properties": {
                "query": "SOURCE 'vector-nginx/logs' | fields @timestamp, @message, nginx.server as dstip | fields nginx.status as statuscode\n  | stats count() as responseCount by dstip, statuscode, responseCount, bin(30s) as timeslice\n  | filter (responseCount>50)\n  #| filter @ip not like /(^172\\.17\\.[.]*)\n  | display dstip, statuscode, responseCount, timeslice\n  | sort responseCount desc\n  | limit 100",
                "region": "us-east-2",
                "title": "Identify Busy IPv4 NGINX Webserver's Within Timeslice",
                "view": "table"
            }
        },
        {
            "type": "log",
            "x": 0,
            "y": 30,
            "width": 24,
            "height": 6,
            "properties": {
                "query": "SOURCE 'vector-nginx/logs' | fields @timestamp, nginx.client as srcip | fields nginx.agent as agent | fields nginx.server as dstip | fields nginx.status as status | fields nginx.path as path\n  #| filter path like /(?i)(./env|/robots)/\n  #| filter (path=~/\\\\.*/ or path like/.*/)\n  #| filter path=~/\\\\.*.*/ or path like /\\.[a-z]*./\n  | filter not isblank(path) | filter path=~/\\\\.*.*/ or path like /(?i)\\.[a-zA-Z]*.*.(php|env|admin|js|aws|shell|bak|api|graphql|staging|dev|v1)/ or path like /.env/ and path != \"/\" # | stats count(*) by path\n  | stats count(*) as numRequests by path, srcip, agent, dstip\n  | sort path desc\n  | display numRequests, path, srcip, agent, dstip\n  | limit 2000",
                "region": "us-east-2",
                "title": "Identify Potential Recon and Footprint Attacks",
                "view": "table"
            }
        },
        {
            "type": "log",
            "x": 0,
            "y": 24,
            "width": 24,
            "height": 6,
            "properties": {
                "query": "SOURCE 'vector-nginx/logs' | fields @timestamp, nginx.client as srcip | fields nginx.server as dstip | fields nginx.method as method | fields nginx.path as path | fields nginx.size as size\n\n  | filter (size>400 and method like \"GET\")\n\n  #| stats count(*) as numRequests by size, method, srcip, dstip | sort size\ndesc\n\n  | stats sum(size) as bytesTransferred by dstip, srcip | sort bytesTransferred\ndesc\n\n  | display bytesTransferred, dstip, srcip, size, method\n\n  | limit 50\n",
                "region": "us-east-2",
                "title": "Look for Potential Large File Transfers and Exfiltration",
                "view": "table"
            }
        },
        {
            "type": "log",
            "x": 0,
            "y": 36,
            "width": 24,
            "height": 6,
            "properties": {
                "query": "SOURCE 'vector-nginx/logs' | fields @timestamp, nginx.client as srcip | fields nginx.agent as agent | fields nginx.server as dstip | fields nginx.method as method | fields nginx.path as path | fields nginx.size as size\n\n  | filter agent not like /(?i)(mozilla|samsung|safari)/ | filter not\nisblank(agent)\n\n  | sort agent asc\n\n  | display agent, dstip, path\n\n  #| limit 50\n",
                "region": "us-east-2",
                "title": "Hunt for Unusual User Agent Suspects or Scanners",
                "view": "table"
            }
        }
    ]
}
