import React from "react";
import css from "./styles.css";

class PasswordGenerator extends React.Component {
  // Define the character types that will be used to generate the password
  characterTypes = {
    lowercase: "abcdefghijklmnopqrstuvwxyz",
    uppercase: "ABCDEFGHIJKLMNOPQRSTUVWXYZ",
    numbers: "0123456789",
    symbols: "!@#$%^&*(){}[]=<>,."
  };

  // Define the initial state of the component
  state = {
    passwordLength: 8,
    includeUppercase: false,
    includeLowercase: true,
    includeNumbers: false,
    includeSymbols: false,
    password: ""
  };

  // Define the method for generating a new password
  generatePassword() {
    let password = "";
    const {
      passwordLength,
      includeUppercase,
      includeLowercase,
      includeNumbers,
      includeSymbols
    } = this.state;
    let characterList = "";

    // Include the character types that the user has selected
    if (includeLowercase) {
      characterList += this.characterTypes.lowercase;
    }
    if (includeUppercase) {
      characterList += this.characterTypes.uppercase;
    }
    if (includeNumbers) {
      characterList += this.characterTypes.numbers;
    }
    if (includeSymbols) {
      characterList += this.characterTypes.symbols;
    }

    for (let i = 0; i < passwordLength; i++) {
      password +=
        characterList[Math.floor(Math.random() * characterList.length)];
    }
    return password;
  }

  // Define the method for updating the state when the form is submitted
  handleSubmit = (event) => {
    event.preventDefault();
    this.setState({
      password: this.generatePassword()
    });
  };

  // Define the method for updating the state when a form field is changed
  handleChange = (event) => {
    const { name, value, type, checked } = event.target;
    type === "checkbox"
      ? this.setState({ [name]: checked })
      : this.setState({ [name]: value });
  };

  render() {
    const {
      passwordLength,
      includeUppercase,
      includeLowercase,
      includeNumbers,
      includeSymbols,
      password
    } = this.state;
    return (
      <div className="password-generator">
        <form onSubmit={this.handleSubmit}>
          <label htmlFor="password-length">
            Password Length:
            <input
              type="text"
              id="password-length"
              name="passwordLength"
              value={passwordLength}
              onChange={this.handleChange}
            />
            <br />
            <input
              type="checkbox"
              id="include-uppercase"
              name="includeUppercase"
              checked={includeUppercase}
              onChange={this.handleChange}
            />
            <label htmlFor="include-uppercase">Include Uppercase Letters</label>
            <br />
            <input
              type="checkbox"
              id="include-lowercase"
              name="includeLowercase"
              checked={includeLowercase}
              onChange={this.handleChange}
            />
            <label htmlFor="include-lowercase">Include Lowercase Letters</label>
            <br />
            <input
              type="checkbox"
              id="include-numbers"
              name="includeNumbers"
              checked={includeNumbers}
              onChange={this.handleChange}
            />
            <label htmlFor="include-numbers">Include Numbers</label>
            <br />
            <input
              type="checkbox"
              id="include-symbols"
              name="includeSymbols"
              checked={includeSymbols}
              onChange={this.handleChange}
            />
            <label htmlFor="include-symbols">Include Symbols</label>
            <br />
            <button type="submit">Generate Password</button>
          </label>
        </form>
        <br />
        <label htmlFor="generated-password">Generated Password:</label>
        <br />
        <input
          type="text"
          id="generated-password"
          name="generated-password"
          readOnly
          value={password}
        />
      </div>
    );
  }
}

export default PasswordGenerator;
