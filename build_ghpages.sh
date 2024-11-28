#!/bin/bash

yarn build --base=factorio-svg-blueprints
rm -rf docs/*
cp -r dist/* docs/
