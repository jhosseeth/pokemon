import axios from 'axios'

const pokeAPI = {
	nextPokemons: '',
	getPokemon(url) {
		return new Promise((resolve, reject) => {
			axios.get(url).then(({ data }) => {
				resolve({
					id: data.id,
					name: data.name,
					type: data.types.map(item => item.type.name).join(', '),
					img: data.sprites['front_default']
				})
			})
		})
	},
	getPokemons(url = 'https://pokeapi.co/api/v2/pokemon') {
		console.log('getPokemons => ', url)
		return new Promise((resolve, reject) => {
			axios.get(url)
		    .then(async ({ data }) => {
		        const pokemons = data.results.map(async item => await this.getPokemon(item.url))
		        this.nextPokemons = data.next

		        resolve(await Promise.all(pokemons))
		    })
		    .catch(function (error) {
		        console.error(error)
		        reject(error)
		    })
		})
	}
}

export default pokeAPI