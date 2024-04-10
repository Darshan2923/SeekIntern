import React from 'react'

const Button = ({ onClickhandler, value, title }) => {
  return (
    <button onClick={onClickhandler} value={value} className={`px-4 py-1 border hover:bg-primarygreen hover:text-white`}>
      {title}

    </button>
  )
}

export default Button