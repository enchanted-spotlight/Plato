// import React from 'react';
// import { expect } from 'chai';
// import { shallow } from 'enzyme';
// import mongoose from 'mongoose';
// // If this becomes a stateful component, you will have to use mount

// import platoApp from './../client/main';

// const PlatoApp = platoApp.components.default;
// const wrapper = shallow(<PlatoApp />);
// const inst = wrapper.instance();

// describe('<PlatoApp /> Component', () => {
//   it('should exist and be a react component', () => {
//     expect(inst).to.be.instanceOf(PlatoApp);
//     expect(wrapper.is('.plato-app')).to.equal(true);
//   });

//   it('should have search component', () => {
//     expect(wrapper.find('SearchBar')).to.have.length(1);
//   });

//   it('should have login component', () => {
//     expect(wrapper.find('LogIn')).to.have.length(1);
//   });

//   it('should have note list component', () => {
//     expect(wrapper.find('NoteList')).to.have.length(1);
//   });
//   // xit('should have new note component', () => {
//   //   expect(wrapper.find('NewNote')).to.have.length(1);
//   // });

//   it('should have fetchNotes function', () => {
//     expect(inst.fetchNotes).to.be.instanceOf(Function);
//   });

//   it('should have searchNotes function', () => {
//     expect(inst.searchNotes).to.be.instanceOf(Function);
//   });
// });
