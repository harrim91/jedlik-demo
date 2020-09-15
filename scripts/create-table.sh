#!/bin/bash

export AWS_ACCESS_KEY_ID=xxx
export AWS_SECRET_ACCESS_KEY=xxx
export AWS_DEFAULT_REGION=local

sleep 2

if aws dynamodb --endpoint-url http://localhost:8000 describe-table --table-name ecommerce-store; then
  exit 0
else
  aws dynamodb \
    --endpoint-url http://localhost:8000 \
    create-table \
    --table-name ecommerce-store \
    --attribute-definitions  AttributeName=pk,AttributeType=S AttributeName=sk,AttributeType=S \
    --key-schema AttributeName=pk,KeyType=HASH AttributeName=sk,KeyType=RANGE \
    --provisioned-throughput ReadCapacityUnits=5,WriteCapacityUnits=5 \
    --global-secondary-indexes \
        "[
            {
                \"IndexName\": \"reverse-index\",
                \"KeySchema\": [
                    {\"AttributeName\":\"sk\",\"KeyType\":\"HASH\"},
                    {\"AttributeName\":\"pk\",\"KeyType\":\"RANGE\"}
                ],
                \"Projection\": {
                    \"ProjectionType\":\"ALL\"
                },
                \"ProvisionedThroughput\": {
                    \"ReadCapacityUnits\": 5,
                    \"WriteCapacityUnits\": 5
                }
            }
        ]"
fi
