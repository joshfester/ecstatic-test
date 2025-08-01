#!/bin/bash

#set -e

rm -rf ./scraped/*

httrack "https://americor.com/" \
  -O "./scraped" \
  --debug-log \
  --depth=3 ${comment# set the mirror depth to N} \
  --ext-depth=3 ${comment# set the external links depth to N} \
  --near ${comment# get non-html files 'near' an html file} \
  -a ${comment# stay on the same address} \
  -B ${comment# can both go up&down into the directory structure} \
  -N4 ${comment# HTML in web/, images/other in web/xxx, where xxx is the file extension} \
  --sockets=16 ${comment# number of multiple connections} \
  --keep-links=0 ${comment# keep original links (K0 *relative link, K absolute links, K3 absolute URI links)} \
  --robots=0 ${comment# follow robots.txt and meta robots tags (0=never,1=sometimes,* 2=always) } \
  -%c20 ${comment# maximum number of connections/seconds} \
  --timeout=10 ${comment# timeout, number of seconds after a non-responding link is shutdown} \
  --updatehack ${comment# update hacks: various hacks to limit re-transfers when updating (identical size, bogus response..)} \
  --mirror ${comment# mirror web sites} \
  --cache=2 ${comment# create/use a cache for updates and retries (C0 no cache,C1 cache is prioritary,* C2 test update before)} \
  '-*' \
  '+*americor.com/*.css' '+*americor.com/*.js' '+*americor.com/' \
  '+*americor.com/_image*' '+*mage.mux.com*' 