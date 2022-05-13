## 環境構築
    # プロジェクトルートに移動
    cd /github.com/TeamE-Hackathon/ChatApp

    # frontとapiのコンテナ起動
    docker compose up

    # frontとapiのコンテナ停止
    docker compose down


## ツール
### DynamoDBローカルのGUI

    #① ダウンロード(https://docs.aws.amazon.com/ja_jp/amazondynamodb/latest/developerguide/workbench.settingup.html)

    #② NoSQL Workbench アプリ起動

    #③ Amazon DynamoDB Loanch(青いボタン)

    #④ 左のメニューのOperation builder

    #⑤ Add connection(上の青いやつ)

    #⑥ DynamoDB local のタブを押下

    #⑦ connection_name: 任意ChatApp-localとか)、Port: 8000 で接続