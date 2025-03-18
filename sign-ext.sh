#!/bin/bash

set -a && source .env && set +a
bunx web-ext sign -s ./build --channel unlisted --approval-timeout 0