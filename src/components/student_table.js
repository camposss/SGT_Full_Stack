import React, {Component} from 'react';
import {connect} from 'react-redux';
import {fetchStudentData,deleteStudent} from "../actions/";
import '../assets/css/modal.css';


class StudentTable extends Component{
    constructor(props){
        super(props);
        this.state= {
            deleteModal: false,
            studentIndex: null
        };
        this.confirmDeleteModal= this.confirmDeleteModal.bind(this);
    }
    componentDidMount() {
        this.props.fetchStudentData().then(()=>{
            console.log('these are the props in student table ', this. props);
        });
    }
    handleDelete(){
        const studentId= this.props.students[this.state.studentIndex].id;
        console.log('this is the index of what you clicked ', studentId);
        this.props.deleteStudent(studentId).then(()=>{
            this.setState({
                deleteModal: false
            })

        }).then(()=>{
            console.log('these are the props after handle delete ', this.props);
            this.props.fetchStudentData();
        });
    }
    confirmDeleteModal(){
        const studentName= this.props.students[this.state.studentIndex].name;
        console.log('student info ', studentName);
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
    render(){
        const studentList = this.props.students.map((item,index)=>{
            if(index>195){
                return(
                    <tr key={index}>
                        <td>{item.name}</td>
                        <td>{item.course}</td>
                        <td>{item.grade}</td>
                        <td>
                            <button onClick= {()=>{this.setState({deleteModal: true, studentIndex:index})}} className='btn btn-danger'>Delete
                            </button>
                            <button className='btn btn-primary'>Update</button>
                        </td>
                        <td></td>
                    </tr>
                )
            }
        });
        return(
            <table className="table student-list pull-left">
                <thead>
                <tr>
                    <th>Student Name</th>
                    <th>Student Course</th>
                    <th>Student Grade</th>
                    <th>Operations</th>
                </tr>
                </thead>
                <tbody>{studentList}</tbody>
                <div>
                    {this.state.deleteModal? this.confirmDeleteModal(): ''}
                </div>
            </table>
        )
    }
}
function mapStateToProps(state){
    return{
        students: state.studentData
    }
}

export default connect(mapStateToProps,{fetchStudentData, deleteStudent})(StudentTable);