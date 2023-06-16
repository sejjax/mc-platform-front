import PropTypes from "prop-types"
import React, { useEffect } from "react"
import { withRouter } from "react-router-dom"
import { logoutUser } from "../../store/actions"
import { useDispatch } from "react-redux"
import { useDisconnect } from "wagmi"

const Logout = props => {
  const dispatch = useDispatch()
  const { disconnect } = useDisconnect()

  useEffect(() => {
    disconnect()
    dispatch(logoutUser(props.history))
  }, [])

  return <></>
}

Logout.propTypes = {
  history: PropTypes.object,
}

export default withRouter(Logout)
