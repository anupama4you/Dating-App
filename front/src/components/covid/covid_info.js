import React, { Component } from "react";
import "../../styles/App.css";
import "materialize-css/dist/css/materialize.min.css";
import AuthService from "../../services/AuthService";
import Axios from "axios";
import withAuth from ".././withAuth";
import NavBar from ".././NavBar";
import { Card, Button, Col, Row, Icon, CardTitle} from "react-materialize";
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

class CovidInfo extends Component {
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
        <Row>
        <blockquote>
        <h5>Your loved ones need you ..</h5>
        <p>Get the Covid-19 vaccine to make sure you can be there for them. Find information about the coronavirus (COVID-19) pandemic, how to protect yourself and your family, where and when you can get vaccinated, and the current situation in Australia.</p>
        </blockquote>
        <Col
            m={6}
            s={12}
        >
            <Card
            actions={[
                <a key="1" href="https://www.health.gov.au/initiatives-and-progr%C3%A4ms/covid-19-vaccines">COVID-19 vaccines</a>
            ]}
            closeIcon={<Icon>close</Icon>}
            header={<CardTitle image="https://newsroom.unsw.edu.au/sites/default/files/styles/full_width/public/thumbnails/image/shutterstock_1854498166_2.jpg" />}
            horizontal
            revealIcon={<Icon>more_vert</Icon>}
            >
            COVID-19 vaccines are recommended for everyone 5 years and older.
            </Card>
        </Col>

        <Col
            m={6}
            s={12}
        >
            <Card
            actions={[
                <a key="1" href="#">About the COVID-19</a>
            ]}
            closeIcon={<Icon>close</Icon>}
            header={<CardTitle image="https://live-production.wcms.abc-cdn.net.au/92268f4b1a0e7f45a1d7f74869dfd2cc?impolicy=wcms_crop_resize&cropH=844&cropW=1500&xPos=0&yPos=120&width=862&height=485" />}
            horizontal
            revealIcon={<Icon>more_vert</Icon>}
            >
            Find out how you can help stop its spread, and what to do if you have symptoms. 
            </Card>
        </Col>

        <Col
            m={6}
            s={12}
        >
            <Card
            actions={[
                <a key="1" href="tel:1800020080">Coronavirus helpline</a>
            ]}
            closeIcon={<Icon>close</Icon>}
            header={<CardTitle image="http://vertassets.blob.core.windows.net/image/a917560d/a917560d-6731-4cdd-b1d3-0d263b0b5d8d/hto_telehealth.jpg" />}
            horizontal
            revealIcon={<Icon>more_vert</Icon>}
            >
            If you need information about COVID-19 or COVID-19 vaccines, call the helpline – open 24 hours, 7 days.
            </Card>
        </Col>

        <Col
            m={6}
            s={12}
        >
            <Card
            actions={[
                <a key="1" href="https://www.health.gov.au/health-alerts/covid-19/treatments/eligibility">COVID-19 treatments</a>
            ]}
            closeIcon={<Icon>close</Icon>}
            header={<CardTitle image="http://vertassets.blob.core.windows.net/image/a917560d/a917560d-6731-4cdd-b1d3-0d263b0b5d8d/hto_telehealth.jpg" />}
            horizontal
            revealIcon={<Icon>more_vert</Icon>}
            >
            Find out about COVID-19 oral antiviral treatments, eligibility, and how to access them.
            </Card>
        </Col>

        <Col
            m={12}
            s={12}
        >
            <Card
            actions={[
                <a key="1" href="https://www.health.gov.au/health-alerts/covid-19">More information</a>
            ]}
            closeIcon={<Icon>close</Icon>}

            horizontal
            revealIcon={<Icon>more_vert</Icon>}
            >
            Find information about the coronavirus (COVID-19) pandemic, how to protect yourself and your family, where and when you can get vaccinated, and the current situation in Australia.
            </Card>
        </Col>
        </Row>
      </div>
    );
  }

  componentWillUnmount() {
    this._isMounted = false;
  }
}

export default withAuth(CovidInfo);
