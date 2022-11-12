import React, { Component } from "react";
import { render } from "react-dom";
import { Field, Form } from "react-final-form";
import { connect } from "react-redux";
import { addUnit } from "../../actions";

class ReportForm extends React.Component {
  // The unitId state is incremented with eacha additional unit field that we add to the form.
  // The unitId state is used to make unit field "Names and labels unique"
  state = {
    unitId: 1,
  };

  // Error Validation for the input fields, if the input field becomes touched but is left empty the component throws an error.
  renderError = ({ error, touched }) => {
    if (touched && error) {
      return (
        <div cllassName="ui error essage">
          <div className="header">{error}</div>
        </div>
      );
    }
  };

  //INPUT FIELD HELPER FUNCTION
  renderInput = ({ input, label, meta }) => {
    // The renderInput helper method is used to pass JSX to the Field element from react-final-form library
    // We can destructure the "input" property from the formProps.input and call it as a prop within the <input /> element as shown below.
    const classNameVariable = `field${meta.error && meta.touched ? "error" : ""}`;

    return (
      <div className={classNameVariable}>
        <label>{label}</label>
        {/* The label prop is destructured within the renderInput Function and placed within the <label> element   */}
        <input {...input} autoComplete="off" />
        {this.renderError(meta)}
      </div>
    );
  };

  // Helper function to add input fields for unit descriptions
  mapUnitDescriptionInputs() {
    return this.props.units.units.map((item) => {
      return <Field name={`${item}`} component={this.renderInput} label={"Enter Unit"} />;
    });
  }

  // Helper function to initiate action creaor to add another unit

  addNewUnit() {
    console.log(this.state.unitId);
    this.setState({ unitId: this.state.unitId + 1 });
    return this.props.addUnit(this.state.unitId);
  }

  onSubmit = (formValues) => {
    this.props.onSubmit(formValues);
    // The StreamForm component will receive an onSubmmit function from its parent component as a prop.
  };

  render() {
    return (
      <div>
        <button onClick={() => this.addNewUnit()}> Add Unit</button>
        <Form
          initialValues={this.props.initialVallues}
          onSubmit={this.onSubmit}
          vallidate={(formValues) => {
            const errors = {};

            if (!formValues.title) {
              errors.title = "You must enter a title";
              // CONSIDER - Since i'll have many input fields it may be more efficient to pass the "name" of each input field programatically instead of hard coding each error type. using an or statement or switch and case to cycle through input field titles.
            }

            if (!formValues.description) {
              errors.description = "You must enter a description";
            }

            return errors;
          }}
          render={({ handleSubmit }) => (
            <form onSubmit={handleSubmit} className="ui form error">
              <Field name="title" component={this.renderInput} label={"Enter Title"} />
              <Field name="description" component={this.renderInput} label={"Enter Description"} />
              {this.mapUnitDescriptionInputs()}
              <button className="ui button primary">Submit</button>
            </form>
          )}
        />
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    units: state.units,
  };
};

export default connect(mapStateToProps, { addUnit })(ReportForm);
