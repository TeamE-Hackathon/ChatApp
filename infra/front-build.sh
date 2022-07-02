#!/bin/bash
set -u

api_endpoint=$1
if [ -z “${api_endpoint}” ]; then
  exit 1
fi

s3_bucket=$2
if [ -z “${s3_bucket}” ]; then
  exit 1
fi

echo ${api_endpoint}

cd ./front
touch .env.production

echo "REACT_APP_API_ENDPOINT=${api_endpoint}" >> .env.production

cat .env.production
npm ci
npm run build

# バケット内をdelete
aws s3 rm ${s3_bucket} --recursive

# sync s3
aws s3 sync build ${s3_bucket}