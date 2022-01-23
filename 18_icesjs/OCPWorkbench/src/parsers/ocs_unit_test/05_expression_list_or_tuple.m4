syscmd(`cat ../ocs_components/01_ocs_utility_function.pegjs')dnl


start = expression_list / expression_tuple

include(`../ocs_components/05_ocs_expression_list_or_tuple.pegjs')

include(`../ocs_components/04_ocs_expression.pegjs')

include(`../ocs_components/01_ocs_assign.pegjs')

include(`../ocs_components/03_ocs_literal_type.pegjs')

include(`../ocs_components/02_ocs_type_encoding.pegjs')

include(`../ocs_components/01_ocs_identifier.pegjs')

include(`../ocs_components/01_ocs_auxiliary.pegjs')
