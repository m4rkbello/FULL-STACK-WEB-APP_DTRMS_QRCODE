export const setChartData = (data) => (dispatch) => {
    dispatch({
      type: 'SET_CHART_DATA',
      payload: data,
    });
  };
  