import React, {Component} from 'react';
import {connect} from 'react-redux';
import '../assets/css/app.css';
import {fetchStudentData,deleteStudent,updateStudent} from "../actions/";
import { Field, reduxForm } from "redux-form";
import * as regex from '../helpers/regex';




class IndividualStudent extends Component {
    constructor(props) {
        super(props);
        this.state= {
            deleteModal: false,
            canEdit: false,
            form:{
                name: this.props.name,
                course: this.props.course,
                grade: this.props.grade
            },
            showManageButtons: false,
        };
        this.confirmDeleteModal= this.confirmDeleteModal.bind(this);
    }
    // componentWillReceiveProps(nextProps){
    //
    //     this.setState({
    //         form:{
    //             name:nextProps.name,
    //             course: nextProps.course,
    //             grade: nextProps.grade
    //         }
    //     })
    // }
    renderInput({ placeholder, label, input, type, meta: { touched, error, active, visited } }) {
        return (
            <span>
                {/*<label>{label}</label>*/}
                <input placeholder= {placeholder} className="form-control" type={type} {...input} />
                <p className="text-danger text-center">{ input.name==='' ? touched && visited && error : touched && !active && error }</p>
            </span>

        );
    }
    handleFormSubmission(values){
        console.log('we are trynig to save');
        this.props.updateStudent(values, this.props.id).then(()=>{
            this.props.fetchStudentData().then(()=>{
                this.setState({
                    ...this.state,
                    canEdit: false,
                    showManageButtons: false,
                })
            });
            this.props.destroy();
            console.log('these are now the students after updating ', this.props.students);
        });
    }
    async handleDelete(){
        const studentId= this.props.id;
        const deleteRes = await this.props.deleteStudent(studentId);
        const fetchRes = await this.props.fetchStudentData();
        this.setState({
            ...this.state,
            deleteModal:false,
            showManageButtons: true
        });
    }
    confirmDeleteModal(){
        const studentName= this.props.name;
        return(
            <span>
              <div className='confirm-modal'>
                  <div className="modal-content">
                    <div className="modal-header">
                        <div className="modal-title">
                            <button onClick={()=> this.setState({deleteModal: false, showManageButtons: true})} type="button" className="close" data-dismiss="modal">&times;</button>
                            <h2 className="modal-title">Please confirm the following action</h2>
                        </div>
                    </div>
                      <div className="modal-body">
                      <p>Are you sure you want to delete : <strong>{studentName}</strong> from your grade table? </p>
                          <div className="modal-footer">
                                <button onClick={()=> this.handleDelete()} className='btn btn-success'>Confirm</button>
                                <button onClick={()=> this.setState({deleteModal: false, showManageButtons:true})} className='btn btn-danger'>Cancel</button>
                          </div>
                      </div>
                  </div>
              </div>
            </span>
        )
    }
    handleEdit(){
        console.log('these are teh props after hitting edit ', this.props);
        this.setState({...this.state, canEdit: true});
    }
    render(){
        // const {name, course, grade}= this.state.form;
        const {canEdit,showManageButtons}= this.state;
        const staticStudent= (
            <tr>
                <td>{this.props.name}</td>
                <td>{this.props.course}</td>
                <td>{this.props.grade}</td>
                <td>
                    {!showManageButtons?
                        <button onClick={()=> this.setState({...this.state, showManageButtons: true})} className='btn btn-info'>Manage</button>:
                        <span>
                            <button onClick= {()=>{this.setState({...this.state, deleteModal: true})}} className='btn btn-danger'>Delete</button>
                            <button onClick={()=> this.handleEdit()} className='btn btn-primary'>Edit</button>
                            <button onClick= {()=>this.setState({...this.state, showManageButtons:false})} className='btn btn-default' >Back</button>
                        </span>
                    }

                    {this.state.deleteModal? this.confirmDeleteModal(): ''}
                </td>
            </tr>
        );
        const inputFields= (
            <tr>
                {/*<Field placeholder='Student Name' name='name' label='Name' type='text' component={this.renderInput}/>*/}
                <td><Field component= {this.renderInput} type= 'text' name='name'  placeholder={this.props.name} value={this.props.name} /></td>
                <td><Field component= {this.renderInput} type= 'text' name='course' placeholder={this.props.course} value={this.props.course} /></td>
                <td><Field component= {this.renderInput} type= 'number' name='grade' placeholder = {this.props.grade} value={this.props.grade} /></td>
                <td>
                    <button onClick={this.props.handleSubmit(this.handleFormSubmission.bind(this))} type='submit' className='btn btn-success'>Save</button>
                </td>
            </tr>
        );
        if(canEdit){
            return inputFields;
        }else{
            return staticStudent;
        }
    }
}
function validate(values) {
    const error = {};
    error.invalidName =regex.validateName(values.name);
    error.invalidCourse= regex.validateName(values.course);
    error.invalidGrade =regex.validateNumber(values.grade);
    if(!values.name){
        error.name= "Please enter a name";
    }
    if(error.invalidName){
        error.name= "Valid name required";
    }
    if(!values.course){
        error.course = 'Please enter a course';
    }
    if(error.invalidCourse){
        error.course= "Valid course required"
    }
    if(!values.grade){
        error.grade = 'Please enter a grade';
    }
    if(error.invalidGrade){
        error.grade= "Grade between 0-100 required";
    }
    return error;
}
IndividualStudent = reduxForm({
    form: "individual-student",
    validate: validate
})(IndividualStudent);

function mapStateToProps(state){
    return{
        students: state.studentData.students,
        average: state.studentData.average
    }
}

export default connect(mapStateToProps,{fetchStudentData, deleteStudent,updateStudent})(IndividualStudent);