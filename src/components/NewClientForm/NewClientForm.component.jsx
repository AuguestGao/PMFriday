import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";

const NewClientForm = () => {
	// const [name, setName] = useState('');
	// const [address, setAddress] = useState('');
	// const [isVirtual, setIsVirtual] = useState(false);
	// const [treatment, setTreatment] = useState(0)
	// const [travel, setTravel] = useState(0)
	// const [documentation, setDocumentation] = useState(0)
	// const [planning, setPlanning] = useState(0)
	// const [fileSearch, setFileSearch] = useState(0)
	// const [assessment, setAssessment] = useState(0)

	const [client, setClient] = useState({
		name: "",
		address: "",
		isVirtual: false,
		treatment: 0,
		travel: 0,
		documentation: 0,
		planning: 0,
		fileSearch: 0,
		assessment: 0,
		note: "",
	});

	const onNameChange = (e) => setClient({ ...client, name: e.target.value });
	const onAddessChange = (e) =>
		setClient({ ...client, address: e.target.value });
	const onIsVirtualChange = (e) =>
		setClient({ ...client, isVirtual: !e.target.checked });
	// const onNameChange = (e) => setClient({ ...client, name: e.target.value });
	// const onNameChange = (e) => setClient({ ...client, name: e.target.value });
	// const onNameChange = (e) => setClient({ ...client, name: e.target.value });
	// const onNameChange = (e) => setClient({ ...client, name: e.target.value });
	// const onNameChange = (e) => setClient({ ...client, name: e.target.value });
	// const onNameChange = (e) => setClient({ ...client, name: e.target.value });

	return (
		<section>
			<h2>Create a new client file</h2>
			<form>
				<label htmlFor="clientName">Name:</label>
				<input
					type="text"
					id="clientName"
					name="clientName"
					value={client.name}
					placeholder="Enter client name"
					onChange={onNameChange}
				/>
				<label htmlFor="clientAddress">Address:</label>
				<input
					type="text"
					id="clientAddress"
					name="clientAddress"
					value={client.address}
					placeholder="Enter client address"
					onChange={onAddessChange}
				/>
				<label htmlFor="clientIsVirtual">Virtual </label>
				<input
					type="checkbox"
					id="clientIsVirtual"
					name="clientIsVirtual"
					onChange={onIsVirtualChange}
				/>
			</form>
		</section>
	);
};

export default NewClientForm;
