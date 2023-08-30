import { Card } from 'antd'; 

const todoStyle={
  backgroundColor: 'white',
  padding:'10px 20px',
  color:'orange',
  fontWeight: 'bold',
}
const doingStyle={
  backgroundColor: 'white',
  padding:'10px 20px',
  fontWeight: 'bold',
  color:'blue'
}
const doneStyle={
  backgroundColor: 'white',
  padding:'10px 20px',
  fontWeight: 'bold',
  color:'green'
}

export function Task({ task, onUpdate = (task) => {}, onShow = (task) => {} }) {
  const { title, description } = task;
  
  const getOperateContent = (task) => {
    if (task.status === 'todo') {
      return (
        <span className="start" onClick={() => {
          const newTask = {
            id: task.id,
            title: task.title,
            description: task.description,
            status: 'doing', 
          };
          onUpdate(newTask);
        }}>
          <button type='primary' style={todoStyle}>
            点击开始
          </button>
        </span>
      );
    }
    if (task.status === 'doing') {
      return (
        <span className='finish' onClick={() => {
          const newTask = {
            id: task.id,
            title: task.title,
            description: task.description,
            status: 'done',
          };
          onUpdate(newTask);
        }}>
          <button type='primary' style={doingStyle}>
            点击完成
          </button>
        </span>
      );
    }
    return (
      <span className="view-detail" onClick={() => { onShow(task); }}>
        <button type='primary' style={doingStyle}>
          查看详情
        </button>
      </span>
    );
  }

  return (
    <Card title={title} extra={getOperateContent(task)}>
      <p>{description}</p>
    </Card>
  );
}