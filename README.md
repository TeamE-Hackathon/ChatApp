### 環境構築
    # プロジェクトルートに移動
    cd /github.com/TeamE-Hackathon/ChatApp

    # frontとapiのコンテナ起動
    docker compose up

    # frontとapiのコンテナ停止
    docker compose down

    # DynamoDB ローカル開発環境用のGUI(https://github.com/Arattian/DynamoDb-GUI-Client)
    git clone https://github.com/Arattian/DynamoDb-GUI-Client.git
    cd DynamoDb-GUI-Client
    npm i
    # Electron serve
    npm run electron:serve
    # Vue Cli serve
    npm start