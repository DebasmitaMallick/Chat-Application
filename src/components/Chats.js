import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { ChatEngine } from 'react-chat-engine';
import { auth } from '../firebase';
import { useAuth } from '../contexts/AuthContext';
import { SendOutlined } from '@ant-design/icons';
import axios from 'axios';


const Chats = () => {
    const history = useHistory();
    const { user } = useAuth();
    const [loading, setLoading] = useState(true);
    const PROJECT_ID = process.env.REACT_APP_CHAT_ENGINE_ID; 
    const PRIVATE_KEY = process.env.REACT_APP_CHAT_ENGINE_KEY; 

    const handleLogout = async () => {
        await auth.signOut();
        history.push('/'); //renavigate to login page
    }

    const getFile = async (url) => {
        const response = await fetch(url);
        const data = await response.blob();//containg our image
        return new File([data], "userPhoto.jpg", {type: 'image/jpeg'});
    }

    useEffect(() => {
        if(!user) {
            history.push('/');
            return;
        }
        console.log(user);
        /**
         * getting the already created user
         * if we have one we can immediately show the chat of that specific user
         */

        axios.get('https://api.chatengine.io/users/me', {
            headers: {
                'project-id': PROJECT_ID,
                'user-name' : user.email,
                'user-secret' : user.uid,
                'private-key': PRIVATE_KEY
            }
        })
        .then(() => {
            setLoading(false); //SAFE POINT 1
        })
        .catch(() => {
            let formdata = new FormData();
            formdata.append('email', user.email);
            formdata.append('username', user.email);
            formdata.append('secret', user.uid);

            getFile(user.photoURL)
                .then((avatar) => {
                    formdata.append('avatar', avatar, avatar.name);
                    console.log(...formdata);
                    
                    axios.post('https://api.chatengine.io/users', 
                        formdata,
                        { 
                            headers: { 
                                'private-key': PRIVATE_KEY,
                                'project-id': PROJECT_ID,
                            }
                        }
                    )
                    .then(() => setLoading(false))
                    .catch((error) => console.log('error 1'+error))
                })
                .catch(err => console.log('err 2'+err));
        })
    }, [user, history]);

    if(!user || loading) return (
        <div
            style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
                height: "100vh",
                backgroundColor: "grey",
            }}
        >
            <h2>Loading...</h2>
        </div>
    );

    return (
        <div className='chat-page'>
            <div className='nav-bar'>
                <div className='logo-tab'>
                    Arrowhead <SendOutlined />
                </div>
                <div onClick={handleLogout} className='logout-tab'>
                    Logout
                </div>
            </div>

            <ChatEngine
                height='calc(100vh - 66px)'
                projectID={PROJECT_ID}
                userName={user.email}
                userSecret={user.uid}
            />
        </div>
    )
}

export default Chats