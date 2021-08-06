
import { useState, useEffect } from "react";
import {getActorList} from "../data/ActoData"
import ActorListRow from "./ActorListRow";

const ActorList = () => {

    const [actors, setActors] = useState([]);
    const [allActors, setAllActors] = useState([]);

    const loadActorDataFromAxios = () => {
        getActorList()
        .then(response => {
            setActors(response.data)
            setAllActors(response.data)
        })
        .catch(error => console.log("Something went wrong", error));
    }

    useEffect(() => loadActorDataFromAxios(), []);

    let handleChange = (e) => {
        const myList = allActors.filter(filteredActors => filteredActors.name === e.target.value);
        setActors(myList);
    }

    return (
        <div className= "myTable">
            <label>Select an Actor by their Name: </label>
            <select onChange={handleChange}>
                <option>--Choose Option---</option>
                {allActors.map(actorsName => <option>{actorsName.name}</option>)}
            </select>
            <table>
                <thead>
                    <tr>
                        <th> Id</th>
                        <th> Sex</th>
                        <th> Hometown</th>
                        <th> Height</th>
                        <th> Name</th>
                        <th> Children</th>
                        <th> Birthday</th>
                    </tr>
                    <ActorListRow allActorsList = {actors} />
                </thead>
            </table>
        </div>
    );
}

export default ActorList;