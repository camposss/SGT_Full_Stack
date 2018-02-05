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
            },
            gradeAverage: null
        }
    }
    componentDidMount(){
        this.props.fetchStudentData().then(()=>{
            this.calculateGradeAverage(this.props.students);
            console.log('these are teh props in student table layout ,', this.props);

        });
    }
    calculateGradeAverage(students){

        //might need to convert this action into redux so I can access to it in the studen table component for deleting
        let sum=null;
        let count = 0;
        students.map((item, index)=>{
            if(index>195){
                count++;
                sum= sum+ parseInt(item.grade);
            }
        });
        const result = (sum/count).toFixed(2);
        console.log(result);
        this.setState({
            gradeAverage: result
        })
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
            this.calculateGradeAverage(this.props.students);
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
        const {gradeAverage}= this.state;
        return(
        <div className="container">
            <div className="row">
                <h1 className="page-header visible-md visible-lg">Student Grade Table
                    <small className = "pull-right visible-md visible-lg">Grade Average : <span className="avgGrade label label-default">{gradeAverage}</span></small>
                </h1>
                <h3 className = "page-header hidden-md hidden-lg">Student Grade Table
                    <small className = "pull-right hidden-md hidden-lg">Grade Average : <span className="avgGrade label label-default">{gradeAverage}</span></small>
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
                    {/*<button type="button" className="btn btn-default" onClick="">Cancel</button>*/}
                    {/*<button type="button" className="btn btn-info" onClick="">Get Data From Server</button>*/}
                </div>
            </form>
            <div className="student-list-container col-md-8">
                <StudentTable/>
            </div>
        </div>
        )
    }

}

function mapStateToProps(state){
    return{
        students: state.studentData
    }
}
//
// export default connect(mapStateToProps,{fetchStudentData})(StudentGradeLayout);

export default connect(mapStateToProps, {addStudent, fetchStudentData}) (StudentGradeLayout);