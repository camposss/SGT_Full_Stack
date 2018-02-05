import React, {Component} from 'react';
import {connect} from 'react-redux';
import {fetchStudentData} from "../actions/";
import StudentTable from './student_table';
import {addStudent} from "../actions/";

class StudentGradeLayout extends Component{
    constructor(props){
        super(props);
        this.state= {
            form: {
                name: '',
                course: '',
                grade: ''
            }
        }
    }
    componentDidMount(){
        this.props.fetchStudentData().then(()=>{
            console.log('these are teh props in student table layout ,', this.props);

        });
    }
    handleInputChange(e){
        const {form} = this.state;
        const {name,value}= e.target;
        form[name]= value;
        this.setState({form: {...form}});
    }
    handleAddButton(e){
        e.preventDefault();
        const {name,course,grade} = this.state.form;
        this.props.addStudent(name,course,grade).then(()=>{
            this.props.fetchStudentData();
        }).then(()=>{
            // this.calculateGradeAverage(this.props.students);
            this.setState({
                form: {
                    name: '',
                    course: '',
                    grade: ''
                }
            })
        });
    }
    render(){
        const {name,course,grade}= this.state.form;
        const {average,students}= this.props;
        return(
        <div className="container">
            <div className="row">
                <h1 className="page-header visible-md visible-lg">Student Grade Table
                    <small className = "pull-right visible-md visible-lg">Grade Average : <span className="avgGrade label label-default">{students.length? average: 0}</span></small>
                </h1>
                <h3 className = "page-header hidden-md hidden-lg">Student Grade Table
                    <small className = "pull-right hidden-md hidden-lg">Grade Average : <span className="avgGrade label label-default">{students.length? average: 0}</span></small>
                </h3>
            </div>
            <form>
                <div className="student-add-form col-md-4 pull-right">
                    <h4>Add Student</h4>
                    <div className="input-group form-group">
                        <span className="input-group-addon">
                            <span className="glyphicon glyphicon-user"></span>
                        </span>
                        <input onChange={(e)=>this.handleInputChange(e)} type="text" className="form-control" name="name" value = {name} id="studentName" placeholder="Student Name"/>
                    </div>
                    <div className="input-group form-group">
                        <span className="input-group-addon">
                            <span className="glyphicon glyphicon-list-alt"></span>
                        </span>
                        <input onChange={(e)=>this.handleInputChange(e)} type="text" className="form-control" name="course" id="course" value={course}
                               placeholder="Student Course"/>
                    </div>
                    <div className="input-group form-group">
                        <span className="input-group-addon">
                            <span className="glyphicon glyphicon-education"></span>
                        </span>
                        <input onChange={(e)=>this.handleInputChange(e)} type="text" className="form-control" name="grade" id="studentGrade" value={grade}
                               placeholder="Student Grade"/>
                    </div>
                    <button type="submit" className="btn btn-success" onClick={(e)=>this.handleAddButton(e)}>Add</button>
                </div>
            </form>
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
//
// export default connect(mapStateToProps,{fetchStudentData})(StudentGradeLayout);

export default connect(mapStateToProps, {addStudent, fetchStudentData}) (StudentGradeLayout);