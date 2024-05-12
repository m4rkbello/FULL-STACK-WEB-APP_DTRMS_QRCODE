import React, { useEffect } from 'react'
import { connect } from 'react-redux';
import { fetchDeparments } from '../../../redux/actions/departmentAction';

const Department = (props) => {
  console.log("DATA SA FETCH DEPARTMENT", props && props);

  useEffect(() => {
    props.fetchDeparments();
  },[])



  return (
    <div className='bg-base-200 h-full w-full'>
      <div className='bg-base-300 h-full w-full'>
        <div className="overflow-x-auto h-full w-full">
        <table className="table w-full h-full">
            {/* head */}
            <thead>
              <tr>
                <th></th>
                <th>Name</th>
                <th>Job</th>
                <th>Favorite Color</th>
              </tr>
            </thead>
            <tbody>
              {/* row 1 */}
              <tr>
                <th>1</th>
                <td>Cy Ganderton</td>
                <td>Quality Control Specialist</td>
                <td>Blue</td>
              </tr>
              {/* row 2 */}
              <tr className="hover">
                <th>2</th>
                <td>Hart Hagerty</td>
                <td>Desktop Support Technician</td>
                <td>Purple</td>
              </tr>
              {/* row 3 */}
              <tr>
                <th>3</th>
                <td>Brice Swyre</td>
                <td>Tax Accountant</td>
                <td>Red</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}

const mapStateToProps = (state) => {
  return {
    departmentData: state.departmentState
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    fetchDeparments: () => dispatch(fetchDeparments()),
    
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Department);
