import React, { useState } from 'react';

function EmpTable(props) {
    var empList = props.empData;

    const [searchText, setSearchText] = useState("");
    const [data, setData] = useState([...props.empData]);
    console.log("data",data) 
    React.useEffect(() => {
        setData(props.empData);
    }, [props.empData])
  
    const excludeSearch = ["emp_age", "emp_salary", "profile_img"];
 
    const handleChange = value => {
        setSearchText(value);
        filterTable(value);
    };

    // filter records by search text
    const filterTable = (value) => {
        const lowercasedValue = value.toLowerCase().trim();
        if (lowercasedValue === "") setData(empList);
        else {
            const filteredEmployee = empList.filter(item => {
                return Object.keys(item).some(key =>
                    excludeSearch.includes(key) ? false : item[key].toString().toLowerCase().includes(lowercasedValue)
                );
            });
            setData(filteredEmployee);
        }
    }

    return (
        <div>
            {console.log(data)} 
           <input 
                type="text"
                className="form-control"
                placeholder="Search Employee"
                value={searchText}
                onChange={e => handleChange(e.target.value)}
            />
            <table>
                <thead>
                    <tr>
                        <th>Employee Name</th>
                        <th>Salary</th>
                        <th>Age</th>
                        <th>Profile Image</th>
                    </tr>
                </thead>
                <tbody>
                    {data.map((data, i) => (
                        <tr key={i}>
                            <td>{data.emp_name}</td>
                            <td>{data.emp_salary}</td>
                            <td>{data.emp_age}</td>
                            <td>{data.profile_img}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}

export default EmpTable;
