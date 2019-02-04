import React from 'react';
import EmployerHome from '../components/Employer/EmployerHome'

class EmployerView extends React.Component {
    constructor(props) {
        super(props)
    }
    render() {
        return (
            <EmployerHome prisonsarray={this.props.prisonsarray} />
        )
    }
}

export default EmployerView;