import { useState } from 'react/cjs/react.development';
import { addActor } from '../data/ActoData';
import './AddActor.css';


const AddActors = (props) => {

    let actor = {
        name: "",
        sex: "",
        hometown: "",
        children: "",
        birthday: "",
        height: ""
    }

    const [formValue, setFormValue] = useState(actor);
    const [message, setMessage] = useState(null);
    
    const handleChange = (e) => {
        switch(e.target.name){
            case "name":
                actor.name = e.target.value;
                break;
            case "sex":
                actor.sex = e.target.value;
                break;
            case "hometown":
                actor.hometown = e.target.value;
                break;
            case "children":
                actor.children = e.target.value;
                break;
            case "birthday":
                actor.birthday = e.target.value;
                break;
            case "height":
                actor.height = e.target.value;
                break;
            default: 
                actor = {
                    name: "",
                    sex: "",
                    hometown: "",
                    children: "",
                    birthday: "",
                    height: ""
                }
                break;
        }
        setFormValue(actor);
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        addActor(formValue);
        setMessage(true);
    }


    if(message){
        return(
            <h1>"Thank you for submitting an actor"</h1> 
        )
    };

    if(props.isThereMessage){
        return (
        <form onSubmit={handleSubmit} className="myBorder">
            <label htmlFor="fname">Full Name:</label>
            <input type="text" id="fname" name="name" onChange={handleChange}/><br></br>
            <label htmlFor="fname">Sex: </label>
            <input type="text" id="sex" name="sex" onChange={handleChange}/><br></br>
            <label htmlFor="fname">Hometown: </label>
            <input type="text" id="hometown" name="hometown" onChange={handleChange}/><br></br>
            <label htmlFor="fname">Birthday: </label>
            <input type="text" id="birthday" name="birthday" onChange={handleChange}/><br></br>
            <label htmlFor="fname">Children: </label>
            <input type="text" id="birthday" name="birthday" onChange={handleChange}/><br></br>
            <label htmlFor="fname">Height: </label>
            <input type="text" id="height" name="height" onChange={handleChange}/><br></br>
            <input type="submit" value="submit"/>
        </form>
        )
    }

        
        // message && <h1>"Thank you for submitting an actor"</h1>
        // props.isThereMessage && 
        //     message ?
        //     <h1>"Thank you for submitting an actor"</h1>
        //     :
        // <form onSubmit={handleSubmit} className="myBorder">
        //     <label htmlFor="fname">Full Name: </label>
        //     <input type="text" id="fname" name="name" onChange={handleChange}/><br></br>
        //     <label htmlFor="fname">Sex: </label>
        //     <input type="text" id="sex" name="sex" onChange={handleChange}/><br></br>
        //     <label htmlFor="fname">Home Town: </label>
        //     <input type="text" id="hometown" name="hometown" onChange={handleChange}/><br></br>
        //     <label htmlFor="fname">Birthday: </label>
        //     <input type="text" id="birthday" name="birthday" onChange={handleChange}/><br></br>
        //     <label htmlFor="fname">Children: </label>
        //     <input type="text" id="birthday" name="birthday" onChange={handleChange}/><br></br>
        //     <label htmlFor="fname">Height: </label>
        //     <input type="text" id="height" name="height" onChange={handleChange}/><br></br>
        //     <input type="submit" value="submit"/>
        // </form>
        
    

}

export default AddActors;