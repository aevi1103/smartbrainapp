import React, { Component } from 'react'

class Register extends Component {

    constructor(props) {
        super(props);
        this.state = {
            name: '',
            email: '',
            password: ''
        }
    }

    onNameChange = (event) => {
        this.setState({name: event.target.value})
    }

    onEmailChange = (event) => {
        this.setState({email: event.target.value})
    }

    onPasswordChange = (event) => {
        this.setState({password: event.target.value})
    }

    onSignInClick = (event) => {
        this.props.onRouteChnage('signin');
    }

    onSubmitRegister = () => {

        const {name, email, password } = this.state;

        fetch('http://localhost:3001/register', {
            method: 'POST',
            headers: {
                'content-type': 'application/json'
            },
            body: JSON.stringify({
                name: name,
                email: email,
                password: password
            })
        })
        .then(res => res.json())
        .then(user => {

            // console.log(user);
            if (user.id) {
                this.props.loadUser(user)
                this.props.onRouteChnage('home')
            } 
        })
        .catch(err => {
            console.error(err)
        })

        
    }

    render() {

        return (
            <article className="br3 ba b--black-10 mv4 w-100 w-50-m w-25-l mw6 shadow-5 center">
                <main className="pa4 black-80">
                    <div className="measure">
    
                    <fieldset id="sign_up" className="ba b--transparent ph0 mh0">
                        <legend className="f4 fw6 ph0 mh0">Register</legend>
                        <div className="mt3">
                            <label className="db fw6 lh-copy f6" htmlFor="email-address">Name</label>
                            <input className="pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100" type="text" name="name" id="name" 
                                onChange={this.onNameChange} />
                        </div>
                        <div className="mt3">
                            <label className="db fw6 lh-copy f6" htmlFor="email-address">Email</label>
                            <input className="pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100" type="email" name="email-address" id="email-address"
                                onChange={this.onEmailChange}  />
                        </div>
                        <div className="mv3">
                            <label className="db fw6 lh-copy f6" htmlFor="password">Password</label>
                            <input className="b pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100" type="password" name="password" id="password"
                                onChange={this.onPasswordChange} />
                        </div>
                    </fieldset>
    
                    <div>
                        <input 
                            className="b ph3 pv2 input-reset ba b--black bg-transparent grow pointer f6 dib"
                            type="submit"
                            defaultValue="Sign in"
                            onClick={this.onSubmitRegister} />
                    </div>
    
                    {/* <div className="lh-copy mt3">
                        <p onClick={this.onSignInClick} className="f6 link dim black db pointer">Signin</p>
                    </div> */}
                    </div>
                </main>
            </article>
        )

    }

    

}

export default Register