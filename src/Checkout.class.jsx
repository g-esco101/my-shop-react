import React from "react";
import { saveShippingAddress } from "./services/shippingService";

// There are two ways to declare state in classes: in the constructor or via a class field.
const STATUS = {
  IDLE: "IDLE",
  SUBMITTED: "SUBMITTED",
  SUBMITTING: "SUBMITTING",
  COMPLETED: "COMPLETED"
};

// Declaring outside component to avoid recreation on each render
const emptyAddress = {
  city: "",
  country: ""
};

// In classes state is declared as a single object.
export default class Checkout extends React.Component {
  // Classes also support declaring state via a class field. With a class field, we can eliminate the constructor and thus the
  // super call as well, and instead of this.state, we just use state. This is same as below.
  state = {
    address: emptyAddress,
    status: STATUS.IDLE,
    saveError: null,
    touched: {}
  };

  isValid() {
    const errors = this.getErrors(this.state.address);
    return Object.keys(errors).length === 0;
  }

  // this.setState... like useState, you can pass either a value or a function. If you need to
  // reference current state, then you should pass a function. Like useState, if we pass a function,
  // React automatically injects the current state. The difference is, in class components, the state
  // is an object, so this variable (argument named state) contains all of the components state.
  handleChange = (e) => {
    e.persist(); // persist the event
    this.setState((state) => {
      // Like useState, whatever we return becomes the new state, but only the properties we specify are updated.
      return {
        address: {
          ...state.address,
          [e.target.id]: e.target.value
        }
      };
    });
  };

  // instead of declaring handleBlur as a method, we can declare it as a class field using an arrow function
  // to prevent Cannot read properties of undefined (reading 'setState') error. Arrow
  // functions inherit the this context of the enclosing scope. ie the this keyword will reference the React component instance.
  handleBlur = (event) => {
    event.persist();
    this.setState((state) => {
      return { touched: { ...state.touched, [event.target.id]: true } };
    });
  };

  handleSubmit = async (event) => {
    event.preventDefault();
    // With setState, React does a shallow merge. So we declare only the properties we'd like to set.
    this.setState({ status: STATUS.SUBMITTING });
    if (this.isValid()) {
      try {
        await saveShippingAddress(this.state.address);
        this.props.dispatch({ type: "empty" });
        this.setState({ status: STATUS.COMPLETED });
      } catch (e) {
        this.setState({ saveError: e });
      }
    } else {
      this.setState({ status: STATUS.SUBMITTED });
    }
  };

  getErrors(address) {
    const result = {};
    if (!address.city) result.city = "City is required";
    if (!address.country) result.country = "Country is required";
    return result;
  }

  // Every class has one required method: render.
  // In classes, the top of render is a good place to derive state.
  render() {
    const { status, saveError, touched, address } = this.state;

    // Derived state
    const errors = this.getErrors(this.state.address);

    if (saveError) throw saveError;
    if (status === STATUS.COMPLETED) {
      return <h1>Thanks for shopping!</h1>;
    }

    return (
      <>
        <h1>Shipping Info</h1>
        {!this.isValid() && status === STATUS.SUBMITTED && (
          <div role="alert">
            <p>Please fix the following errors:</p>
            <ul>
              {Object.keys(errors).map((key) => {
                return <li key={key}>{errors[key]}</li>;
              })}
            </ul>
          </div>
        )}
        <form onSubmit={this.handleSubmit}>
          <div>
            <label htmlFor="city">City</label>
            <br />
            <input
              id="city"
              type="text"
              value={address.city}
              onBlur={this.handleBlur}
              onChange={this.handleChange}
            />
            <p role="alert">
              {(touched.city || status === STATUS.SUBMITTED) && errors.city}
            </p>
          </div>

          <div>
            <label htmlFor="country">Country</label>
            <br />
            <select
              id="country"
              value={address.country}
              onBlur={this.handleBlur}
              onChange={this.handleChange}
            >
              <option value="">Select Country</option>
              <option value="China">China</option>
              <option value="India">India</option>
              <option value="United Kingdom">United Kingdom</option>
              <option value="USA">USA</option>
            </select>

            <p role="alert">
              {(touched.country || status === STATUS.SUBMITTED) &&
                errors.country}
            </p>
          </div>

          <div>
            <input
              type="submit"
              className="btn btn-primary"
              value="Save Shipping Info"
              disabled={status === STATUS.SUBMITTING}
            />
          </div>
        </form>
      </>
    );
  }
}
