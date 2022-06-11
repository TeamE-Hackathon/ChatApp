## 環境構築

    # プロジェクトルートに移動
    cd /github.com/TeamE-Hackathon/ChatApp

    # frontとapiのコンテナ起動
    docker compose up

    #（frontとapiのコンテナ停止）
    docker compose down

    # (Module not found: Error: Can't resolve ...というエラーが出た場合)
    ./fix-deps.sh

## DynamoDB テーブル操作方法

    # テーブル作成(例. chatsテーブル作成)
    ./local.sh create_table chats

    # テーブル一覧取得
    ./local.sh list_tables

    # テーブル情報表示
    ./local.sh describe_table chats

    # テーブル削除(例. chatsテーブル削除)
    ./local.sh delete_table chats

## ツール

### NoSQL Workbench

    #① ダウンロード(https://docs.aws.amazon.com/ja_jp/amazondynamodb/latest/developerguide/workbench.settingup.html)

    #② NoSQL Workbench アプリ起動

    #③ Amazon DynamoDB Loanch(青いボタン)

    #④ 左のメニューのOperation builder

    #⑤ Add connection(上の青いやつ)

    #⑥ DynamoDB local のタブを押下

    #⑦ connection_name: 任意ChatApp-localとか)、Port: 8000 で接続

### 技術スタック

    React   v18.1.0
    Node.js v18.1.0
