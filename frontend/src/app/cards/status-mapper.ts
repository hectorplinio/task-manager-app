export enum StatusTask {
  TODO = 'TODO',
  IN_PROGRESS = 'IN_PROGRESS',
  DONE = 'DONE',
}

export const StatusMapper: {
  [key in StatusTask]: { label: string; class: string };
} = {
  [StatusTask.TODO]: { label: 'To-Do', class: 'bg-gray-200 text-gray-700' },
  [StatusTask.IN_PROGRESS]: {
    label: 'In Progress',
    class: 'bg-yellow-200 text-yellow-800',
  },
  [StatusTask.DONE]: { label: 'Done', class: 'bg-green-200 text-green-800' },
};
