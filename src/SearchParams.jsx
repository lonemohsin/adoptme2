import { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import Results from './Results';
import useBreedList from './useBreedList';
import fetchSearch from './fetchSearch';

const ANIMALS = ["bird", "cat", "dog", "rabbit", "reptile"]



const SearchParams = () => {
    const [requestParams, setRequestParams] = useState({
        location: "",
        animal: "",
        breed: "",
    });
    const [animal, setAnimal] = useState("");
    const [breeds] = useBreedList(animal);

    const results = useQuery(["search", requestParams], fetchSearch);
    const pets = results?.data?.pets ?? [];

    return (
        <div className='search-params'>
            <form onSubmit={e => {
                e.preventDefault();
                const formData = new FormData(e.target);
                const obj = {
                    animal: formData.get("animal") ?? "",
                    breed: formData.get("breed") ?? "",
                    location: formData.get("location") ?? "",
                };
                setRequestParams(obj);
            }}>
                <label>
                    Location
                    <input
                        name="location"
                        id="location"></input>
                </label>
                <label htmlFor='animal'>
                    Animal
                    <select id="animal"
                        onChange={(e) => { setAnimal(e.target.value);
                         }}>
                        <option />
                        {ANIMALS.map((animal) => (
                            <option key={animal} value={animal}>{animal}</option>
                        ))}
                    </select>
                </label>
                <label htmlFor='breed'>
                    Breed
                    <select disabled={breeds.length === 0}
                        id='breed'
                        name='breed'
                    >
                        <option />
                        {
                            breeds.map((breed) =>
                                <option key="breed">{breed}</option>
                            )
                        }
                    </select>
                </label>
                <button>Submit</button>
            </form>
            <Results pets={pets} />
        </div >
    )
};

export default SearchParams;