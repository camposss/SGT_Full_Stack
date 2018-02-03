import React, {Component} from 'react';
import {connect} from 'react-redux';
import {fetchStudentData,deleteStudent} from "../actions/";


class StudentTable extends Component{
    // constructor(props){
    //     super(props);
    //
    //     this.state= {
    //     }
    // }
    componentDidMount() {
        this.props.fetchStudentData().then(()=>{
            console.log('these are the props in student table ', this. props);
        });
    }
    handleDelete(index){
        const studentId= this.props.students[index].id;
        console.log('this is the index of what you clicked ', studentId);
        this.props.deleteStudent(studentId).then(()=>{
            this.props.fetchStudentData();
        });
    }
    render(){
        const studentList = this.props.students.map((item,index)=>{
            if(index>195){
                return(
                    <tr key={index}>
                        <td>{item.name}</td>
                        <td>{item.course}</td>
                        <td>{item.grade}</td>
                        <td><button onClick= {()=>{this.handleDelete(index)}} className='btn btn-danger'>Delete</button></td>
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