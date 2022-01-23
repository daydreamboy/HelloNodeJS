syscmd(`cat ../ocs_components/01_ocs_utility_function.pegjs')dnl


start = literal

syscmd(`cat ../ocs_components/03_ocs_literal_type.pegjs')

syscmd(`cat ../ocs_components/02_ocs_type_encoding.pegjs')

syscmd(`cat ../ocs_components/01_ocs_identifier.pegjs')

syscmd(`cat ../ocs_components/01_ocs_auxiliary.pegjs')
