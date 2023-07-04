import axios from 'axios';

export const CalenderEntry = async (actualDate, changedDate, reason) => {
  try {
    const token = localStorage.getItem('token');
    const empId = localStorage.getItem('empId');
    const response = await axios.post(
      `http://localhost:8080/api/sendrequest/${empId}`,
      {
        actualDate: actualDate,
        changedDate: changedDate,
        reason: reason,
      },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    // Return the response or any specific data you need
    return response.data;
  } catch (error) {
    // Handle any errors and return an appropriate value or throw an exception
    console.error('Error:', error);
    throw error;
  }
};
