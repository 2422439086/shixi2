import logo from './logo.svg';
import './App.css';
import { useState,useEffect} from 'react';
import { Card, Col, Row , Carousel, Modal, Input} from 'antd';

const todoButtonStyle={
    backgroundColor: 'white',
    padding:'10px 20px',
    color:'orange',
    fontWeight: 'bold',
}
const doingButtonStyle={
  backgroundColor: 'white',
  padding:'10px 20px',
  color:'blue',
  fontWeight: 'bold',
}
const doneButtonStyle={
  backgroundColor: 'white',
  padding:'10px 20px',
  color:'green',
  fontWeight: 'bold',
}
const newButtonStyle={
  backgroundColor: 'blue',
  padding:'10px 20px',
  color:'white',
  fontWeight: 'bold',
}
const carouselButton={
  backgroundColor:'blue',
  padding:'10px 20px',
  color:'white',
  fontWeight:'bold',
  float:'right',margin:'10px 20px'
}

const dataSource=[
  {
    id:"DONE",
    title:"第一天的任务",
    description:"熟悉zent组件",
    textButton:"查看详情",

  },
  {
    id:"DOING",
    title:"第二天的任务",
    description:"开发一个TODO LIST",
    textButton:"点击完成",
  },
  {
    id:"TODO",
    title:"第三天的任务",
    description:"熟悉Node和Dubbo的调用",
    textButton:"点击开始"
  }
]
const getDataSource=()=>{
  return dataSource;
}

function App() {
  const [dataSource, setDataSource] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isModalOpen2, setIsModalOpen2] = useState(false);
  const [newTitle, setNewTitle] = useState([]);
  const [newDescription,setNewDescription] = useState([]);

  useEffect(() => {
    const data = getDataSource();
    setDataSource(data);
  }, []);

  const todoData = dataSource.filter(item => item.textButton == '点击开始');
  const doingData = dataSource.filter(item => item.textButton == '点击完成');
  const doneData = dataSource.filter(item => item.textButton == '查看详情');

  const handleButtonClick = (id) => {
    const data = dataSource.map(item => {
      if (item.id == id) {
        if (item.textButton == '点击开始') {
          return { ...item, textButton: '点击完成' };
        } else if (item.textButton == '点击完成') {
          return { ...item, textButton: '查看详情' };
        }
      }
      return item;
    });
    setDataSource(data);
  };


  const showModal1=()=>{
    setIsModalOpen(true);
  }
  const showModal2=()=>{
    setIsModalOpen2(true);
  }
  const okModal=()=>{
    setIsModalOpen2(true);
    const data={
      id:"TODO",
      title:newTitle,
      description:newDescription,
      textButton:"点击开始"
    };
    setDataSource(...dataSource,data);
    closeModal();
  }
  const closeModal=()=>{
    setIsModalOpen(false);
  }


  return (
    <div className="App">
      <div style={{ border: '2px solid blue', margin: '20px 20px', backgroundColor: 'lightblue' }}>
        <Carousel autoplay dots={false} motionDurationSlow={2}>
          {dataSource.map((item,index) => (
            <div key={item.id}>
              <Row gutter={16}>
                <Col span={6}>
                  <p style={{fontWeight:'bold',margin:'5px 20px',textAlign: 'left'}}>{item.title}</p>
                  <p style={{margin:'0 20px',textAlign: 'left'}}>{item.description}</p>
                </Col>
                <Col span={6} offset={12}>
                  <button className="carouselButton" style={carouselButton} onClick={showModal1}>
                    查看详情
                  </button>
                </Col>
              </Row>
            </div>
          ))}
        </Carousel>
      </div>
      {dataSource.map(item=>(
        <Modal title="任务详情" visible={isModalOpen} onCancel={closeModal} footer={null}>
          <div style={{ display:'flex', alignItems:'center', margin:'0px 20px', marginTop:'10px'}}>
            <p style={{ fontWeight:'bold',whiteSpace:'nowrap',marginRight:'10px'}}>任务名称:</p>
            <Input disabled value={item.title} placeholder="任务名称为2-20个字"/>
          </div>
          <div style={{ display:'flex', alignItems:'center', margin:'0px 20px', marginTop:'10px'}}>
            <p style={{ fontWeight:'bold',whiteSpace:'nowrap',marginRight:'10px'}}>任务描述:</p>
            <Input disabled value={item.description} placeholder="说说自己要干什么"/>
          </div>
        </Modal>
      ))}
      {dataSource.map((item,index)=>(
        <Modal title="新建任务" visible={isModalOpen2} onCancel={closeModal} onOk={okModal}>
          <div style={{ display:'flex', alignItems:'center', margin:'0px 20px', marginTop:'10px'}}>
            <p style={{ fontWeight:'bold',whiteSpace:'nowrap',marginRight:'10px'}}>任务名称:</p>
            <Input placeholder="任务名称为2-20个字" value={newTitle} onChange={(e)=>setNewTitle(e.target.value)}/>
          </div>
          <div style={{ display:'flex', alignItems:'center', margin:'0px 20px', marginTop:'10px'}}>
            <p style={{ fontWeight:'bold',whiteSpace:'nowrap',marginRight:'10px'}}>任务描述:</p>
            <Input placeholder="说说自己要干什么" value={newDescription} onChange={(e)=>setNewDescription(e.target.value)}/>
          </div>
        </Modal>
      ))}
      <div>
        <Row gutter={16}>
          <Col span={6}>
          <Card title="所有任务" extra={<a href="#" style={newButtonStyle} onClick={showModal2}>新建任务</a>} style={{ width: 400 }}>
              {dataSource.map((item) => (
                <Card
                  key={item.id}
                  type="inner"
                  title={item.title}
                  extra={
                    item.textButton == '查看详情' ? (
                      <a href="#" style={doneButtonStyle} onClick={showModal1}>{item.textButton}</a>
                    ) : (
                      item.textButton == '点击开始' ? (
                        <a href="#" style={todoButtonStyle} onClick={()=>handleButtonClick(item.id)}>{item.textButton}</a>
                      ) : (
                        <a href="#" style={doingButtonStyle} onClick={()=>handleButtonClick(item.id)}>{item.textButton}</a>
                      )
                    )
                  }
                  style={{ width: 300, marginTop: 16, textAlign: 'left' }}
                >
                  {item.description}
                </Card>
              ))}
            </Card>
          </Col>
          <Col span={6}>
            <Card title="TODO" style={{ width: 400 }}>
              {todoData.map((item,index) => (
                <Card
                  key={item.id}
                  type="inner"
                  title={item.title}
                  extra={<a href="#" style={todoButtonStyle} onClick={()=>handleButtonClick(item.id)}>点击开始</a>}
                  style={{ width: 300, marginTop: 16, textAlign: 'left' }}
                >
                  {item.description}
                </Card>
              ))}
            </Card>
          </Col>
          <Col span={6}>
            <Card title="DOING" style={{ width: 400 }}>
              {doingData.map((item,index) => (
                <Card
                  key={item.id}
                  type="inner"
                  title={item.title}
                  extra={<a href="#" style={doingButtonStyle} onClick={()=>handleButtonClick(item.id)}>点击完成</a>}
                  style={{ width: 300, marginTop: 16, textAlign: 'left' }}
                >
                  {item.description}
                </Card>
              ))}
            </Card>
          </Col>
          <Col span={6}>
            <Card title="DONE" style={{ width: 400 }}>
              {doneData.map((item,index) => (
                <Card
                  key={item.id}
                  type="inner"
                  title={item.title}
                  extra={<a href="#" style={doneButtonStyle} onClick={showModal1}>查看详情</a>}
                  style={{ width: 300, marginTop: 16, textAlign: 'left' }}
                >
                  {item.description}
                </Card>
              ))}
            </Card>
          </Col>
        </Row>
      </div>
    </div>
  );
}

export default App;