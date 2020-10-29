const search_input = document.getElementById('search');
const results = document.getElementById('results');

let search_term = '';
let allData;

const fetchData = async () => {
	allData = await fetch('http://www.mocky.io/v2/5ba8efb23100007200c2750c').then(
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
		customdata => customdata.name.toLowerCase().includes(search_term.toLowerCase())+
		customdata.address.toLowerCase().includes(search_term.toLowerCase())+
		customdata.id.toLowerCase().includes(search_term.toLowerCase())+
		customdata.pincode.includes(search_term)+
		customdata.items.includes(search_term)
	).forEach(customdata => {
		const li = document.createElement('li');
		const pincode = document.createElement('p');
		const items = document.createElement('p');
		const data_name = document.createElement('p');
		const data_address = document.createElement('p');
		const user_guid = document.createElement('p');
		li.classList.add('search-item');
		data_name.innerText = customdata.name;
		data_name.classList.add('item-name');
		data_address.innerText = customdata.address;
		data_address.classList.add('item-addr');
		user_guid.innerText = customdata.id;
		user_guid.classList.add('item-guid');
		pincode.innerText = customdata.pincode;
		pincode.classList.add('item-pincode');
		items.innerText = customdata.items;
		items.classList.add('item-pincode');
		console.log(items);
		li.appendChild(user_guid);
		li.appendChild(data_name);
		li.appendChild(data_address);
		li.appendChild(pincode);
		li.appendChild(items);
		ul.appendChild(li);
	})
	 results.appendChild(ul);
}

// display initial allData
showData();

search_input.addEventListener('input', (e) => {
	search_term = e.target.value;
	if (results == null){
		console.log("No Results")
	}
	else
	{showData();}
});