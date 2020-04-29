import PropTypes from 'prop-types';
import React from 'react';
import { createUseStyles } from 'react-jss';

const useStyles = createUseStyles({
  button: {
    backgroundColor: '#000',
    borderRadius: 4,
    color: '#FFFFFF',
    composes: ['is-bold'],
    margin: 12,
    padding: '12px 24px',
    width: 120,
  },
  container: {
    color: '#FFFFFF',
    composes: ['flex-rows', 'flex-center', 'items-center'],
    padding: 35,
  },
  controls: {
    composes: ['flex-columns', 'flex-center'],
    marginTop: 20,
  },
  help: {
    composes: ['is-italic'],
    fontSize: '0.85rem',
    marginTop: 20,
    opacity: 0.45,
  },
  message: {
    fontSize: '1.2rem',
    marginTop: 40,
  },
  title: {
    composes: ['is-bold'],
  },
  wrapper: {
    textAlign: 'center',
  },
});

const Welcome = ({ onClickHandler }) => {
  const classes = useStyles();
  return (
    <div className={classes.container} id="welcome">
      <div className={classes.wrapper}>
        <h2 className={classes.title}>
          <span>COVID19</span>
        </h2>
        <h1 className={classes.title}>
          <span>Zone 100KM</span>
        </h1>
        <div className={classes.message}>
          <p>
            <span>
              Souhaitez-vous utiliser la géolocalisation de votre téléphone ?
            </span>
          </p>
        </div>
        <div className={classes.controls}>
          <div>
            <button
              className={classes.button}
              style={{ backgroundColor: '#73C990' }}
              type="button"
              onClick={() => onClickHandler(true)}>
              <span>Oui</span>
            </button>
            <button
              className={classes.button}
              style={{ backgroundColor: '#E06C75' }}
              type="button"
              onClick={() => onClickHandler(false)}>
              <span>Non</span>
            </button>
          </div>
        </div>
        <div className={classes.help}>
          <p>
            Utiliser la molette de votre souris pour zoomer/dézoomer sur la
            carte
          </p>
        </div>
      </div>
    </div>
  );
};

Welcome.propTypes = {
  onClickHandler: PropTypes.func.isRequired,
};

export default Welcome;