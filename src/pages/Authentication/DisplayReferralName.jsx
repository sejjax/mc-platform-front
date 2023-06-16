import React from "react"
import PropTypes from "prop-types"
import { useDebounce } from "hooks/useDebounce"
import { useState } from "react"
import { useEffect } from "react"
import { fetchReferralName } from "services/authService"

const DisplayReferralName = ({ referralId, setError, setTouched }) => {
  const [referralName, setReferralName] = useState("")
  const debouncedValue = useDebounce(referralId, 200)

  const fetchDisplayReferralName = async () => {
    const res = await fetchReferralName(referralId)
    setReferralName(res.name)
    if (!res.name) {
      setError("referrerId", "Пригласитель не найден")
      setTouched("referrerId", true)
    }
  }

  useEffect(() => {
    fetchDisplayReferralName()
  }, [debouncedValue])

  return (
    <span>
      {referralName !== null && `Вас пригласил: ${referralName}`}
      {/* {referralName === null && `Пригласитель не найден`} */}
    </span>
  )
}

DisplayReferralName.propTypes = {
  referralId: PropTypes.string,
}
export default DisplayReferralName
