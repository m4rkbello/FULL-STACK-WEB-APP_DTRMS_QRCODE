export const setChartData = (data) => {
    return {
      type: 'SET_CHART_DATA',
      payload: data,
    };
  };
  
  const initialState = {
    data: [], // Initial state for chart data
  };
  
  const chartReducer = (state = initialState, action) => {
    switch (action.type) {
      case 'SET_CHART_DATA':
        return {
          ...state,
          data: action.payload,
        };
      default:
        return state;
    }
  };
  
  export default chartReducer;
  