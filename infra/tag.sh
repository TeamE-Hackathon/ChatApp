#!/bin/bash
set -eu

git tag -d 0.0.1
git push origin --delete 0.0.1

git ls-remote --tags

git tag -a 0.0.1 -m '' HEAD
git push origin --tags