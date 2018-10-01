#!/bin/sh
set -e

git config --global user.name "$GIT_USER_NAME"
git config --global user.email $GIT_USER_EMAIL

if [ ! -f "angular.json" ]; then
  ng new "$ANGULAR_APP_NAME" --directory ./ --force
  git rm --cached .env
  echo ".env" >> .gitignore
  git add .
  git commit -m "Ignore .env"
fi

exec "$@"