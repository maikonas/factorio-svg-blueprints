#!/bin/bash

git merge main

yarn build --base=factorio-svg-blueprints
rm -rf docs/*
cp -r dist/* docs/

git add .
git commit -m "Update gh-pages"
git push gh-pages
