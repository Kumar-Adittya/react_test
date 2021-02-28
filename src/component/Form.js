import React, { Component } from 'react';
import EmpTable from './EmpTable'
import PropTypes from 'prop-types';

class Form extends Component {
    constructor(props) {
        super(props)

        this.state = {
            emp_name: '',
            emp_salary: '',
            emp_age: '',
            profile_img: '',
            emp_data: [],
            emp_search: ''
        }
        this.onChangeHandler = this.onChangeHandler.bind(this);
        this.onSubmitHandler = this.onSubmitHandler.bind(this);
        this.onSearchHandler = this.onSearchHandler.bind(this);
        JSON.parse(localStorage.getItem("emp_data")) ? JSON.parse(localStorage.getItem("emp_data")) : localStorage.setItem("emp_data", JSON.stringify([]));
    }

    onChangeHandler(event) {
        const target = event.target;
        const value = target.value;
        const name = target.name;
        this.setState({
            [name]: value
        });
    }

    onSubmitHandler(e) {
        e.preventDefault();
        let frmObj = {};
        frmObj.emp_name = this.state.emp_name
        frmObj.emp_age = this.state.emp_age
        frmObj.emp_salary = this.state.emp_salary
        frmObj.profile_img = this.state.profile_img

        this.setState({
            emp_name: '',
            emp_salary: '',
            emp_age: '',
            profile_img: '',
            emp_data: [...this.state.emp_data, frmObj]
        }, () => { 
            localStorage.setItem("emp_data", JSON.stringify(this.state.emp_data));
        }) 
       
    }

    onSearchHandler(event) {
        this.setState({
            [event.target.name]: [event.target.value]
        });
        let filteredData = this.state.emp_data.filter((elem, index, self) =>
            index !== self.findIndex((t) => (
                t.emp_name === elem.emp_name
            ))
        )
        this.setState({
            emp_data: filteredData
        })
    }

    componentDidMount() {
        let allEmpData = JSON.parse(localStorage.getItem("emp_data")) ? JSON.parse(localStorage.getItem("emp_data")) : [];
        this.setState({
            emp_data: allEmpData
        })
    }

    render() {
        const { emp_name, emp_salary, emp_age, profile_img, emp_data } = this.state; 

        return (
            <React.Fragment>
                <form className="form-wrapper" onSubmit={this.onSubmitHandler}>
                    <div className="form-group">
                        <label htmlFor="emp_name">Email Name</label>
                        <input type="text" required onChange={this.onChangeHandler} value={emp_name} className="form-control" name="emp_name" id="emp_name" placeholder="Employee Name" />
                    </div>
                    <div className="form-group">
                        <label htmlFor="emp_salary">Employee salary</label>
                        <input type="text" required onChange={this.onChangeHandler} value={emp_salary} className="form-control" name="emp_salary" id="emp_salary" placeholder="Employee salary" />
                    </div>
                    <div className="form-group">
                        <label htmlFor="emp_age">Employee Age</label>
                        <input type="number" required onChange={this.onChangeHandler} value={emp_age} className="form-control" name="emp_age" id="emp_age" placeholder="Employee Age" />
                    </div>
                    <div className="form-group">
                        <label htmlFor="profile_img">Profile Image</label>
                        <input type="file" required onChange={this.onChangeHandler} value={profile_img} className="form-control" name="profile_img" id="profile_img" placeholder="Employee Age" />
                    </div>
                    <button type="submit" className="btn btn-primary">Submit</button>
                </form>
                <div className="employee_table">
                    <EmpTable empData = {emp_data}/> 
                </div>
            </React.Fragment>
        )
    }
}

Form.propTypes = {
    emp_name: PropTypes.string,
    emp_age: PropTypes.string,
    emp_salary: PropTypes.string, 
  };

export default Form;