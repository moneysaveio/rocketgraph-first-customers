import * as m from 'mithril'
import nav from '../nav'
import './index.scss'

export default {
	view (vnode) {
        return m("form", [
            m("label.label", "Name (optional)"),
            m("input.input[type=text][placeholder=Name]"),
            m("label.label", "Email"),
            m("input.input[type=text][placeholder=Email]"),
			m(".tagline", "OR"),
            m("label.label", "Twitter id"),
            m("input.input[type=text][placeholder=Twitter]"),
			m(".tagline", "OR"),
            m("label.label", "Reddit"),
            m("input.input[type=text][placeholder=Reddit]"),
            m("button.button[type=button]", "Save"),
        ])
	}
} as m.Component<{}, {}>
