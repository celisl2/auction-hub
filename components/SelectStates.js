import React from 'react';
import Select from 'react-select';

const options = [
    {
        label: 'AL',
        value: 'AL'
      },
      {
        label: 'AK',
        value: 'AK'
      },
      {
        label: 'AS',
        value: 'AS'
      },
      {
        label: 'AZ',
        value: 'AZ'
      },
      {
        label: 'AR',
        value: 'AR'
      },
      {
        label: 'CA',
        value: 'CA'
      },
      {
        label: 'CO',
        value: 'CO'
      },
      {
        label: 'CT',
        value: 'CT'
      },
      {
        label: 'DE',
        value: 'DE'
      },
      {
        label: 'DC',
        value: 'DC'
      },
      {
        label: 'FM',
        value: 'FM'
      },
      {
        label: 'FL',
        value: 'FL'
      },
      {
        label: 'GA',
        value: 'GA'
      },
      {
        label: 'GU',
        value: 'GU'
      },
      {
        label: 'HI',
        value: 'HI'
      },
      {
        label: 'ID',
        value: 'ID'
      },
      {
        label: 'IL',
        value: 'IL'
      },
      {
        label: 'IN',
        value: 'IN'
      },
      {
        label: 'IA',
        value: 'IA'
      },
      {
        label: 'KS',
        value: 'KS'
      },
      {
        label: 'KY',
        value: 'KY'
      },
      {
        label: 'LA',
        value: 'LA'
      },
      {
        label: 'ME',
        value: 'ME'
      },
      {
        label: 'MH',
        value: 'MH'
      },
      {
        label: 'MD',
        value: 'MD'
      },
      {
        label: 'MA',
        value: 'MA'
      },
      {
        label: 'MI',
        value: 'MI'
      },
      {
        label: 'MN',
        value: 'MN'
      },
      {
        label: 'MS',
        value: 'MS'
      },
      {
        label: 'MO',
        value: 'MO'
      },
      {
        label: 'MT',
        value: 'MT'
      },
      {
        label: 'NE',
        value: 'NE'
      },
      {
        label: 'NV',
        value: 'NV'
      },
      {
        label: 'NH',
        value: 'NH'
      },
      {
        label: 'NJ',
        value: 'NJ'
      },
      {
        label: 'NM',
        value: 'NM'
      },
      {
        label: 'NY',
        value: 'NY'
      },
      {
        label: 'NC',
        value: 'NC'
      },
      {
        label: 'ND',
        value: 'ND'
      },
      {
        label: 'MP',
        value: 'MP'
      },
      {
        label: 'OH',
        value: 'OH'
      },
      {
        label: 'OK',
        value: 'OK'
      },
      {
        label: 'OR',
        value: 'OR'
      },
      {
        label: 'PW',
        value: 'PW'
      },
      {
        label: 'PA',
        value: 'PA'
      },
      {
        label: 'PR',
        value: 'PR'
      },
      {
        label: 'RI',
        value: 'RI'
      },
      {
        label: 'SC',
        value: 'SC'
      },
      {
        label: 'SD',
        value: 'SD'
      },
      {
        label: 'TN',
        value: 'TN'
      },
      {
        label: 'TX',
        value: 'TX'
      },
      {
        label: 'UT',
        value: 'UT'
      },
      {
        label: 'VT',
        value: 'VT'
      },
      {
        label: 'VI',
        value: 'VI'
      },
      {
        label: 'VA',
        value: 'VA'
      },
      {
        label: 'WA',
        value: 'WA'
      },
      {
        label: 'WV',
        value: 'WV'
      },
      {
        label: 'WI',
        value: 'WI'
      },
      {
        label: 'WY',
        value: 'WY'
      }

]

class SelectStates extends React.Component {
  state = {
    selectedOption: null,
  };
  handleChange = selectedOption => {
    this.setState(
      { selectedOption },
      () => console.log(`Option selected:`, this.state.selectedOption)
    );
  };
  render() {
    const { selectedOption } = this.state;

    return (
      <Select
        value={selectedOption}
        onChange={this.handleChange}
        options={options}
      />
    );
  }
}

export default SelectStates;