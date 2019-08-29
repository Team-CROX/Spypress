// import React from 'react'
// const reducers = require('../client/reducers/reducers.js')
import reducers from '../client/reducers/reducers.js'

describe('message reducer', () => {
  let state; 

  beforeEach(() => {
    state = {
      messageArray: []
    }
  })

  describe('default state', () => {
    it('should return the default state when given an undefined input', () => {
      expect(reducers(undefined, {})).toEqual(state)
    })
  })

  describe('unrecognized action types', () => {
    it('should return the original without any duplication', () => {
      const action = { type: 'thisisnotavalidactiontype' };
      expect(reducers(state, action)).toBe(state);
    });
  });

  describe('ADD_MESSAGE', () => {
    const action = {
      type: 'ADD_MESSAGE',
      payload: 'message',
    };
    it('sends a message', () => {
      const { reducers } = reducers(state, action);
      expect 
    })
  })
})