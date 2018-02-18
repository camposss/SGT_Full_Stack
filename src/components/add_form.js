import React, {Component} from 'react';
import {connect} from 'react-redux';
import {fetchStudentData} from "../actions/";
import {addStudent} from "../actions/";
import { Field, reduxForm } from "redux-form";
import * as regex from '../helpers/regex';


class AddForm extends Component{
    constructor(props){
        super(props);

    }
    // componentDidMount(){
    //     console.log(this.props);
    // }
    renderInput({ placeholder, label, input, type, meta: { touched, error, active, visited } }) {
        return (
            <span>
                {/*<label>{label}</label>*/}
                <input placeholder= {placeholder} className="form-control" type={type} {...input} />
                <p className="inputErrorMessage text-danger text-center">{ input.name==='' ? touched && visited && error : touched && !active && error }</p>
            </span>

        );
    }
    handleFormSubmission(values){
        this.props.addStudent(values).then(()=>{
            this.props.fetchStudentData();
        }).then(()=>{
            this.props.reset();
        });
    }
    render(){
        return(
                <form onSubmit={this.props.handleSubmit(this.handleFormSubmission.bind(this))}>
                    <div className="student-add-form col-md-4 pull-right">
                        <h4>Add Student</h4>
                        <div className="input-group form-group">
                        <span className="input-group-addon">
                            <span className="glyphicon glyphicon-user"></span>
                        </span>
                            <Field placeholder='Student Name' name='name' label='Name' type='text' component={this.renderInput}/>
                        </div>
                        <div className="input-group form-group">
                        <span className="input-group-addon">
                            <span className="glyphicon glyphicon-list-alt"></span>
                        </span>
                            <Field placeholder= 'Course' name='course' label='Course' type='text' component={this.renderInput}/>
                        </div>
                        <div className="input-group form-group">
                        <span className="input-group-addon">
                            <span className="glyphicon glyphicon-education"></span>
                        </span>
                            <Field placeholder= 'Grade' name='grade' label='Grade' type='number' component={this.renderInput}/>
                        </div>
                        <button type="submit" className="btn btn-success">Add</button>
                        <button onClick={()=>this.props.destroy()} className="btn btn-warning">Clear</button>
                    </div>
                </form>
        )
    }

}

function validate(values) {
    const error = {};
    error.invalidName =regex.validateName(values.name);
    error.invalidCourse= regex.validateName(values.course);
    error.invalidGrade =regex.validateNumber(values.grade);
    if(!values.name){
        error.name= "Please enter a student name";
    }
    if(error.invalidName){
        error.name= "Please enter a valid name";
    }
    if(!values.course){
        error.course = 'Please enter a course';
    }
    if(error.invalidCourse){
        error.course= "Please enter an appropriate course"
    }
    if(!values.grade){
        error.grade = 'Please enter a grade';
    }
    if(error.invalidGrade){
        error.grade= "Please enter a grade between 0-100";
    }
    return error;
}

AddForm = reduxForm({
    form: "add-form",
    validate: validate
})(AddForm);
//
// export default connect(mapStateToProps,{fetchStudentData})(StudentGradeLayout);

export default connect(null, {addStudent, fetchStudentData}) (AddForm);