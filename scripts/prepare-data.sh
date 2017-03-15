#!/bin/bash

bin=./node_modules/.bin

function convert {
  iconv -f ISO-8859-15 -t UTF-8 $1 \
  | $bin/csvtojson --delimiter=';' --checkType=true --headers='["name", "total"]' \
  > ${1//.csv/.json}
}

convert data/boys-first-names.csv
convert data/boys-middle-names.csv
convert data/girls-first-names.csv
convert data/girls-middle-names.csv
