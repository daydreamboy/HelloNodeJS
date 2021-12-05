import { Component } from 'react';

export const setStateAsync = (obj: Component, state: object): Promise<void> => {
  return new Promise((resolve, _reject) => {
    obj.setState(state, () => {
      resolve()
    })
  })
}
