# dynamoDB CLI
aws dynamodb \
create-table \
--endpoint-url http://localhost:8000 \
--cli-input-json file://json/musicTableDefinition.json

# 1. DynamoDB cfn
aws cloudformation deploy \
    --stack-name dynamoDB \
    --template-file ./infra/cfn/dynamodb.yml

# cd /Users/shoyo/05.Hackson/ChatApp/infra/cfn


# 2. vpc
aws cloudformation deploy \
    --stack-name vpc \
    --template-file ./infra/cfn/vpc.yml \
    --parameter-overrides $(cat /Users/shoyo/05.Hackson/ChatApp/infra/cfn/.env)

# 3. cloudFront作ってからS3バケットを作る
# https://dev.classmethod.jp/articles/hosting-cfn/
aws cloudformation deploy \
    --stack-name cloudfront-S3 \
    --template-file ./infra/cfn/cloudfront-S3.yml \
    --parameter-overrides $(cat /Users/shoyo/05.Hackson/ChatApp/infra/cfn/.env)

# 4. elbをpublic
# アクセスポイントをもてる
# ELBに証明書をつけるとIGW-> HTTPs -> ELB -> http ->ecs
aws cloudformation deploy \
    --stack-name elb \
    --template-file ./infra/cfn/elb.yml \
    --parameter-overrides $(cat /Users/shoyo/05.Hackson/ChatApp/infra/cfn/.env)


# 5. IAM
aws cloudformation deploy \
    --stack-name iam \
    --template-file ./infra/cfn/iam.yml \
    --capabilities CAPABILITY_NAMED_IAM

# 6. ecsをprivate
# クラスター
  # VPCの選択
  # セキュリティグループ

# タスク定義
  # 起動タイプ Fargate
  # コンテナ定義
    # メモリ
    # イメージ
    # ポートマッピング 3001:3001 (ホスト:コンテナ)
    # TODO: DynamoDBのエンドポイントを環境変数で渡す
aws cloudformation deploy \
    --stack-name ecs \
    --template-file ./infra/cfn/ecs.yml \
    --parameter-overrides $(cat /Users/shoyo/05.Hackson/ChatApp/infra/cfn/.env)


# サンプルコマンド
aws cloudformation deploy \
  --stack-name cloudtech-app \
  --template-file hogehoge \
  --parameter-overrides $(cat .env) \
  --capabilities CAPABILITY_NAMED_IAM \
  --no-execute-changeset


# ECR
aws ecr list-images \
    --repository-name chat-app

# # 準備1
TASK_DEF_ARN=$(aws ecs list-task-definitions \
--family-prefix "ChaChatApi" \
--query "reverse(taskDefinitionArns)[0]" \
--output text) \
&& echo "${TASK_DEF_ARN}"

# # 準備2
SUBNET_ID=subnet-0668a8c1b8664e69e
SG_ID=sg-0b3eaa4e844d56acf
NETWORK_CONFIG="awsvpcConfiguration={subnets=[${SUBNET_ID}],securityGroups=[${SG_ID}],assignPublicIp=ENABLED}"

aws ecs run-task \
--cluster "chachat-cluster-cli" \
--task-definition "${TASK_DEF_ARN}" \
--network-configuration "${NETWORK_CONFIG}" \
--launch-type FARGATE