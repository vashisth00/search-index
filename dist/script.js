const search_input = document.getElementById('search');
const results = document.getElementById('results');

let search_term = '';
let allData;

const fetchData = async () => {
	allData = await fetch('https://raw.githubusercontent.com/vashisth00/search-index/master/dist/normal.json').then(
		res => res.json()
	);
}

const showData = async () => {
	// clearHTML
	results.innerHTML = '';
	
	// getting the data
	await fetchData();
	
	// creating the structure
	const ul = document.createElement("ul");
	ul.classList.add('allData');
	
	allData.filter(
		country => country.name.toLowerCase().includes(search_term.toLowerCase())+
		country.address.toLowerCase().includes(search_term.toLowerCase())+
		country.guid.toLowerCase().includes(search_term.toLowerCase())
	).forEach(country => {
		const li = document.createElement('li');
		const data_name = document.createElement('p');
		const data_address = document.createElement('p');
		const user_guid = document.createElement('p');
		const breaking = document.createElement('br');
		var spans = document.createElement("SPAN"); 
		li.classList.add('search-item');
		data_name.innerText = country.name;
		data_name.classList.add('item-name');
		data_address.innerText = country.address;
		data_address.classList.add('item-addr');
		user_guid.innerText = country.guid;
		user_guid.classList.add('item-guid');
		li.appendChild(user_guid);
		li.appendChild(data_name);
		li.appendChild(data_address);
		ul.appendChild(li);
	})
	 results.appendChild(ul);
}

// display initial allData
showData();

search_input.addEventListener('input', (e) => {
	search_term = e.target.value;
	if (results == null){
		console.log("none")
	}
	else
	// re-display allData again based on the new search_term
	showData();
});

// From StackOverflow https://stackoverflow.com/questions/2901102/how-to-print-a-number-with-commas-as-thousands-separators-in-javascript
function numberWithCommas(x) {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}