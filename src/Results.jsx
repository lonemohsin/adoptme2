import Pet from "./Pet";

const Results = ({ pets }) => {
    return (
        <div className="search">
            {!pets.length ? (<h1>No Pets found!</h1>) : (pets.map((pet) => {
                return (
                    <Pet animal={pet.animal}
                        name={pet.name}
                        breed={pet.breed}
                        key={pet.key}
                        id={pet.id}
                        images={pet.images}
                        location={`${pet.city}, ${pet.state}`} />
                )
            }))}
        </div>
    )
}

export default Results;
