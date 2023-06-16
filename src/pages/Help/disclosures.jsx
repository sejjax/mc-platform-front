import React from "react"
import PropTypes from "prop-types"
import ReactMarkdown from "react-markdown"
import parse from "html-react-parser"
import { Root } from "./styles/disclosures"

const Disclosures = ({ state: name, content, bsa = false }) => {
  return (
    <Root>
      <h3>{name}</h3>
      {/* {content && <ReactMarkdown>{parse(content)}</ReactMarkdown>} */}
      {content && parse(content)}
    </Root>
  )
}

export default Disclosures

Disclosures.propTypes = {
  state: PropTypes.string,
  content: PropTypes.string,
  bsa: PropTypes.bool,
}
