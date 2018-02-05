import React, {Component} from 'react';
import {connect} from 'react-redux';
import '../assets/css/app.css';
import {fetchStudentData,deleteStudent,updateStudent} from "../actions/";



class StudentComponent extends Component {
    constructor(props) {
        super(props);
        this.state= {
            deleteModal: false,
            canEdit: false,
            form:{
                name: this.props.name,
                course: this.props.course,
                grade: this.props.grade
            }
        };
        this.confirmDeleteModal= this.confirmDeleteModal.bind(this);
    }
    handleInputChange(e){
        const {form} = this.state;
        const {name,value}= e.target;
        form[name]= value;
        this.setState({form: {...form}});
    }
    handleDelete(){
        const studentId= this.props.id;
        this.props.deleteStudent(studentId).then(()=>{
            this.setState({
                deleteModal: false
            })

        }).then(()=>{
            this.props.fetchStudentData();
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
                            <button onClick={()=> this.setState({deleteModal: false})} type="button" className="close" data-dismiss="modal">&times;</button>
                            <h2 className="modal-title">Please confirm the following action</h2>
                        </div>
                    </div>
                      <div className="modal-body">
                      <p>Are you sure you want to delete : <strong>{studentName}</strong> from your grade table? </p>
                          <div className="modal-footer">
                                <button onClick={()=> this.handleDelete()} className='btn btn-success'>Confirm</button>
                                <button onClick={()=> this.setState({deleteModal: false})} className='btn btn-danger'>Cancel</button>
                          </div>
                      </div>
                  </div>
              </div>
            </span>
        )
    }
    saveChanges(){
        console.log('we clicked the save Changes button and now are in the function', this.props);
        this.props.updateStudent(this.state.form, this.props.id).then(()=>{
            this.props.fetchStudentData().then(()=>{
                this.setState({
                    canEdit: false
                })
            });
            console.log('these are now the students after updating ', this.props.students);
        })

    }
    render(){
        const {name, course, grade}= this.state.form;
        const {canEdit}= this.state;
        const staticStudent= (
            <tr>
                <td>{this.props.name}</td>
                <td>{this.props.course}</td>
                <td>{this.props.grade}</td>
                <td>
                    <button onClick= {()=>{this.setState({deleteModal: true})}} className='btn btn-danger'>Delete
                    </button>
                    <button onClick={()=> this.setState({...this.state, canEdit: true})} className='btn btn-primary'>Update</button>
                    {this.state.deleteModal? this.confirmDeleteModal(): ''}
                </td>
            </tr>
        );
        const inputFields= (
            <tr>
                <td><input onChange= {(e)=>this.handleInputChange(e)} type= 'text' name='name' value={name} /></td>
                <td><input onChange= {(e)=>this.handleInputChange(e)} type= 'text' name='course' value={course} /></td>
                <td><input onChange= {(e)=>this.handleInputChange(e)} type= 'number' name='grade' value={grade} /></td>
                <td><button onClick={()=> this.saveChanges()} className='btn btn-success'>Save</button></td>
            </tr>
        );
        if(canEdit){
            return inputFields;
        }else{
            return staticStudent;
        }
    }
}

function mapStateToProps(state){
    return{
        students: state.studentData.students,
        average: state.studentData.average
    }
}

export default connect(mapStateToProps,{fetchStudentData, deleteStudent,updateStudent})(StudentComponent);