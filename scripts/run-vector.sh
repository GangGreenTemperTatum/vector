#!/bin/bash

if [[ $1 == "clean" ]]
then
  rm -vrf tmp/vector/*
  rm -vrf out/*
elif [[ $1 == "ingest" ]]
then
  vector -v -c $2
elif [[ $1 == "list" ]]
then
  ls -al config/*.yml

else
  echo
  echo "== A simple wrapper for using vector.dev =="
  echo "./run-vector clean                 removes vector temp directory so you can re-ingest"
  echo "./run-vector ingest <config_file>  ingest data using a config file"
  echo "./run-vector list                  list the ingestion files"
  echo
fi
