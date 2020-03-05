const colourStyles = {
  option: (provided, state) => ({
    ...provided,
    borderBottom: '1px solid E2E2E0',
    color: state.isSelected ? 'E2E2E0' : 'F7F7F4',
    padding: 10
  }),
  control: (base, state) => ({
    ...base,
    background: '#F7F7F4',
    // match with the menu
    borderRadius: state.isFocused ? '3px 3px 0 0' : 3,
    // Overwrittes the different states of border
    borderColor: state.isFocused ? '#E2E2E0' : '#E2E2E0',
    // Removes weird border around container
    boxShadow: state.isFocused ? null : null,
    '&:hover': {
      // Overwrittes the different states of border
      borderColor: state.isFocused ? 'rgb(196, 196, 196)' : 'rgb(196, 196, 196)'
    }
  }),
  multiValue: (provided, state) => {
    const opacity = state.isDisabled ? 0.5 : 1
    const transition = 'opacity 300ms'

    return { ...provided, opacity, transition }
  }
}

export default colourStyles