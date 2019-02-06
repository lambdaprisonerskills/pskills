import React from "react";
import {} from "reactstrap";
import axios from "axios";
import Register from "./Register";

const loginEndpoint =
  "https://prisoner-skills-backend.herokuapp.com/api/users/login";

const Authentication = AdminView => Login =>
  class extends React.Component {
    constructor(props) {
      super(props);
      this.state = {
        loggedin: false,
        registering: false,
        login: {
          username: "",
          password: ""
        }
      };
    }

    componentDidMount() {
      console.log("Authentication Mounted");
    }

    handleChanges = e => {
      console.log(this.state.login);
      this.setState({
        login: {
          ...this.state.login,
          [e.target.name]: e.target.value
        }
      });
    };

    retrieveAuth = () => {
      axios
        .post(`${loginEndpoint}`, this.state.login)
        .then(function(response) {
          localStorage.setItem("jwt", `${response.data.token}`);
        }, this.setState({ loggedin: true }))
        .catch(function(error) {
          alert(error.response.data.error);
        });
    };

    submitLogin = e => {
      e.preventDefault();
      if (!this.state.login.username || !this.state.login.password) {
        this.setState({
          login: {
            username: "",
            password: ""
          }
        });
        alert("Invalid login, please enter Username and Password");
      } else {
        this.retrieveAuth();
      }
    };

    handleRegister = (e, registerlogin) => {
      return "";
    };

    toggleRegister = () => {
      this.setState(currentState => ({
        registering: !currentState.registering
      }));
    };

    handleLogOut = () => {
      this.setState({
        loggedin: false,
        login: {
          username: "",
          password: ""
        }
      });
    };

    conditionalRender = () => {
      if (this.state.loggedin) {
        return (
          <AdminView
            username={this.state.username}
            handleLogOut={this.handleLogOut}
          />
        );
      } else {
        if (this.state.registering) {
          return <Register toggleRegister={this.toggleRegister} />;
        } else {
          return (
            <Login
              password={this.state.login.password}
              username={this.state.login.username}
              handleChanges={this.handleChanges}
              submitLogin={this.submitLogin}
              toggleRegister={this.toggleRegister}
            />
          );
        }
      }
    };

    render() {
      return this.conditionalRender();
    }
  };

export default Authentication;
