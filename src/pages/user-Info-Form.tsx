import React, { ReactElement, useEffect, useState } from 'react';
import {
  Button, Form, Dropdown,
} from 'semantic-ui-react';
import { Link } from 'react-router-dom';

/* Get: /units

response {
    units: [{
        id: number,
        name: string
    }]
}

If error:
    response {
    errMessage: “xxxxxxx”
} */

/*
const unitOptions = requestData.map((data) => {
    return {...data}, ...{text: data.name, value: data.name}
});
*/
type UnitType = {
  id: number,
  name: string,
}
const UserInfoForm: React.FC = (): ReactElement => {
  // react hooks
  const [lastName, setLastName] = useState('');
  const [unit, setUnit] = useState('');
  const [unitOptions, setUnitOptions] = useState([]);

  useEffect(() => {
    fetch('http://backend-env.eba-vppruamm.us-west-2.elasticbeanstalk.com/units')
      .then((response) => response.json())
      .then((data) => {
        setUnitOptions(data.units
          .map((unitObject: UnitType) => ({ ...unitObject, text: unitObject.name, value: unitObject.name })));
      });
  }, []);
  const handleFormSubmit = () => {
    // localStorage.setItem('LastName');
    // localStorage.setItem('user', rememberMe ? user : '');
  };
  const lastNameFieldOnChange = (e: any, { value }: any) => {
    setLastName(value);
  };

  return (
    <div>
      <h1>User Form</h1>
      <Form>
        <Form.Field>
          <label>Last Name</label>
          {/* <input onChange={lastNameFieldOnChange} placeholder="Enter your Last Name" /> */}
        </Form.Field>
        <Form.Field>
          <label>Units</label>
          <Dropdown
            placeholder="Please enter your unit#: "
            fluid
            search
            selection
            options={unitOptions}
          />
        </Form.Field>
        <Button as={Link} to="/quiz" color="green" type="submit">Submit</Button>
      </Form>
    </div>
  );
};
export default UserInfoForm;
