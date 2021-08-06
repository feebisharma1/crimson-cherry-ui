import './AddActor.css'
const ActorListRow = (props) => {
    return(
        <>
            {props.allActorsList.map( myActors => 
                <tr key={myActors.id}> 
                    <td>{myActors.id}</td>
                    <td>{myActors.sex}</td>
                    <td>{myActors.hometown}</td>
                    <td>{myActors.height}</td>
                    <td>{myActors.name}</td>
                    <td>{myActors.children}</td>
                    <td>{myActors.birthday}</td>
                </tr>
                )}
        </>
       
    );
}

export default ActorListRow;