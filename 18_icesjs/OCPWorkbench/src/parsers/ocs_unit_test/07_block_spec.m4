syscmd(`cat ../ocs_components/01_ocs_utility_function.pegjs')dnl


start = block_spec

syscmd(`cat ../ocs_components/07_ocs_block_spec.pegjs')

syscmd(`cat ../ocs_components/03_ocs_block_parameter_list.pegjs')

syscmd(`cat ../ocs_components/06_ocs_body.pegjs')

syscmd(`cat ../ocs_components/06_ocs_statement_list.pegjs')

syscmd(`cat ../ocs_components/05_ocs_expression_list_or_tuple.pegjs')

syscmd(`cat ../ocs_components/04_ocs_expression.pegjs')

// #syscmd(`cat ../ocs_components/04_ocs_expression_p1.pegjs')

syscmd(`cat ../ocs_components/07_ocs_block_spec_expression_p1.pegjs')

syscmd(`cat ../ocs_components/03_ocs_literal_type.pegjs')

syscmd(`cat ../ocs_components/02_ocs_type_encoding.pegjs')

syscmd(`cat ../ocs_components/01_ocs_assign.pegjs')

syscmd(`cat ../ocs_components/01_ocs_identifier.pegjs')

syscmd(`cat ../ocs_components/01_ocs_auxiliary.pegjs')
