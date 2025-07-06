import DynamicForm from '@/forms/DynamicForm';
import UpdateNotesForm from './UpdateNotesForm';
import CreateNotesForm from './CreateNotesForm';


export default function QueryForm({ config, isUpdateForm = false }) {
  const { fields, entity } = config;

  return (
    <>
      {/* Render all the basic fields using DynamicForm */}
      <DynamicForm fields={fields} isUpdateForm={isUpdateForm} />


      {isUpdateForm ? (
        <UpdateNotesForm entity={entity} />
      ) : (
        <CreateNotesForm />
      )}
    </>
  );
}
