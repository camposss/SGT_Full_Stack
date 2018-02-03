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
        // console.log("this is the state after clicking delete button", index);
        const studentId= this.props.students[this.state.studentIndex].id;
        console.log('this is the index of what you clicked ', studentId);
        this.props.deleteStudent(studentId).then(()=>{
            this.props.fetchStudentData().then(()=>{
                this.setState({
                    deleteModal: false
                })
            });
        });
    }
    confirmDeleteModal(){
        // return PetListModal(this.state, self );
        const {studentIndex}= this.state;
        const index= this.props.students[studentIndex];
        return(
            <span>
          <div className='confirm-modal '>
              <div className="content-modal">
                  <div className="card">
                      <div className="card-header">Are you sure you want to delete:</div>
                      <div className="card-block">
                      </div>
                      <div className="card-footer">
                            <button onClick={()=> this.handleDelete()} className='btn btn-outline-success'>Confirm</button>
                            <button onClick={()=> this.setState({deleteModal: false, canDelete: false})} className='btn btn-outline-danger'>Cancel</button>
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
                        <td><button onClick= {()=>{this.setState({deleteModal: true, studentIndex:index})}} className='btn btn-danger'>Delete</button></td>
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
                <tbody>
                {studentList}
                </tbody>
                {this.state.deleteModal? this.confirmDeleteModal(): ''}
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