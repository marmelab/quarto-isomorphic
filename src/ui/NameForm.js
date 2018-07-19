import React, { Component } from 'react';
import styled from 'react-emotion';
import PropTypes from 'prop-types';
import avatarService from '../services/avatarService.js';
import Colors from './Colors';

const AvatarContainer = styled('img')`
    width: 50px;
    height: auto;
    vertical-align: middle;
    background-color: ${Colors.white};
    margin: 0px 4px;
    border-radius: 3px;
    box-shadow: 2px 2px 2px 0 rgba(0, 0, 0, 0.2);
`;

const NameFormContainer = styled('div')`
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
    padding: 4px;
    vertical-align: middle;
    border: 1px solid blue;
    border-radius: 3px;
    margin: 4px;
    height: 50px;
    width: 40%;
    align-self: center;
    font-weight: bold;
    input {
        margin: 4px;
    }
`;

class NameForm extends Component {
    constructor(props) {
        super(props);
        this.state = { value: 'John Doe' };

        this.handleChange = this.handleChange.bind(this);
    }

    handleChange(event) {
        this.setState({ value: event.target.value });
        this.props.action(event.target.value);
    }

    componentDidMount = () => {
        this.props.action(this.state.value);
    };

    render() {
        return (
            <NameFormContainer>
                <label>
                    Choose my name :
                    <input
                        type="text"
                        value={this.state.value}
                        onChange={this.handleChange}
                    />
                </label>
                <AvatarContainer src={avatarService(this.state.value)} />
            </NameFormContainer>
        );
    }
}

NameForm.propTypes = {
    action: PropTypes.func.isRequired,
};

export default NameForm;
