/* eslint-disable react/prop-types */
/* eslint-disable no-undef */
/* eslint-disable react-refresh/only-export-components */
/* eslint-disable no-unused-vars */
import React, {useEffect} from 'react'
import { connect } from 'react-redux';

//REDUX-ACTION-DISPATCH
import { fetchRates } from '../../../redux/actions/rateAction';

const Rates = (props) => {
  console.log("DATA HAYS", props);

  useEffect(() => {
    props.fetchRates();
  }, []);

  return (
          <div className='h-full max-h-full w-full max-w-full glass mx-auto p-4 '>

          </div>
  )
}




const mapToStateToProps = (state) => {
  return {
    ratesData: state.rateState,
  };
};

const mapToDispatchToProps = (dispatch) => {
  return {
    fetchRates: () => dispatch(fetchRates()),
  };
};


export default connect(mapToStateToProps, mapToDispatchToProps)(Rates);
