syscmd(`cat ../ocs_components/ocs_utility_function.pegjs')dnl


start = expression

syscmd(`cat ../ocs_components/ocs_expression_list_or_tuple.pegjs')

syscmd(`cat ../ocs_components/ocs_expression.pegjs')

syscmd(`cat ../ocs_components/ocs_assign.pegjs')

syscmd(`cat ../ocs_components/ocs_literal_type.pegjs')

syscmd(`cat ../ocs_components/ocs_type_encoding.pegjs')

syscmd(`cat ../ocs_components/ocs_identifier.pegjs')

syscmd(`cat ../ocs_components/ocs_auxiliary.pegjs')