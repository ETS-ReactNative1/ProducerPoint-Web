import React from 'react'

const ProfileDetails = ({data}) => {

    console.log(data)

    return (
        <div>
            {data.name}
        </div>
    )
}

export default ProfileDetails
