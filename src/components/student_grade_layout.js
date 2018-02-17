import React, {Component} from 'react';
import {connect} from 'react-redux';
import {fetchStudentData} from "../actions/";
import StudentTable from './student_table';
import {addStudent} from "../actions/";
import { Field, reduxForm } from "redux-form";
import * as regex from '../helpers/regex';


class StudentGradeLayout extends Component{
    constructor(props){
        super(props);

    }
    componentDidMount(){
        this.props.fetchStudentData();
        console.log(regex);
    }
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
        const {average,students}= this.props;
        return(
        <div className="container">
            <div className="row">
                <h1 className="  page-header visible-md visible-lg">Student Grade Table
                    <small className = " pull-right visible-md visible-lg">Grade Average : <span className="avgGrade label label-default">{students.length? average: 0}</span></small>
                </h1>
                <h3 className = "col-xs-12 text-center page-header hidden-md hidden-lg">Student Grade Table
                    <small className = "mobileGradeAverage text-center col-xs-12 pull-right hidden-md hidden-lg">Grade Average : <span className="avgGrade label label-default">{students.length? average: 0}</span></small>
                </h3>
            </div>
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
                </div>
            </form>
            <div className="student-list-container col-md-8">
                {students.length? <StudentTable/>: <h2 className="text-center">No Data Available</h2>}
            </div>
        </div>
        )
    }

}

function mapStateToProps(state){
    return{
        students: state.studentData.students,
        average: state.studentData.average
    }
}
function validate(values) {
    const error = {};
    error.invalidName =regex.validateName(values.name);
    error.invalidCourse= regex.validateName(values.course);
    error.invalidGrade =regex.validateNumber(values.grade);
    console.log(error);
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

StudentGradeLayout = reduxForm({
    form: "student-grade-table",
    validate: validate
})(StudentGradeLayout);
//
// export default connect(mapStateToProps,{fetchStudentData})(StudentGradeLayout);

export default connect(mapStateToProps, {addStudent, fetchStudentData}) (StudentGradeLayout);