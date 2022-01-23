syscmd(`cat ../ocs_components/ocs_utility_function.pegjs')dnl


start = literal

include(`../ocs_components/ocs_literal_type.pegjs')

include(`../ocs_components/ocs_type_encoding.pegjs')

include(`../ocs_components/ocs_identifier.pegjs')

include(`../ocs_components/ocs_auxiliary.pegjs')