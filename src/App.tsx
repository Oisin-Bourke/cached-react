import { useState } from "react"
import "./App.css"
import { memoize } from "./App.util"

const slowConcatAsync = async (name: string, pet: string) => {
	await new Promise((resolve) => setTimeout(resolve, 3000))
	return `Hello ${name}, your pet is ${pet}`
}

const memoizedSlowConcat = memoize(slowConcatAsync)

const defaultFormData = {
	name: "",
	pet: "",
}

function App() {
	const [formData, setFormData] = useState(defaultFormData)

	const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
		const { name, value } = event.target

		setFormData((prevData) => ({
			...prevData,
			[name]: value,
		}))
	}

	const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
		event.preventDefault()

		const { name, pet } = formData
		const result = await memoizedSlowConcat(name, pet)
		console.log(result)

		setFormData(defaultFormData)
	}

	return (
		<form className='flexColumn' onSubmit={handleSubmit}>
			<label>
				Name:
				<input
					type='text'
					name='name'
					onChange={handleChange}
					value={formData.name}
				/>
			</label>
			<label>
				Pet:
				<input
					type='text'
					name='pet'
					onChange={handleChange}
					value={formData.pet}
				/>
			</label>
			<button type='submit'>Submit</button>
		</form>
	)
}

export default App
