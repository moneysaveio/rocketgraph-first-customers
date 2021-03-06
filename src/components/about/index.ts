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

// function([string1, string2],target id,[color1,color2])
// consoleText(['Hello World.', 'Console Text', 'Made with Love.'], 'text',['tomato','rebeccapurple','lightblue']);

function consoleText(words: any, id: any, colors: any) {
  if (colors === undefined) colors = ['#fff'];
  var visible = true;
  var con = document.getElementById('console') as any;
  var letterCount = 1;
  var x = 1;
  var waiting = false;
  var target = document.getElementById(id) as any;
  target.setAttribute('style', 'color:' + colors[0])
  window.setInterval(function() {

    if (letterCount === 0 && waiting === false) {
      waiting = true;
      target.innerHTML = words[0].substring(0, letterCount)
      window.setTimeout(function() {
        var usedColor = colors.shift();
        colors.push(usedColor);
        var usedWord = words.shift();
        words.push(usedWord);
        x = 1;
        target.setAttribute('style', 'color:' + colors[0])
        letterCount += x;
        waiting = false;
      }, 1000)
    } else if (letterCount === words[0].length + 1 && waiting === false) {
      waiting = true;
      window.setTimeout(function() {
        x = -1;
        letterCount += x;
        waiting = false;
      }, 1000)
    } else if (waiting === false) {
      target.innerHTML = words[0].substring(0, letterCount)
      letterCount += x;
    }
  }, 120)
  window.setInterval(function() {
    if (visible === true) {
      con.className = 'console-underscore hidden'
      visible = false;

    } else {
      con.className = 'console-underscore'

      visible = true;
    }
  }, 400)
}

export default {
	oncreate () {
		consoleText(['Your Postgres on steroids!'], 'text',['tomato']);
		window.onload = (function() {
			const butt = document.getElementById("submit-button") as any;
			console.log(butt);
			butt.onclick = () => {
				const content = {
					method: "POST",
					url: " http://localhost:8000/add",
					body: JSON.stringify({
						name: "kaushik",
						email: "kaushik.varanasi@gmail.com"
					}),
					config: function(xhr: any) {
						xhr.setRequestHeader('X-Requested-With', 'XMLHttpRequest')
						xhr.setRequestHeader('Content-Type', "application/json;charset=UTF-8")
					  }
				};
				m.request(content)
				.then(function(result) {
					console.log(result);
				})
			}
		})
	},
	view (vnode: any) {
        return m("div", [
			m("div.stars"),
			m("div.twinkling"),
			m("div.clouds"),
			m("div.title-container", [
				// m("div.two.alt-two",
				// 	m("h1", [
				// 		"alternate",
				// 		m("span", "Example Tagline Text")
				// 	])
				// ),
				m("h1.title", "Rocket Graph"),
				// m("h2.subtitle", "One click Hasura + Postgres deployment"),
				// m("h2.subtitle", "with authentication and S3 storage support right out of the box."),
			]),
			m("div.console-container", [
				m("span", {id: "text"}),
				m("div.console-underscore", {id: 'console'}, m.trust("&#95")),
			]),
			m("row", [

			]),
			// m("h3", "Basically your Postgres DB on steroids!"),
            // m(Form.default),
        ])
	}
};