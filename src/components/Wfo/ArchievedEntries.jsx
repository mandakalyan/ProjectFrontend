import React from "react";

export const ArchievedEntries =({entries})=>{




    return(
        <div>
            {/* <h2>Archieved Entries</h2> */}

        <table className='table table-bordered table-hover table-striped custom-table'>
            <thead>
                <tr>
          <th > Actual Date</th>
            <th>Changed Date</th>
            <th>Reason</th>
            <th>Status</th>
                </tr>
            </thead>
            <tbody>
               { entries.map((entry,index) =>(
                <tr key={index}>
                    <td>{entry.actualDate}</td>
                    <td>{entry.changedDate}</td>
                    <td>{entry.reason}</td>
                    <td>{entry.status}</td>
                </tr>
               ))}
            </tbody>

        </table>
        </div>

    );
    

};