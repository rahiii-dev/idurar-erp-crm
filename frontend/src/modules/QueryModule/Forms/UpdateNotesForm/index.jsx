import { useSelector, useDispatch } from 'react-redux';
import { Row, Col } from 'antd';
import { useState } from 'react';
import { selectCurrentItem } from '@/redux/crud/selectors';
import { crud } from '@/redux/crud/actions';
import { request } from '@/request';
import successHandler from '@/request/successHandler';

import NoteItem from './NoteItem';
import AddNoteForm from './AddNoteForm';
import useLanguage from '@/locale/useLanguage';

export default function UpdateNotesForm({entity}) {
  const translate = useLanguage();
  const dispatch = useDispatch();
  const { result: currentItem } = useSelector(selectCurrentItem);

  const [notes, setNotes] = useState(currentItem?.notes || []);

  const updateReduxItem = (updatedNotes) => {
    dispatch(
      crud.currentItem({
        data: { ...currentItem, notes: updatedNotes },
      })
    );
    dispatch(crud.list({ entity }));
  };

  const handleDeleteNote = async (id) => {
    try {
      await request.delete({
        entity: `${entity}/${currentItem._id}/notes`,
        id,
        useDeletePath: false,
      });

      const updatedNotes = notes.filter((note) => note._id !== id);
      setNotes(updatedNotes);
      updateReduxItem(updatedNotes);
    } catch (err) {
      console.error(err);
    }
  };

  const handleUpdateNote = async (id, content) => {
    try {
      const response = await request.patch({
        entity: `${entity}/${currentItem._id}/notes/${id}`,
        jsonData: { content },
      });

      successHandler(response, { notifyOnSuccess: true });
      const updatedNotes = response.result.notes;
      setNotes(updatedNotes);
      updateReduxItem(updatedNotes);
    } catch (err) {
      console.error(err);
    }
  };

  const handleAddNote = async (content) => {
    try {
      const response = await request.post({
        entity: `${entity}/${currentItem._id}/notes`,
        jsonData: { content },
      });

      successHandler(response, { notifyOnSuccess: true });
      const updatedNotes = response.result.notes;
      setNotes(updatedNotes);
      updateReduxItem(updatedNotes);
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <>
      <Row style={{ marginTop: 20, marginBottom: 10 }}>
        <Col span={24}>
          <strong>{translate('Notes')}</strong>
        </Col>
      </Row>

      {notes.map((note) => (
        <NoteItem
          key={note._id}
          note={note}
          onDelete={handleDeleteNote}
          onUpdate={handleUpdateNote}
        />
      ))}

      <AddNoteForm onAdd={handleAddNote} />
    </>
  );
}
