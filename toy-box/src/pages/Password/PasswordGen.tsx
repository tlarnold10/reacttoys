import React from 'react';
import './PasswordGen.css';

class PasswordGen extends React.Component<{}, { value: string }> {

    specialCharacters: string[];
    alphabet: string[];

    constructor(props: any) {
      super(props);
      this.state = { value: '<new password here>' };
      this.handleSubmit = this.handleSubmit.bind(this);
      this.handleCopy = this.handleCopy.bind(this);
      this.specialCharacters = ['!', '@', '#', '$', '%', '^', '&', '*', '?', '<', '>'];
      this.alphabet = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z'];
    }
  
    render() {
      var form;
      console.log("loaded")
      if (this.state.value != '<new password here>') {
        form =  <form onSubmit={this.handleCopy}>
                  <button><i className="fa fa-copy"></i> Copy</button>
                </form>
      }
      else {
        form = <div></div>
      }
      return (
        <div className="container">
          <h3>Password Generator</h3>
          <p>{ this.state.value }</p>
          {form}
          
          <form onSubmit={this.handleSubmit}>
            <label htmlFor="new-todo">
              Click the button to generate a random password: 
            </label>
            <br></br>
            <button>
              Generate
            </button>
          </form>
        </div>
      );
    }

    handleCopy(e: any) {
      navigator.clipboard.writeText(this.state.value);
      alert("Copied password to clipboard");
    }
  
    handleSubmit(e: any) {
      console.log("generating password")
      e.preventDefault();
      // Password should be 20 - 30 characters
      var passwordLength = Math.floor(Math.random() * 10) + 20;
      var password = this.generatePassword(passwordLength);

      while(true) {
        var hasSpecialCharacter = false;
        var hasAlphaCharacter = false;
        var hasUpperAlphaCharacter = false;
        var hasNumber = false;
        for (var passChar of password) {
          for (var specialChar of this.specialCharacters) {
            if (passChar == specialChar) {
              hasSpecialCharacter = true;
            }
          }
          for (var alphaChar of this.alphabet) {
            if (passChar == alphaChar) {
              hasAlphaCharacter = true;
            }
            if (passChar == alphaChar.toUpperCase()) {
              hasUpperAlphaCharacter = true;
            }
          }
          var passCharLength = Number(passChar);
          if (0 < passCharLength && passCharLength < 10) {
            console.log(passChar)
            hasNumber = true;
          }
        }
        if (hasAlphaCharacter && hasSpecialCharacter && hasUpperAlphaCharacter && hasNumber) {
          break;
        }
        else {
          password = this.generatePassword(passwordLength);
        }
      }

      this.setState({value: password});
    }

    generatePassword (passwordLength: Number) {
      var password: string = '';
      var charIndicator: number;
      for (var item of Array.from(Array(passwordLength).keys())) {
        var character: string = '';
        var charTypeIndicator = Math.floor(Math.random() * 4);
        if (charTypeIndicator == 1) {
          charIndicator = Math.floor(Math.random() * this.specialCharacters.length);
          character = this.specialCharacters[charIndicator];
        }
        else if (charTypeIndicator == 2) {
          charIndicator = Math.floor(Math.random() * this.alphabet.length);
          character = this.alphabet[charIndicator];
        }
        else if (charTypeIndicator == 3) {
          charIndicator = Math.floor(Math.random() * this.alphabet.length);
          character = this.alphabet[charIndicator].toUpperCase();
        }
        else {
          character = String(Math.floor(Math.random() * 9));
        }
        password = password + character;
      }
      console.log(password);
      return password;
    }
  }
  
export default PasswordGen;