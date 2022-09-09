#!/usr/bin/env bash

BASE_DIR="$(dirname "$(realpath "$0")")"

# When developing locally, the dist folder would not yet exists and hence the binary would be missing causing
# installation to fail. To get around it, we customized rush.json to call this script to create empty files to allow
# installation, then build it after the install
mkdir -p $BASE_DIR/dist/bin
touch $BASE_DIR/dist/bin/run-eslint.js
touch $BASE_DIR/dist/bin/run-linter.js
touch $BASE_DIR/dist/bin/run-prettier.js
touch $BASE_DIR/dist/bin/run-typedoc.js
