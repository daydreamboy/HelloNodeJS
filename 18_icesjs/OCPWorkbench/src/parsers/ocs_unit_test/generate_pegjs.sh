#!/usr/bin/env bash

set -x
set -e
m4 type_encoding.m4 > type_encoding.pegjs
m4 literal_type.m4 > literal_type.pegjs
m4 block_parameter_list.m4 > block_parameter_list.pegjs
m4 expression.m4 > expression.pegjs
m4 expression_list_or_tuple.m4 > expression_list_or_tuple.pegjs
