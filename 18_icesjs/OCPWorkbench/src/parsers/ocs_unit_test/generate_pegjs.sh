#!/usr/bin/env bash

set -x
set -e
m4 02_type_encoding.m4 > 02_type_encoding.pegjs
m4 03_literal_type.m4 > 03_literal_type.pegjs
m4 03_block_parameter_list.m4 > 03_block_parameter_list.pegjs
m4 04_expression.m4 > 04_expression.pegjs
m4 05_expression_list_or_tuple.m4 > 05_expression_list_or_tuple.pegjs
m4 06_body.m4 > 06_body.pegjs
