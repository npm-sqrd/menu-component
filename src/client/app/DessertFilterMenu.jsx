import React from 'react';
import PropTypes from 'prop-types';
import MenuItem from './MenuItem.jsx';
import styles from './styles/DessertFilterStyles.css';

const DessertFilterMenu = (props) => {
  const dessertHeader = 'Dolce';
  const filterHeader = `${props.type} – ${[props.tag]}`;

  const header = props.tag === 'none' ? dessertHeader : filterHeader;
  if (props.menu.length === 0) {
    return (
      <div />
    );
  }
  return (
    <div className={styles.itemBox}>
      <div className={styles.header}>{header}</div>
      {
        props.menu.map(data => <MenuItem item={data} />)
      }
    </div>
  );
};

DessertFilterMenu.propTypes = {
  menu: PropTypes.arrayOf(PropTypes.shape({
    foodItem: PropTypes.string.isRequired,
    cost: PropTypes.number.isRequired,
    tags: PropTypes.string.isRequired,
  })).isRequired,
  type: PropTypes.string.isRequired,
  tag: PropTypes.string.isRequired,
};

export default DessertFilterMenu;
