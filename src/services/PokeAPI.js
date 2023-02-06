import axios from 'axios'

const pokeAPI = {
	nextPokemons: '',
	loadedPokemons: [],
	// Returns a single pokemon object
	getPokemon(url) {
		return new Promise((resolve, reject) => {
			axios.get(url).then(({ data }) => {
				resolve({
					id: data.id,
					name: data.name,
					type: data.types.map(item => item.type.name).join(', '),
					img: data.sprites.other.dream_world.front_default
				})
			})
		})
	},
	// Returns a single pokemon object by name
	getPokemonDetails(name) {
		return new Promise((resolve, reject) => {
			axios.get(`https://pokeapi.co/api/v2/pokemon/${name}`)
			.then(({ data }) => {
				resolve({
					id: data.id,
					name: data.name,
					height: data.height,
					weight: data.weight,
					abilities: data.abilities.map(item => item.ability.name),
					type: data.types.map(item => item.type.name),
					img: data.sprites.other.dream_world.front_default,
					stats: data.stats.map(item => {
						return {
							name: item.stat.name,
							stat: item['base_stat']
						}
					})
				})
			})
		})
	},
	// Returns a list with object pokemons data
	getPokemons(url = 'https://pokeapi.co/api/v2/pokemon') {
		return new Promise((resolve, reject) => {
			axios.get(url)
		    .then(async ({ data }) => {
		        const pokemonsData = data.results.map(async item => await this.getPokemon(item.url))
		        const pokemons = await Promise.all(pokemonsData)
		        
		        this.nextPokemons = data.next
		        this.loadedPokemons = [...this.loadedPokemons, ...pokemons]

		        resolve(pokemons)
		    })
		    .catch(function (error) {
		        console.error(error)
		        reject(error)
		    })
		})
	},
	// Return a list with all pokemon names
	getPokemonNames() {
		return new Promise((resolve, reject) => {
			axios.get('https://pokeapi.co/api/v2/pokemon?limit=1300&offset=0')
		    .then(({ data }) => {
		    	const names = data.results.map(pokemon => pokemon.name)
		        resolve(names)
		    })
		    .catch(function (error) {
		        console.error(error)
		        reject(error)
		    })
		})
	},
	// Return a object list of specific pokemons
	searchPokemons(names = []) {
		return new Promise(async (resolve, reject) => {
			const pokemons = names.map(async name => await this.getPokemon(`https://pokeapi.co/api/v2/pokemon/${name}`))
			resolve(await Promise.all(pokemons))
		})
	},
}

export default pokeAPI