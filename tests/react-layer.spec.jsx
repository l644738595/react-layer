import TestComponent from '../src/react-layer';
import { shallow } from 'enzyme';
import React from 'react';

describe('test-component', () => {
  describe('Mounting', () => {
    it('should render into the document', () => {
      const component = shallow(<TestComponent />);
      expect(component).toBeDefined();
    });
  });
});
