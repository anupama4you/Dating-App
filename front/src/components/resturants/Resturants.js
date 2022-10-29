import React, { Component } from "react";
import "../../styles/App.css";
import "materialize-css/dist/css/materialize.min.css";
import AuthService from "../../services/AuthService";
import Axios from "axios";
import withAuth from ".././withAuth";
import NavBar from ".././NavBar";
import { Card } from "react-materialize";
// import '../../styles/resturants.scss';

const CancelToken = Axios.CancelToken;
// eslint-disable-next-line
let cancel;

class Resturants extends Component {
  constructor(props) {
    super(props);
    this.Auth = new AuthService();
    this.state = {
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

    await Axios.get("/main/resturants", {
      cancelToken: new CancelToken(function executor(c) {
        cancel = c;
      })
    })
      .then(res => {
        
        // this._isMounted &&
        //   this.setState({
        //     userTab: res.data.list,
        //     defaultTab: res.data.list,
        //     defaultSorted: res.data.list
        //   });
          console.log('axios List:', JSON.stringify(res.data.list.results, null, 2))
          this.setState({resturantsList : res.data.list.results});
          this.setState({isLoading : false});
      })
      .catch(error => {
        console.log(error);
      });
  }

  

  render() {
    return (
      <div className="App">
        <NavBar />
        <div className="places">
        {
          this.state.resturantsList.map((place, index) => (
            <Card>
            <div className="place" key={index}>
               <p className="name">name : {place.name}</p>
               <p className="name"> rating (/5) : {place.rating}</p>
               <p className="name"> total ratings : {place.user_ratings_total}</p>
               <p className="name"> address : {place.vicinity}</p>
            </div>
            </Card>
            ))
        }


        </div>
      </div>
    );
  }

  componentWillUnmount() {
    this._isMounted = false;
  }
}

export default withAuth(Resturants);
