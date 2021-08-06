import axios from 'axios'

export const getActorList = () => {
    console.log("getting the actor list from axios: ");
    const actorListPromise = axios({
        url: "api/actor/all",
        method: "GET",
        headers: {
            'Accept': 'application/json'
        }
    });

    return actorListPromise;
}

export const addActor = (actor) => {
    console.log("posting the actor list from axios: ");
    const actorListPromise = axios({
        url: "api/actor/save",
        method: "Post",
        headers: {
            'Accept': 'application/json'
        },
        data: actor
    });

    return actorListPromise;
}


