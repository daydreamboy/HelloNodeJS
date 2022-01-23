syscmd(`cat ../ocs_components/ocs_utility_function.pegjs')dnl


start = expression_list / expression_tuple

include(`../ocs_components/ocs_expression_list_or_tuple.pegjs')

include(`../ocs_components/ocs_expression.pegjs')

include(`../ocs_components/ocs_assign.pegjs')

include(`../ocs_components/ocs_literal_type.pegjs')

include(`../ocs_components/ocs_type_encoding.pegjs')

include(`../ocs_components/ocs_identifier.pegjs')

include(`../ocs_components/ocs_auxiliary.pegjs')