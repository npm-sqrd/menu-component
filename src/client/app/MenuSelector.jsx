import React from 'react';
import PropTypes from 'prop-types';
import EntreeMenu from './EntreeMenu.jsx';
import DessertFilterMenu from './DessertFilterMenu.jsx';

const MenuType = ((props) => {
  if (props.tag === 'none' && props.type !== 'dessert') {
    return (<EntreeMenu
      tag={props.tag}
      type={props.type}
      menu={props.menu}
    />);
  }
  return (<DessertFilterMenu
    tag={props.tag}
    type={props.type}
    menu={props.menu}
  />);
});

MenuType.propTypes = {
  menu: PropTypes.arrayOf(PropTypes.shape({
    foodItem: PropTypes.string.isRequired,
    cost: PropTypes.number.isRequired,
    tags: PropTypes.string.isRequired,
  }).isRequired).isRequired,
  type: PropTypes.string.isRequired,
  tag: PropTypes.string.isRequired,
};

export default MenuType;
