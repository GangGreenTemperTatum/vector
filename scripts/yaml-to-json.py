import yaml
import json

with open('config.yml', 'r') as file:
    configuration = yaml.safe_load(file)

with open('config.json', 'w') as json_file:
    json.dump(configuration, json_file)
    
output = json.dumps(json.load(open('config.json')), indent=2)
print(output)
