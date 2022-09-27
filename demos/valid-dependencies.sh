#!/bin/sh
set -e

# Usage:
# * auto mode: `bash valid-dependencies.sh`
# * specyfic package mode: `bash valid-dependencies.sh cli`

TEMP_DIR="$HOME/valid_deps_temp"
SCRIPT_DIR=$(cd -- "$( dirname -- "${BASH_SOURCE[0]}" )" &> /dev/null && pwd)

cd $SCRIPT_DIR

if [ $1 ]; then
  PACKAGE="$1/package.json"
  if [ ! -f $PACKAGE ]; then
    echo "Not found $PACKAGE"
    exit 1
  fi
  PACKAGES=($PACKAGE)
else
  PACKAGES=$(find . -name 'package.json' -maxdepth 3 -not -path '*/.*')
fi

for PACKAGE in $PACKAGES
do
  cd $SCRIPT_DIR
  PACKAGE_DIR=$(dirname $PACKAGE)

  echo "---------------------------------------------------"
  echo "| package: $PACKAGE_DIR"
  echo "---------------------------------------------------"
  echo

  echo "Copying $PACKAGE_DIR project..."
  rm -rf $TEMP_DIR
  cp -R $PACKAGE_DIR $TEMP_DIR
  cd $TEMP_DIR
  rm -rf node_modules

  echo "Installing..."
  npm install --loglevel error --no-progress

  echo "Building..."
  npm run build
done

rm -rf $TEMP_DIR
