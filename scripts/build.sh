#!/bin/sh

set -e

rm -rf /app/dist

npm set progress false
npm install --no-optional
npm prune
npm run generate
