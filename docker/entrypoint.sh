#!/bin/sh
set -e

git config --global user.name "$GIT_USER_NAME"
git config --global user.email $GIT_USER_EMAIL

if [ ! -f "angular.json" ]; then
  ng new "$ANGULAR_APP_NAME" --directory ./ --force --skip-git
  echo ".env" >> .gitignore
  git add .
  git commit -m "Initial angular project commit"
  git remote rm origin
fi

exec "$@"