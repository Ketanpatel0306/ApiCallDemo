import React from 'react'

export const Same =  () => {
    var requestOptions = {
        method: 'GET',
        redirect: 'follow'
      };
      
      fetch(" 'http://api.covid19india.org/state_district_wise.json' ", requestOptions)
        .then(response => response.json())
        .then(result => console.log(result))
        .catch(error => console.log('error', error));

    return (
        <div>Api</div>
    )
}
