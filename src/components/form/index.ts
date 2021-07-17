import * as m from 'mithril';
import './index.scss';

export default {
	view: function(vnode: any) {
		const email = "";
		const reddit = "";
		const twitter = "";
		const name = "";
        return m("form", [
            m("label.label", "Name (optional)"),
            m("input.input[type=text][placeholder=Name]"),
            m("label.label", "Email"),
            m("input.input[type=text][placeholder=Email]"),
            m("label.label", "Twitter id (optional)"),
            m("input.input[type=text][placeholder=Twitter]"),
            m("button.button[type=button]",{
				onclick: function() {
					// call API
					if(!(email === "" && reddit === "" && twitter === "")) {
						console.log(name, email, reddit, twitter);
					}
				}
			}, "Save"),
        ])
	}
}
