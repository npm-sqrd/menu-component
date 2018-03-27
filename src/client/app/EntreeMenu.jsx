import React from 'react';
import PropTypes from 'prop-types';
import MenuItem from './MenuItem.jsx';
import styles from './styles/EntreeMenuStyles.css';

const EntreeMenu = (props) => {
  const lunchHeaders = ['Aperitivi', 'Antipasti', 'Primi', 'Secondi'];
  const dinnerHeaders = ['Antipasti', 'Primi', 'Paste', 'secondi'];
  const items = [
    props.menu.slice(0, 6),
    props.menu.slice(6, 12),
    props.menu.slice(12, 16),
    props.menu.slice(16, 20),
  ];

  const headers = props.type === 'lunch' ? lunchHeaders : dinnerHeaders;
  if (props.menu.length === 0) {
    return (
      <div />
    );
  }

  return (
    <section className={styles.itemList}>
      <section className={styles.itemBox}>
        <div className={`${styles.header} ${styles.pad}`}>{headers[0]}</div>
        {
          items[0].map(data => <MenuItem item={data} />)
        }
      </section>
      <section className={styles.itemBox}>
        <div className={styles.header}>{headers[1]}</div>
        {
          items[0].map(data => <MenuItem item={data} />)
        }
      </section>
      <section className={styles.itemBox}>
        <div className={styles.header}>{headers[2]}</div>
        {
          items[0].map(data => <MenuItem item={data} />)
        }
      </section>
      <section className={styles.itemBox}>
        <div className={styles.header}>{headers[3]}</div>
        {
          items[0].map(data => <MenuItem item={data} />)
        }
      </section>
    </section>
  );
};

EntreeMenu.propTypes = {
  menu: PropTypes.arrayOf(PropTypes.shape({
    foodItem: PropTypes.string.isRequired,
    cost: PropTypes.number.isRequired,
    tags: PropTypes.string.isRequired,
  }).isRequired).isRequired,
  type: PropTypes.string.isRequired,
};

export default EntreeMenu;
