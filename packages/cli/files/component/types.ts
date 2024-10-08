{% if COMPONENT_PROPERTIES.includes('Size') %}import { ComponentSize } from '../types'{% endif %}
{% if COMPONENT_PROPERTIES.includes('Size') %}

export type {{ COMPONENT_PASCAL }}Size = ComponentSize{% endif %}
