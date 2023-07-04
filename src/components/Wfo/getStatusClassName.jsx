import React from "react";

export function getStatusClassName(status) {
    let className = '';
  
    if (status === 'Pending for Manager Approval') {
      className = 'status-pending';
    } else if (status === 'AGREED') {
      className = 'status-agreed';
    } else if (status === 'DISAGREED') {
      className = 'status-disagreed';
    }
  
    return className;
  }
  