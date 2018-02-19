import React, {Component} from 'react';
import {connect} from 'react-redux';
import {fetchStudentData} from "../actions/";
import StudentTable from './student_table';
import AddForm from './add_form';
import '../assets/css/app.css';

class App extends Component{
    constructor(props){
        super(props);

    }
    componentDidMount(){
        this.props.fetchStudentData();
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
                <AddForm/>
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

export default connect(mapStateToProps,  {fetchStudentData}) (App);