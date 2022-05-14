#!/bin/bash

if [ "x$1" = "x" ]; then
  echo "Error: You have to specify which action to be excuted. [ create_table / list_tables / describe_table / delete_table ]" 1>&2
  exit 1
fi

# テーブルの作成
if [ "$1" = "create_table" ]; then
    if [ "x$2" = "x" ]; then
        echo "Error: You have to specify the table you want to create" 1>&2
        exit 1
    fi
    node ./api/db/schema/$2_schema.js
fi

# テーブル一覧取得
if [ "$1" = "list_tables" ]; then
    node ./api/db/tool/ddb_listtables.js
fi

# テーブル情報表示
if [ "$1" = "describe_table" ]; then
    if [ "x$2" = "x" ]; then
        echo "Error: You have to specify the table you have created" 1>&2
        exit 1
    fi
    node ./api/db/tool/ddb_describetable.js "$2"
fi

# テーブル削除
if [ "$1" = "delete_table" ]; then
    if [ "x$2" = "x" ]; then
        echo "Error: You have to specify the table you want to delete" 1>&2
        exit 1
    fi
    node ./api/db/tool/ddb_deletetable.js "$2"
fi