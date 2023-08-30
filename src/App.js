import './App.css';
import { useState,useEffect} from 'react';
import { Card, Col, Row , Carousel, Modal, Input, Form,Button, Typography} from 'antd';
import { Task } from './component/task';

const { Text } = Typography;

const CarouselStyle={
  border: '2px solid blue', 
  margin: '20px 20px', 
  backgroundColor: 'lightblue'
}

function getDataSource() {
  return [
    {
      id: 1,
      title: '第一天的任务',
      description: '熟悉zent组件',
      status: 'done',
    },
    {
      id: 2,
      title: '第二天的任务',
      description: '开发一个 TODO LIST',
      status: 'doing',
    },
    {
      id: 3,
      title: '第三天的任务',
      description: '熟悉 Node 和 Dubbo 的调用',
      status: 'todo',
    },
  ];
}
function App() {
  const [dataSource, setDataSource] = useState([]);

  useEffect(() => {
    const data = getDataSource();
    setDataSource(data);
  }, []);

  const [visible,setVisible] = useState(false);
  const [form]= Form.useForm();
  
  const onAddTask = ()=>{
    form.validateFields().then(values=>{
      const newTask = {
        id:dataSource.length+1,
        title:values.title,
        description:values.description,
        status:"todo"
      };
      setDataSource(dataSource.concat(newTask));
    })
  }

  const onUpdateTask = (task)=>{
    const newTasks = dataSource.map(t=>t.id===task.id?task:t);
    setDataSource(newTasks);
  }

  return (
    <div className="TODO_LIST">
        <Carousel 
          className='task-introduce-wrapper'
          autoplay 
          dots={false} 
          dotPosition='left'
          style={CarouselStyle}
        >
          {dataSource.map(task => (
            <div key={task.id} className='task-introduce'>
              <div className='task-detail'>
                <div className='detail'>
                  <Text className='title' strong>{task.title}</Text>
                  <div className='description'>{task.description}</div>
                </div>
              </div>
              <Button 
                className="carouselButton" 
                type="primary"
                onClick={()=>{
                  form.setFieldsValue(task);
                  setVisible(true);
                }}>
                查看详情
              </Button>
            </div>
          ))}
        </Carousel>

      <Row gutter={[16,0]} className='task-list'>
        <Col className='gutter-row' span={6}>
          <Card title="所有任务" extra={
            <Button
              type='primary'
              onClick={()=>{
                form.resetFields();
                setVisible(true);
              }}  
            >
              新建任务
            </Button>
          }>
            {
              dataSource.map(task=>(
                <Task
                  key={task.id}
                  task={task}
                  onUpdate={(t)=>{onUpdateTask(t);}}
                  onShow={(t)=>{form.setFieldsValue(t);setVisible(true);}}
                />
              ))
            }
          </Card>
        </Col>
        <Col className="gutter-row" span={6}>
          <Card title="TODO">
            { dataSource.filter(task => task.status === 'todo').map(task => (
              <Task
                key={task.id}
                task={task}
                onUpdate={(task) => { onUpdateTask(task); }}
              />
            ))}
          </Card>
        </Col>
        <Col className="gutter-row" span={6}>
          <Card title="DOING">
            { dataSource.filter(task => task.status === 'doing').map(task => (
              <Task
                key={task.id}
                task={task}
                onUpdate={(task) => { onUpdateTask(task); }}
              />
            ))}
          </Card>
        </Col>
        <Col className="gutter-row" span={6}>
          <Card title="DONE">
          { dataSource.filter(task => task.status === 'done').map(task => (
              <Task
                key={task.id}
                task={task}
                onShow={(task) => { form.setFieldsValue(task); setVisible(true); }}
              />
            ))}
          </Card>
        </Col>
      </Row>
      <Modal
        title={form.getFieldValue('title') ? '任务详情' : '新建任务'}
        open={visible}
        onCancel={() => { setVisible(false); }}
        footer={form.getFieldValue('title') ? null : (
          <span>
            <Button onClick={() => { setVisible(false); }}>取消</Button>
            <Button
              type='primary'
              onClick={() => {
                onAddTask();
                setVisible(false);
              }}
            >
                确定
            </Button>
          </span>
        )}
      >
        <Form form={form}>
          <Form.Item
            name="title"
            label="任务名称"
            rules={[{ required: true }]}
          >
            <Input disabled={!!form.getFieldValue('title')} maxLength={20} placeholder='任务名称为 2-20 个字符'/>
          </Form.Item>
          <Form.Item
            name="description"
            label="任务描述"
            rules={[{ required: true }]}
          >
            <Input disabled={!!form.getFieldValue('title')} placeholder='说说自己要干什么' />
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
}

export default App;