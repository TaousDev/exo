import React, {useRef, useState, useEffect} from 'react'
import axios from "axios"
import DatePicker from 'react-datepicker'
import "react-datepicker/dist/react-datepicker.css"


function CreateExercise() {

    const [username, setUsername] = useState('')
    const [desc, setDesc] = useState('')
    const [duration, setDuration] = useState(0)
    const [date, setDate] = useState(new Date())
    const [users, setUsers] = useState([])

    useEffect(() => {
        async function getData() {
            const resp = await axios.get('http://localhost:5000/users/')
            setUsers(resp.data.map(user => user.username))
            //setUsername(resp.data[0].username)
        }

        getData()
    }, [users])

    const userInput = useRef(null)

    const onChangeUsername = (e) => {
        setUsername( e.target.value )
    }
    
    const onChangeDescription = (e) => {
        setDesc(e.target.value)
    }
    
    const onChangeDuration = (e) => {
        setDuration(e.target.value)
    }
    
    const onChangeDate = (date) => {
        setDate(date)
    }

    const onSubmit = (e) => {
        e.preventDefault();

        const exercise = {
            username: username,
            desc: desc,
            duration: Number(duration),
            date: Date(date)
        }

        console.log(exercise);
        
        axios.post('http://localhost:5000/exercises/add', exercise,{
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'
                }
        })
        .then(res => {
            console.log('ress ===> ', res)
        })
        .catch((error) => console.log( error.response.request) );
            

        // window.location = "/";
    }
    
    return (
            <div>
                <h3>Create New Exercise Log</h3>

                <form onSubmit={onSubmit}>
                    <div>
                        <label>Username: </label>

                        
                        <select
                            ref={userInput}
                            value={username}
                            onChange={onChangeUsername}
                        >

                            { users.map((user) => <option key={user} value={user}>{user}</option>) }         
                        
                        </select>
                    



                    </div>

                    <div>
                        <label>Description: </label>
                        <input
                            type="text" 
                            value={desc}
                            onChange={onChangeDescription}
                     
                        />
                    </div>

                    <div>
                        <label>Duration(in minutes): </label>
                        <input
                            type="number"
                            value={duration}
                            onChange={onChangeDuration}
                        
                        />
                    </div>

                    <div>
                        <label>Date: </label>
                        <div>
                            <DatePicker
                                selected={date}
                                onChange={onChangeDate}
                                
                            />
                        </div>
                    </div>

                    <div>
                        <input type="submit" value="Create Exercise Log" />
                    </div>
                </form>

            </div>
    );
    


} // End -- Class

export default CreateExercise