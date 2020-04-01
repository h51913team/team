import React, { Component } from 'react';
import { Table, Button,Popconfirm,Modal,Form,Input } from 'antd';
import style from './index.module.less'
import CitiesAdd from './Add'
import { ExclamationCircleOutlined } from '@ant-design/icons';
import {getAllCitiesData,deleteCitiesData,citiesKeysData} from './Api'
// import CityData from './CityData'
const { confirm } = Modal;
let data=[]
let add='add'
let updata='updata'
class City extends Component {
    constructor(){
      super()
      this.getAlldata=this.getAlldata.bind(this)
      this.getInfos=this.getInfos.bind(this)
    //   this.delCitiesData=this.delCitiesData.bind(this)
      this.state = {
        selectedRowKeys: [], // Check here to configure the default column
        loading: false,
        columns:[
          {title: '城市ID',dataIndex: 'cityID',},
          {title: '城市名称',dataIndex: 'name',},
          {title: '车辆状态',dataIndex: 'carType',},
          {title: '授权加盟商',dataIndex: 'shop',},
          {title: '城市管理员',dataIndex: 'cityAdmin',},
          {title: '运行状态', dataIndex: 'runType',},
          {title: '操作人',dataIndex: 'person',},
          {title: '操作',dataIndex: 'del',
            render:(text,record)=> {
              return(
                <div className={style.cao}>
                  <div className={style.updata}>
                    <CitiesAdd type={updata} newData={record}
                     getAlldata={this.getAlldata}></CitiesAdd>
                  </div>  
                  <div>
                    <Popconfirm title='你确定要删除该数据吗？'
                    onConfirm={()=>{this.delCitiesData(record.key)}}>
                    <Button type="danger">删除</Button>
                    </Popconfirm>
                  </div>
                </div>
              )
            },
          },
        ]
      };
    }
     componentDidMount(){
       this.getAlldata()
     }
     componentWillUnmount(){
      this.setState=(state,callback)=>{
        return
      }
    }
     getObj(item,index){
      return {
        key:item._id,
        cityID: index+1,
        name:item.name,
        carType:item.carType,
        shop:item.shop,
        cityAdmin:item.cityAdmin,
        runType:item.runType,
        person:item.person,
      }
     }
     //获取所有数据
     getAlldata=async ()=>{
      this.setState({data:data.splice(0,data.length)})//初始化数组
     await getAllCitiesData().then((res)=>{
        res.data.list.map((item,index)=>{
          return this.setState({data:data.push(this.getObj(item,index))})
        })
       console.log(data);
      }).catch((err)=>{
       console.log(err);
      })
     }

    //删除数据
    delCitiesData=async (key)=>{
        console.log('aaaaaa');
        
     if(typeof key=='string'){
        await deleteCitiesData(key)
     }else{
        for (let index = 0; index < key.length; index++) {
            await deleteCitiesData(key[index])
        }
     }
      console.log(key);
       this.getAlldata()
    }
    //查询数据
    getInfos=async()=>{
      this.setState({data:data.splice(0,data.length)})//初始化数组
      let keys=this.props.form.getFieldValue('val')
      console.log(keys);
      await citiesKeysData(keys).then(res=>{
        let list=res.data.list
        console.log(list);
        if(list.length===0){
            Modal.error({
                title: '查询错误',
                content: '匹配不到数据！',
              });
          this.getAlldata()
        }else{
            list.map((item,index)=>{
                return this.setState({data:data.push(this.getObj(item,index))})
              })
        }
        
      }).catch(err=>{
        console.log(err);
      })
    }

    //信息确认弹框
    showConfirm=(data)=> {
        let self=this
        confirm({
          title: `确认删除${data.length}条数据?`,
          icon: <ExclamationCircleOutlined />,
          okText: '确定',
          cancelText: '取消',
          onOk() {
            self.delCitiesData(data)
          },
          onCancel() {
            console.log('取消');
          },
        });
      }
      start = () => {
          setTimeout(()=>{
          this.setState({
            selectedRowKeys: [],
          });
        })
      };
    
      //点击选中，更新选中的条数
      onSelectChange = selectedRowKeys => {
        this.setState({ selectedRowKeys });
      };
    
      render() {
        const { loading, selectedRowKeys,columns } = this.state;
        const rowSelection = {
          selectedRowKeys,
          onChange: this.onSelectChange,
        };
        const { getFieldDecorator } = this.props.form; 
        const hasSelected = selectedRowKeys.length > 0;
        return (
          <div>
            <div className={style.infos}>
                <Form>
                    <Form.Item wrapperCol={{width:'100px'}}>
                    {getFieldDecorator('val')(
                       <Input />)}
                    </Form.Item>
                </Form>
            </div>
            <div className={style.btn}>
            <Button type="primary" onClick={this.getInfos}>查询</Button>
            </div>
            <div className={style.allDel}>
              <span className={style.addbox}>
              <CitiesAdd getAlldata={this.getAlldata} type={add}></CitiesAdd>
              </span>
              {/* button的disabled属性 启用/禁用按钮 */}
              <Button type="primary" onClick={()=>{
                  this.showConfirm(selectedRowKeys)
                  this.start()
                  }} disabled={!hasSelected} loading={loading}>
                批量删除
              </Button>
              <span className={style.delNum}>
                {hasSelected ? `选中 ${selectedRowKeys.length} 条数据` : ''}
              </span>
            </div>
            <Table rowSelection={rowSelection} columns={columns} dataSource={data} rowKey='key' className={style.table}></Table>
          </div>
        );
      }
}

export default Form.create({})(City);