import React, {Component} from 'react';
import {connect} from 'react-redux';
import {fetchStudentData} from "../actions/";
import StudentComponent from './student_component';
import '../assets/css/modal.css';


class StudentTable extends Component{
    constructor(props){
        super(props);
    }

    componentDidMount() {
        this.props.fetchStudentData().then(()=>{
            console.log('these are the props in student table ', this. props);
        });
    }

    render(){
        console.log('these are teh props in render student table ', this.props);
        const studentList = this.props.students.map((item,index)=>{
            return(
                <StudentComponent key={index} index={index} {...item}/>
            )
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
            </table>
        )
    }
}
function mapStateToProps(state){
    return{
        students: state.studentData.students,
    }
}

export default connect(mapStateToProps,{fetchStudentData})(StudentTable);