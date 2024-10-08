import {
  {% for item in COMPONENT_PROPERTIES %}{{item}},
  {% endfor %}{% for item in COMPONENT_PROPERTIES %}{% if item !== 'Value' %}{{item}}Default,
  {% endif %}{% endfor %}
} from '../api'
import XDefaultProps, { Emits as XEmits, Props as XProps, Slots as XSlot } from './api'

export type Slots = XSlot

export type Emits = XEmits

export type Props = XProps{% for item in COMPONENT_PROPERTIES %} & {{item}}{% endfor %}

export const DefaultProps = {
  {% for item in COMPONENT_PROPERTIES %}{% if item !== 'Value' %}...{{item}}Default,
  {% endif %}{% endfor %}...XDefaultProps
}
