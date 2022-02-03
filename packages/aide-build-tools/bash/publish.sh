#!/usr/bin/env bash

localEnvFile="$(pwd)/.env"

if [[ -f "$localEnvFile" ]]; then
    # shellcheck source=./env
    source "$localEnvFile"
fi

echo -n "Specify the NPM auth token (current: $NPM_AUTH_TOKEN): "
read -r confirmAuthToken
if [[ "$confirmAuthToken" != "" ]]; then
    NPM_AUTH_TOKEN=$confirmAuthToken
fi

if [[ "$NPM_AUTH_TOKEN" == "" ]]; then
    echo "The NPM auth token must be provided"
    exit 1
fi

echo -n "Publish as restricted packages? [y/n] (y): "
read -r accessLevel
if [[ "$accessLevel" != "n" ]]; then
    accessLevel="restricted"
else
    accessLevel="public"
fi

export NPM_AUTH_TOKEN=$NPM_AUTH_TOKEN
./build.sh && rush publish -a -p -b master --set-access-level "$accessLevel"
