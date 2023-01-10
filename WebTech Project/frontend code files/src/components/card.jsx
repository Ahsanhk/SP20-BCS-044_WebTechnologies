import React, {useState} from 'react';
import '../card.css'

const Card = ({title, description, imageURL}) => {
    return (
        // <form onSubmit={handleSubmit}>  
            <div className='cardContainer'>
                <div className="card">
                    
                    <div className="card-header">
                        <img src={imageURL} alt="" />
                    </div>
                    <div className="card-body">
                        <h4>
                            {title} 
                        </h4>
                        <p>
                            {description}
                        </p>
                        <div className="user">
                            <img src="https://yt3.ggpht.com/a/AGF-l7-0J1G0Ue0mcZMw-99kMeVuBmRxiPjyvIYONg=s900-c-k-c0xffffffff-no-rj-mo" alt="user" />
                            <div className="user-info">
                                <h5>July Dec</h5>
                            </div>
                        </div>
                    </div>
                </div>
            </div>  
        // </form>
    );
}
 
export default Card;