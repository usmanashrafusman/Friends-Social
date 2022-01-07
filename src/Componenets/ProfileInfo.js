import React from 'react'

export default function ProfileInfo(props) {
    return (
        <div className="info">
        <p>
          {props.Info.firstName + " " + props.Info.lastName}
          <br />
          <span className="gen"> {props.Info.gender} </span>
        </p>
        <p style={{ fontSize: "22px" }}>
          Email:
          <span style={{ color: "#4083c5", fontSize: "19px" }}>
            {props.Info.email}
          </span>
        </p>
      </div>
    )
}
