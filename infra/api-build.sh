#!/bin/bash
set -u

ecr_registry=$1
if [ -z “${ecr_registry}” ]; then
  exit 1
fi

repository_name=$2
if [ -z “${repository_name}” ]; then
  exit 1
fi

# image_tag is commitID
image_tag=$3
if [ -z “${image_tag}” ]; then
  exit 1
fi

# create new repository on ecr if it doesn't exist
aws ecr describe-repositories  \
  --repository-names ${repository_name} > /dev/null 2>&1

if [ $? -ne 0 ]; then
  aws ecr create-repository  \
      --repository-name ${repository_name}  \
      --region ap-northeast-1
fi

# api側は、npm run build いらない

# build image with tags (commitID, latest)
BASE=${ecr_registry}/${repository_name}
TAG1=${BASE}:${image_tag}
TAG2=${BASE}:latest
image_name="chat-app-api-prod"
# docker build ./api -t ${TAG1} -t ${TAG2}
docker build ./api -t ${TAG2}

# login ecr
aws ecr get-login-password |\
docker login \
  --username AWS \
  --password-stdin ${ecr_registry}

# push image
docker push --all-tags ${ecr_registry}/${repository_name}

