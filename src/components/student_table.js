import React, {Component} from 'react';
import {connect} from 'react-redux';
import {fetchStudentData} from "../actions/";


class StudentTable extends Component{

    componentDidMount() {
        this.props.fetchStudentData();
    }
    render(){
        const studentList = this.props.students.map((item,index)=>{
            if(index>195){
                return(
                    <tr key={index}>
                        <td>{item.name}</td>
                        <td>{item.course}</td>
                        <td>{item.grade}</td>
                        <td><button className='btn btn-danger'>Delete</button></td>
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

export default connect(mapStateToProps,{fetchStudentData})(StudentTable);