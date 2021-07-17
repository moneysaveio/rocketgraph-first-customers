import * as m from 'mithril';
import './index.scss';
import * as Form from "../form";
console.log("Form", Form);
// import Pizzly from 'pizzly-js'

// const pizzly = new Pizzly({ host: 'https://rocketgraph-first-customers.herokuapp.com' }) // Initialize Pizzly
// const myAPI = pizzly.integration('rocketgraph-first-customers-api-name') // Replace with the API slugname

// myAPI
//   .connect()
//   .then(({ authId }) => console.log('Sucessfully connected!', authId))
//   .catch(console.error)

export default {
	view (vnode: any) {
        return m("div", [
			m("h1", "Rocket Graph"),
			m("h3", "One click Hasura + Postgres deployment with authentication and S3 storage support right out of the box."),
			m("h3", "Basically your Postgres DB on steroids!"),
            m(Form.default),
        ])
	}
};