import React from "react";
import { Field, Form } from "react-final-form";

const ReportForm = (props) => {
  // Error Validation for the input fields, if the input field becomes touched but is left empty the component throws an error.
  const renderError = ({ error, touched }) => {
        if (touched && error) {
      return (
        <div className="ui error message">
          <div className="header">{error}</div>
        </div>
      );
    }
  };

  //INPUT FIELD HELPER FUNCTION
  const renderInput = ({ input, label, meta }) => {
    // The renderInput helper method is used to pass JSX to the Field element from react-final-form library
    // We can destructure the "input" property from the formProps.input and call it as a prop within the <input /> element as shown below.
    const className  = `field ${meta.error && meta.touched ? "error" : ""}`;

    return (
      <div className={className}>
        <label>{label}</label>
        {/* The label prop is destructured within the renderInput Function and placed within the <label> element   */}
        <input {...input} autoComplete="off" />
        {renderError(meta)}
      </div>
    );
  };

  const onSubmit = (formValues) => {
    props.onSubmit(formValues);
    // The StreamForm component will receive an onSubmmit function from its parent component as a prop.
  };

  return (
    
    <Form // Important note, the name for the form fields need to be identical to the terms in the schema for data to be posted properly. The field names need to be === to the names defined in validation as well.
    initialValues={props.initialValues}
    onSubmit={onSubmit}
    validate={(formValues) => {
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
          <Field name="title" component={renderInput} label={"Enter Title"} />
          <Field name="description" component={renderInput} label={"Enter Description"} />
         
          <button className="ui button primary">Submit</button>
        </form>
      )}
      />
      );
    }
    
    export default ReportForm;

    // // Helper function to add input fields for unit descriptions
    // const mapUnitDescriptionInputs() {
      //   return props.units.units.map((item) => {
        //     return <Field name={`${item}`} component={this.renderInput} label={"Enter Unit"} />;
        //   });
        // }
        
    // Helper function to initiate action creaor to add another unit
        // const addNewUnit() {
          //   console.log(this.state.unitId);
          //   this.setState({ unitId: this.state.unitId + 1 });
          //   return this.props.addUnit(this.state.unitId);
          // }