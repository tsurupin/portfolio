import React from 'react';
import { Entity, CompositeDecorator } from 'draft-js';
import styles from './styles.scss';



const Link = (props) => {
  const { url } = Entity.get(props.entityKey).getData();

  return (
    <a href={url} className={styles.root}>
      {props.children}
    </a>
  );
};


function findLinkEntities(contentBlock, callback) {
  contentBlock.findEntityRanges(
    (character) => {
      const entityKey = character.getEntity();
      return (
        entityKey !== null &&
        Entity.get(entityKey).getType() === 'LINK'
      );
    },
    callback
  );
}

export const LinkDecorator = new CompositeDecorator([
  {
    strategy: findLinkEntities,
    component: Link
  }
]);

