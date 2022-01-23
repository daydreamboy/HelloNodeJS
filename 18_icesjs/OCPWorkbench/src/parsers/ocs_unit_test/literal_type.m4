syscmd(`cat ../ocs_components/ocs_utility_function.pegjs')dnl


start = literal

syscmd(`cat ../ocs_components/ocs_literal_type.pegjs')

syscmd(`cat ../ocs_components/ocs_type_encoding.pegjs')

syscmd(`cat ../ocs_components/ocs_identifier.pegjs')

syscmd(`cat ../ocs_components/ocs_auxiliary.pegjs')