import React, {useEffect, useState} from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

import Header from './navbar';
import '../home.css'
import Card from './card';

const Home = () => {

    const navigate = useNavigate();
    const [inputs, setInputs] = useState({
        title: "",
        description: "",
        imageURL: "",
    });

    const handleChange = (e) => {
        setInputs((prevState) => ({
            ...prevState,
            [e.target.name]: e.target.value,
        }));
    };

    const sendRequest = async () => {
        const res = await axios
          .post("http://localhost:8000/api/review/add", {
            title: inputs.title,
            description: inputs.description,
            image: inputs.imageURL,
            user: localStorage.getItem("userId"),
          })
          .catch((err) => console.log(err));
        const data = await res.data;
        return data;
        };

        const [reviews, setReviews] = useState();
        useEffect(() => {
            const getRequest = async () => {
                const res = await axios
                .get("http://localhost:8000/api/review/add" )
                .catch((err) => console.log(err));
                const data = await res.data;
                return data;
                setReviews(res.data)
            };
            getRequest()
        })

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log(inputs);
        sendRequest()
          .then((data) => console.log(data))
          .then(() => navigate("/review"));
    };


    return (

        <form onSubmit={handleSubmit}>
            <div>
                <Header />
                <div className='homeContainer'>
                    <div className='reviewbox'>
                        <div className='reviewHeader'>
                            <div className='reviewImage'>
                                <img src="https://www.ommel.fi/content/uploads/2019/03/dummy-profile-image-male.jpg" alt="" />
                            </div>
                            <div className='username'>    
                                <h3>July Dec</h3>
                            </div>
                        </div>

                        <div className='reviewbody'>
                            <input 
                                type="text" 
                                placeholder='title' 
                                className='reviewText'
                                name='title'
                                onChange={handleChange}
                                value={inputs.title}
                            />
                            <input 
                                type="text" 
                                placeholder='description' 
                                className='reviewText'
                                name='description'
                                onChange={handleChange}
                                value={inputs.description} 
                            />
                            <input 
                                type="text" 
                                placeholder='paste image url' 
                                className='reviewText'
                                name='imageURL' 
                                onChange={handleChange}
                                value={inputs.imageURL}
                            />
                            <button   
                                id='postbutton'
                                type='submit'
                            >Post
                            </button>
                        </div>
                    </div>
                    <div className='mainbox'>
                        <Card 
                            title={"Why is Mehran the best car ever"}
                            description ={"A detailed look into best functioning car ever"}
                            imageURL={"https://upload.wikimedia.org/wikipedia/commons/7/70/Mehran_Model_2001_Right_Side_View_At_Lowari_Pass%2CChitral%2CKPK.jpg"}
                        />
                        <Card 
                            title={"Alto"}
                            description ={"Nice car"}
                            imageURL={"https://suzukifortmotors.com/wp-content/uploads/2020/12/Alto-Solid-White-720x466.jpg"}
                        />
                        {/* {reviews.map((r , index) => (
                                <Card
                                    title={r.title}
                                    description={r.description}
                                    imageURL={r.imageURL}
                                    isUser = {true}
                                />
                              ))} */}

                        {/* <Card
                           title={title}
                           description = {description}
                            imageURL = {imageURL}
                        /> */}
                    </div>
                </div>    
            </div>
        </form>  
    );
}
 
export default Home;