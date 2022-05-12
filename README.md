## 環境構築
    # プロジェクトルートに移動
    cd /github.com/TeamE-Hackathon/ChatApp

    # frontとapiのコンテナ起動
    docker compose up

    # frontとapiのコンテナ停止
    docker compose down


## ツール
### DynamoDBローカルのGUI
    # (参照先)
    ( https://github.com/Arattian/DynamoDb-GUI-Client )

    #① /ChatAppと並列に作りたいので階層一個下がる
    cd ../

    #② クローン
    git clone https://github.com/Arattian/DynamoDb-GUI-Client.git

    #③ クローンしたディレクトリに移動
    cd DynamoDb-GUI-Client

    #④ npm install
    npm i

    #⑤ Electron serve
    npm run electron:serve

    #⑥ Vue Cli serve (⑤,⑥両方実行する必要あります)
    npm start