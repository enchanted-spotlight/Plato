import { createEditorState } from 'medium-draft';

export const notesInitialState = {
  isFetching: false,
  didInvalidate: false,
  notes: []
};

export const usernameInitialState = '';

export const textEditorInitialState = createEditorState();

export const speechEditorInitialState = createEditorState();

export const currentSessionTitle = '';
