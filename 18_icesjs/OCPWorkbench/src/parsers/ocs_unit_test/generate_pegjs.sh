#!/usr/bin/env bash

set -x
set -e
m4 02_type_encoding.m4 > 02_type_encoding.pegjs
m4 03_literal_type.m4 > 03_literal_type.pegjs
m4 03_block_parameter_list.m4 > 03_block_parameter_list.pegjs
m4 04_expression.m4 > 04_expression.pegjs
m4 05_expression_list_or_tuple.m4 > 05_expression_list_or_tuple.pegjs
m4 06_body.m4 > 06_body.pegjs
m4 07_block_spec.m4 > 07_block_spec.pegjs
m4 07_ocs_group.m4 > 07_ocs_group.pegjs
m4 08_body_final.m4 > 08_body_final.pegjs
m4 09_ocs_remotelib_jslib.m4 > 09_ocs_remotelib_jslib.pegjs

m4 ../ocs.m4 > ../ocs.pegjs
pegjs -o ../ocs-parser.js ../ocs.pegjs
ruby fix_ocs_module.rb
