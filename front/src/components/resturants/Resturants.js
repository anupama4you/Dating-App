import React, { Component } from "react";
import "../../styles/App.css";
import "materialize-css/dist/css/materialize.min.css";
import AuthService from "../../services/AuthService";
import Axios from "axios";
import withAuth from ".././withAuth";
import NavBar from ".././NavBar";
import { Card, Button} from "react-materialize";
import SampleResturant from "../../assets/sample-resturant.jpg";
// import '../../styles/resturants.scss';

const CancelToken = Axios.CancelToken;
// eslint-disable-next-line
let cancel;
const openInNewTab = place => {
  let url = `https://www.google.com/maps/search/?api=1&query=${place.geometry.location.lat}%2C${place.geometry.location.lng}&query_place_id=${place.place_id}`
  window.open(url, '_blank', 'noopener,noreferrer');
};

const API_KEY = "AIzaSyCNvWhIZyoxmPh4SFXy_qIee_kipxyFRoA"

class Resturants extends Component {
  constructor(props) {
    super(props);
    this.Auth = new AuthService();
    this.state = {
      userID: "",
      room: null,
      username: "",
      userID: "",
      resturantsList: [],
      isLoading: true
    };
    this._isMounted = false;

    console.log('props', props)
  }

  async componentDidMount() {
    this._isMounted = true;

    (await this._isMounted) &&
      this.setState({
        userID: this.Auth.getConfirm()["id"]
      });

    console.log('userId', this.state.userID);

    await Axios.get("/main/resturants/"+ this.state.userID, {
      cancelToken: new CancelToken(function executor(c) {
        cancel = c;
      })
    })
      .then(res => {
          console.log('axios List:', JSON.stringify(res.data.list.results, null, 2))
          this.setState({resturantsList : res.data.list.results});
          console.log('test>>', this.state.resturantsList[0].opening_hours.open_now)
          this.setState({isLoading : false});
      })
      .catch(error => {
        console.log(error);
      });
  }

  ResturantDetails = place_id => {
    var config = {
      method: 'get',
      url: `https://maps.googleapis.com/maps/api/place/photo?maxwidth=400&photo_reference=Aap_uEA7vb0DDYVJWEaX3O-AtYp77AaswQKSGtDaimt3gt7QCNpdjp1BkdM6acJ96xTec3tsV_ZJNL_JP-lqsVxydG3nh739RE_hepOOL05tfJh2_ranjMadb3VoBYFvF0ma6S24qZ6QJUuV6sSRrhCskSBP5C1myCzsebztMfGvm7ij3gZT&key=${API_KEY}`,
      headers: { }
    };
    
    Axios(config)
    .then(function (response) {
      console.log(JSON.stringify(response.data));
    })
    .catch(function (error) {
      console.log(error);
    });
  }
  
  render() {
    return (
      <div className="App">
         <NavBar />
        <div className="row">
        <div className="places">
        <blockquote>
        <h5>Resturants nearby you to arrange your date ...</h5>
        </blockquote>
        {
          this.state.resturantsList.map((place, index) => (
            <Card key={index}>
            <div className="place" key={index}>
            <div className="row">
            <div className="col s8">
                  <div className="card-image">
                  <img
                    className="resturant-photo"
                    src={SampleResturant}
                    alt="Sample cafe"
                  />
                <span className="card-title">{place.name}</span>
              </div>
              <div className="card-content">
               <b><p className="name">Ratings - ({place.rating}/5)</p></b>
               <p className="name">{place.vicinity}</p>
               </div>
              
               </div>
               <div className="col s4">
               <Button style={{ marginBottom: '10px'}} onClick={() => openInNewTab(place)}>Open in Google Maps</Button>
               <Button onClick={() => this.ResturantDetails(place.place_id)}>Book Now</Button>
               </div>
               </div>
            </div>
            </Card>
            ))
        }


        </div>
        </div>
      </div>
    );
  }

  componentWillUnmount() {
    this._isMounted = false;
  }
}

export default withAuth(Resturants);
