# Jenkins-sam-integration

The project contains resources that needs to be deployed via Jenkins. SAM templates for the same is added.

Do Note deploying these services will incur cost.

# Project Structure

* /src: Directory containing sample lambda service
* docker-compose.yaml: Compose file to spawn local jenkins.
* template.yaml: SAM template that deploys 1 lambda service, 1 Step Function, Adds 1 custom bus and attaches rule to invoke the AWS State Machine/Step Function.
* StateMachineConsumer.asl.json: AWS Step Function ASL.
* Jenkinsfile: Configuration for Jenkins

# Steps

```
To check locally sam configurations
sam build
sam deploy --guided

# If any issues in guided the toml file is also attached just change params and deploy using the below command
sam deploy --config-env dev
```

Spawing local jenkins
* docker compose up -d
