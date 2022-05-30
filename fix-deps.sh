#!/bin/bash
set -e

# 停止中のコンテナ全削除
docker ps --filter status=exited -q | xargs docker rm

# ビルドし直してコンテナを起動
docker compose build --no-cache && docker compose up