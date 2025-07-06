import useLanguage from '@/locale/useLanguage';
import { fields } from './config';
import CrudModule from '@/modules/CrudModule/CrudModule';
import QueryNoteCard from '@/modules/QueryModule/components/QueryNoteCard';

export default function Query() {
  const translate = useLanguage();

  const entity = 'query';

  const searchConfig = {
    displayLabels: ['name'],
    searchFields: 'name',
    entity: 'client',
  };

  const deleteModalLabels = ['description'];

  const Labels = {
    PANEL_TITLE: translate('Query'),
    DATATABLE_TITLE: translate('Query List'),
    ADD_NEW_ENTITY: translate('Add Query'),
    ENTITY_NAME: translate('Query'),
  };

  const configPage = {
    entity,
    ...Labels,
  };

  const updatedFields = {
    ...fields,
    notes: {
      label: 'Notes',
      dataIndex: ['notes'],
      disableForForm: true,
      disableForTable: true,
      disableForUpdate: true,
      render: (notes) => {
        if (!Array.isArray(notes) || notes.length === 0) return '-';

        return (
          <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
            <div style={{ fontWeight: 'bold', marginBottom: 4, fontSize: 20 }}>
              {translate('Notes')}
            </div>
            {notes.map((note) => (
              <QueryNoteCard key={note._id} content={note.content} createdAt={note.createdAt} />
            ))}
          </div>
        );
      },
    },
  };

  const config = {
    ...configPage,
    fields: updatedFields,
    searchConfig,
    deleteModalLabels,
  };

  return (
    <CrudModule
      config={config}
    />
  );
}
