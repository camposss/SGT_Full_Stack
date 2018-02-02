import React, {Component} from 'react';
import {connect} from 'react-redux';
import {fetchStudentData} from "../actions/";
import StudentTable from './student_table';

class StudentGradeLayout extends Component{

    // componentDidMount() {
    //     this.props.fetchStudentData().then(()=>{
    //         console.log('these are the props in student grade layout comp ', this.props.students);
    //     })
    // }
    render(){
        return(
        <div className="container">
            <div className="row">
                <h1 className="page-header visible-md visible-lg">Student Grade Table
                    <small className = "pull-right visible-md visible-lg">Grade Average : <span className="avgGrade label label-default">0</span></small>
                </h1>
                <h3 className = "page-header hidden-md hidden-lg">Student Grade Table
                    <small className = "pull-right hidden-md hidden-lg">Grade Average : <span className="avgGrade label label-default">0</span></small>
                </h3>
            </div>
            <div className="student-add-form col-md-4 pull-right">
                <h4>Add Student</h4>
                <div className="input-group form-group">
            <span className="input-group-addon">
                <span className="glyphicon glyphicon-user"></span>
            </span>
                    <input type="text" className="form-control" name="studentName" id="studentName" placeholder="Student Name"/>
                </div>
                <div className="input-group form-group">
            <span className="input-group-addon">
                <span className="glyphicon glyphicon-list-alt"></span>
            </span>
                    <input type="text" className="form-control" name="course" id="course"
                           placeholder="Student Course"/>
                </div>
                <div className="input-group form-group">
            <span className="input-group-addon">
                <span className="glyphicon glyphicon-education"></span>
            </span>
                    <input type="text" className="form-control" name="studentGrade" id="studentGrade"
                           placeholder="Student Grade"/>
                </div>
                <button type="button" className="btn btn-success" onClick="">Add</button>
                <button type="button" className="btn btn-default" onClick="">Cancel</button>
                <button type="button" className="btn btn-info" onClick="">Get Data From Server</button>
            </div>
            <div className="student-list-container col-md-8">
                <table className="table student-list pull-left">
                    <thead>
                    <tr>
                        <th>Student Name</th>
                        <th>Student Course</th>
                        <th>Student Grade</th>
                        <th>Operations</th>
                    </tr>
                    </thead>
                    <StudentTable/>
                </table>
            </div>
            {/*<div id="failureModal" className="modal fade" role="dialog">*/}
                {/*<div className="modal-dialog">*/}
                    {/*<div className="modal-content">*/}
                        {/*<div className="modal-header">*/}
                            {/*<button type="button" className="close" data-dismiss="modal">&times;</button>*/}
                            {/*<h4 className="modal-title">Error!!!</h4>*/}
                        {/*</div>*/}
                        {/*<div className="modal-body">*/}
                            {/*<p className="modal_text">Some text in the modal.</p>*/}
                        {/*</div>*/}
                        {/*<div className="modal-footer">*/}
                            {/*<button type="button" className="btn btn-default" data-dismiss="modal">Close</button>*/}
                        {/*</div>*/}
                    {/*</div>*/}
                {/*</div>*/}
            {/*</div>*/}
        </div>
        )
    }

}
function mapStateToProps(state){
    return{
        students: state.studentData
    }
}

export default connect(mapStateToProps,{fetchStudentData})(StudentGradeLayout);