import React, {Component} from 'react';
import {connect} from 'react-redux';
import {fetchStudentData} from "../actions/";


class StudentTable extends Component{

    componentDidMount() {
        this.props.fetchStudentData().then(()=>{
            console.log('these are the props in student grade layout comp ', this.props.students);
        })
    }
    render(){

        const studentList = this.props.students.map((item,index)=>{
            if(index<=25){
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
            <tbody>
                {studentList}
            </tbody>

        )
    }
}
function mapStateToProps(state){
    return{
        students: state.studentData
    }
}

export default connect(mapStateToProps,{fetchStudentData})(StudentTable);