start = block_param_list

syscmd(`cat ../ocs_components/03_ocs_block_parameter_list.pegjs')

syscmd(`cat ../ocs_components/02_ocs_type_encoding.pegjs')

syscmd(`cat ../ocs_components/01_ocs_identifier.pegjs')

syscmd(`cat ../ocs_components/01_ocs_auxiliary.pegjs')
