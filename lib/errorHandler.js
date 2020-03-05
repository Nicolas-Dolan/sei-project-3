function errorHandler(err, req, res, next) {
  if (err.name === 'ValidationError') {
    const customErrors = {}

    for (const key in err.errors) { // here we're looping through the big error object and making a smaller error object with just the keys of the error object and taking their message value 
      customErrors[key] = err.errors[key].message // [key] this squarebrackets is used as we dont know the value of key yet - it's undefined (square bracket notation)
    }

    return res.status(422).json({ message: 'Unprocessable Entity', errors: customErrors })
  }

  if (err.message === 'Not Found') {
    return res.status(404).json({ message: 'Not Found' })
  }

  res.status(500).json({ message: 'Internal Server Error' })
  next(err)
}


module.exports = errorHandler