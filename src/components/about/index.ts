import * as m from 'mithril';
import nav from '../nav';
import './index.scss';
import Pizzly from 'pizzly-js'

// const pizzly = new Pizzly({ host: 'https://rocketgraph-first-customers.herokuapp.com' }) // Initialize Pizzly
// const myAPI = pizzly.integration('rocketgraph-first-customers-api-name') // Replace with the API slugname

// myAPI
//   .connect()
//   .then(({ authId }) => console.log('Sucessfully connected!', authId))
//   .catch(console.error)

export default {
	view (vnode) {
		const email = "";
		const reddit = "";
		const twitter = "";
		const name = "";
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
} as m.Component<{}, {}>
